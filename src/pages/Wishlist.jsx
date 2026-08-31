import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { items } = useWishlist();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Wishlist</h1>
      <p className="text-muted mb-8">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>
      {items.length === 0 ? (
        <div className="text-center py-20 border border-stroke rounded-3xl text-muted">
          <Heart size={40} className="mx-auto mb-4" />
          <p>Your wishlist is empty.</p>
          <Link
            to="/shop"
            data-cursor
            className="inline-block mt-4 bg-text-primary text-bg px-5 py-2.5 rounded-full text-sm"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
