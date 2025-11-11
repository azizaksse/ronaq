type Zone = {
  name: string;
  wilayas: number[];
  priceDzd: number;
  codFeeDzd: number;
  eta: string;
  freeFromDzd: number;
};

const zones: Zone[] = [
  {
    name: "A",
    wilayas: [16, 9, 44, 42, 35, 1, 2, 25, 19, 31, 27, 26],
    priceDzd: 450,
    codFeeDzd: 200,
    eta: "داخل 24-48 ساعة",
    freeFromDzd: 12000,
  },
  {
    name: "B",
    wilayas: [3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24, 28, 29, 30, 32, 33, 34, 36, 38, 39, 40, 41, 43, 45, 46, 47, 48],
    priceDzd: 650,
    codFeeDzd: 250,
    eta: "48-72 ساعة",
    freeFromDzd: 15000,
  },
  {
    name: "C",
    wilayas: [37, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
    priceDzd: 950,
    codFeeDzd: 300,
    eta: "3-5 أيام",
    freeFromDzd: 18000,
  },
];

const findZone = (destWilaya: number) =>
  zones.find((zone) => zone.wilayas.includes(destWilaya)) ?? zones[1];

type FallbackQuoteInput = {
  destWilaya: number;
  cartTotal: number;
};

export const fallbackQuote = ({ destWilaya, cartTotal }: FallbackQuoteInput) => {
  const zone = findZone(destWilaya);
  const shippingCost = cartTotal >= zone.freeFromDzd ? 0 : zone.priceDzd;

  return {
    priceDzd: shippingCost,
    codFeeDzd: zone.codFeeDzd,
    discountDzd: shippingCost === 0 ? zone.priceDzd : 0,
    freeFromDzd: zone.freeFromDzd,
    eta: zone.eta,
  };
};
