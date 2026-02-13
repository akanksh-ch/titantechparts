import * as React from "react";

const CART_STORAGE_KEY = "cartItems";

const getStorageScope = (): string => {
  if (typeof window === "undefined") return "guest";

  const username = localStorage.getItem("username")?.trim().toLowerCase();
  return username && username.length > 0 ? username : "guest";
};

const getScopedCartStorageKey = () =>
  `${CART_STORAGE_KEY}:${getStorageScope()}`;

const parseCartItems = (stored: string | null): CartItem[] => {
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        item &&
        (typeof item.id === "string" || typeof item.id === "number") &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.category === "string" &&
        typeof item.quantity === "number",
    );
  } catch {
    return [];
  }
};

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  imageUrl?: string;
  category: string;
  quantity: number;
}

type AddableProduct = Omit<CartItem, "quantity">;

interface CartContextValue {
  cartItems: CartItem[];
  cartItemCount: number;
  addToCart: (product: AddableProduct) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  removeItem: (id: number | string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartStorageKey = getScopedCartStorageKey();

  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const scopedItems = parseCartItems(localStorage.getItem(cartStorageKey));
    if (scopedItems.length > 0) return scopedItems;

    const legacyItems = parseCartItems(localStorage.getItem(CART_STORAGE_KEY));
    if (legacyItems.length > 0) {
      localStorage.setItem(cartStorageKey, JSON.stringify(legacyItems));
      localStorage.removeItem(CART_STORAGE_KEY);
    }

    return legacyItems;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const scopedItems = parseCartItems(localStorage.getItem(cartStorageKey));
    if (scopedItems.length > 0) {
      setCartItems(scopedItems);
      return;
    }

    const legacyItems = parseCartItems(localStorage.getItem(CART_STORAGE_KEY));
    if (legacyItems.length > 0) {
      localStorage.setItem(cartStorageKey, JSON.stringify(legacyItems));
      localStorage.removeItem(CART_STORAGE_KEY);
    }

    setCartItems(legacyItems);
  }, [cartStorageKey]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
  }, [cartItems, cartStorageKey]);

  const addToCart = React.useCallback((product: AddableProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = React.useCallback(
    (id: number | string, quantity: number) => {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
      );
    },
    [],
  );

  const removeItem = React.useCallback((id: number | string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = React.useCallback(() => {
    setCartItems([]);
  }, []);

  const cartItemCount = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value = React.useMemo<CartContextValue>(
    () => ({
      cartItems,
      cartItemCount,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      cartItems,
      cartItemCount,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
