import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nova_wishlist")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("nova_wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) =>
    setItems((prev) =>
      prev.find((i) => i.id === product.id) ? prev : [...prev, product]
    );

  const removeFromWishlist = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const isInWishlist = (id) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
