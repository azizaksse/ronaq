import { useCallback, useMemo, useSyncExternalStore } from "react";
import { products, type Product } from "./products";
import { composeOrderMessage, buildWhatsAppLink as createWaLink } from "./wa";
import { brandName, whatsappNumber } from "./utils";

export type CartItem = Product & {
  quantity: number;
};

const STORAGE_KEY = "ronaklife-cart";
let cartItems: CartItem[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

const readStorage = (): CartItem[] => {
  if (typeof window === "undefined") return cartItems;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const writeStorage = (payload: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

const ensureHydrated = () => {
  if (!hydrated && typeof window !== "undefined") {
    cartItems = readStorage();
    hydrated = true;
  }
};

const emit = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => {
  ensureHydrated();
  return cartItems;
};

const updateCart = (updater: (prev: CartItem[]) => CartItem[]) => {
  cartItems = updater(getSnapshot());
  writeStorage(cartItems);
  emit();
};

export const useCart = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => cartItems);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.priceDzd * item.quantity, 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const addItem = useCallback((product: Product) => {
    updateCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    updateCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, qty) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    updateCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    updateCart(() => []);
  }, []);

  return {
    items,
    subtotal,
    count,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };
};

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

type LegacyCustomer = {
  name?: string;
  phone?: string;
  state?: string;
  address?: string;
};

export const buildWhatsAppLink = (
  cartItems: CartItem[],
  customer: LegacyCustomer = {},
) => {
  if (cartItems.length === 0) {
    return createWaLink(
      whatsappNumber,
      "أرغب في التعرف على منتجات رونق الحياة المتوفرة.",
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceDzd * item.quantity,
    0,
  );

  const message = composeOrderMessage({
    brand: brandName,
    lines: cartItems.map((item) => ({
      name: item.nameAr,
      quantity: item.quantity,
      priceDzd: item.priceDzd,
      totalDzd: item.priceDzd * item.quantity,
    })),
    subtotalDzd: subtotal,
    shippingDzd: 0,
    codFeeDzd: 0,
    discountDzd: 0,
    totalDzd: subtotal,
    customer: {
      name: customer.name ?? "...",
      phone: customer.phone ?? "...",
      wilaya: customer.state ?? "...",
      address: customer.address ?? "...",
      note: undefined,
    },
  });

  return createWaLink(whatsappNumber, message);
};
