import * as React from "react";

const WISHLIST_STORAGE_KEY = "wishlistItems";

const getStorageScope = (): string => {
  if (typeof window === "undefined") return "guest";

  const username = localStorage.getItem("username")?.trim().toLowerCase();
  return username && username.length > 0 ? username : "guest";
};

const getScopedWishlistStorageKey = () =>
  `${WISHLIST_STORAGE_KEY}:${getStorageScope()}`;

const parseWishlistItems = (stored: string | null): WishlistItem[] => {
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is WishlistItem =>
        item &&
        (typeof item.id === "string" || typeof item.id === "number") &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.category === "string",
    );
  } catch {
    return [];
  }
};

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
  const wishlistStorageKey = getScopedWishlistStorageKey();

  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(
    () => {
      if (typeof window === "undefined") return [];

      const scopedItems = parseWishlistItems(
        localStorage.getItem(wishlistStorageKey),
      );
      if (scopedItems.length > 0) return scopedItems;

      const legacyItems = parseWishlistItems(
        localStorage.getItem(WISHLIST_STORAGE_KEY),
      );
      if (legacyItems.length > 0) {
        localStorage.setItem(wishlistStorageKey, JSON.stringify(legacyItems));
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
      }

      return legacyItems;
    },
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const scopedItems = parseWishlistItems(
      localStorage.getItem(wishlistStorageKey),
    );
    if (scopedItems.length > 0) {
      setWishlistItems(scopedItems);
      return;
    }

    const legacyItems = parseWishlistItems(
      localStorage.getItem(WISHLIST_STORAGE_KEY),
    );
    if (legacyItems.length > 0) {
      localStorage.setItem(wishlistStorageKey, JSON.stringify(legacyItems));
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }

    setWishlistItems(legacyItems);
  }, [wishlistStorageKey]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, wishlistStorageKey]);

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
