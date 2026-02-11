import * as React from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

type AddableProduct = Omit<CartItem, "quantity">;

interface CartContextValue {
  cartItems: CartItem[];
  cartItemCount: number;
  addToCart: (product: AddableProduct) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const addToCart = React.useCallback((product: AddableProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = React.useCallback((id: number, quantity: number) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const removeItem = React.useCallback((id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = React.useCallback(() => {
    setCartItems([]);
  }, []);

  const cartItemCount = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = React.useMemo<CartContextValue>(
    () => ({ cartItems, cartItemCount, addToCart, updateQuantity, removeItem, clearCart }),
    [cartItems, cartItemCount, addToCart, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
