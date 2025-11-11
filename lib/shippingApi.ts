type QuoteItem = {
  priceDzd: number;
  quantity: number;
  weightGrams?: number;
};

const apiBase = process.env.DELIVERY_API_BASE;
const apiKey = process.env.DELIVERY_API_KEY;
const vendorName = process.env.DELIVERY_VENDOR_NAME ?? "YourCourier";

const assertConfig = () => {
  if (!apiBase || !apiKey) {
    throw new Error("Delivery API credentials are missing");
  }
};

const buildHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const fetchWilayas = async () => {
  assertConfig();
  const response = await fetch(`${apiBase}/locations`, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch delivery locations");
  }
  const payload = await response.json();
  const list = Array.isArray(payload?.locations) ? payload.locations : [];
  return list.map((item: any) => ({
    code: Number(item.code ?? item.id),
    name: item.nameAr ?? item.name ?? "ولاية",
  }));
};

type QuoteRateInput = {
  destWilaya: number;
  items: QuoteItem[];
  cod: boolean;
};

export const quoteRate = async ({
  destWilaya,
  items,
  cod,
}: QuoteRateInput) => {
  assertConfig();
  const response = await fetch(`${apiBase}/quote`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      vendor: vendorName,
      destination: destWilaya,
      cod,
      parcels: items.map((item) => ({
        declared_value: item.priceDzd,
        quantity: item.quantity,
        weight_grams: item.weightGrams ?? 250,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to quote shipping");
  }

  const data = await response.json();
  return {
    priceDzd: Number(data?.price ?? 0),
    codFeeDzd: Number(data?.cod_fee ?? 0),
    discountDzd: Number(data?.discount ?? 0),
    freeFromDzd: Number(data?.free_from ?? 0),
    eta: data?.eta ?? "2-4 أيام",
  };
};

type CreateShipmentInput = {
  customer: {
    name: string;
    phone: string;
    wilaya: number;
    address: string;
  };
  items: QuoteItem[];
  notes?: string;
  codAmount: number;
};

export const createShipment = async ({
  customer,
  items,
  notes,
  codAmount,
}: CreateShipmentInput) => {
  assertConfig();
  const response = await fetch(`${apiBase}/shipments`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      vendor: vendorName,
      customer,
      parcels: items,
      notes,
      cod_amount: codAmount,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create shipment");
  }

  return response.json();
};

export const trackShipment = async (trackingNumber: string) => {
  assertConfig();
  const response = await fetch(`${apiBase}/shipments/${trackingNumber}`, {
    headers: buildHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to track shipment");
  }

  return response.json();
};
