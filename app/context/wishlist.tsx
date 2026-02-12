import * as React from "react";

export interface WishlistItem {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  category: string;
}

interface WishlistContextValue {
  wishlistItems: WishlistItem[];
  wishlistItemCount: number;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = React.createContext<WishlistContextValue | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>([]);

  const addToWishlist = React.useCallback((product: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = React.useCallback((id: number | string) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInWishlist = React.useCallback(
    (id: number | string) => wishlistItems.some((i) => i.id === id),
    [wishlistItems],
  );

  const clearWishlist = React.useCallback(() => {
    setWishlistItems([]);
  }, []);

  const wishlistItemCount = wishlistItems.length;

  const value = React.useMemo<WishlistContextValue>(
    () => ({
      wishlistItems,
      wishlistItemCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }),
    [
      wishlistItems,
      wishlistItemCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = React.useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
