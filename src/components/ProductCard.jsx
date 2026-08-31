import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice, discountPercent, cn } from "../utils/helpers";
import Product3DViewer from "./Product3DViewer";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [qv, setQv] = useState(false);
  const fav = isInWishlist(product.id);
  const disc = discountPercent(product.oldPrice, product.price);

  return (
    <div className="group relative rounded-3xl border border-stroke bg-surface overflow-hidden hover:-translate-y-1 hover:border-accent/50 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-bg">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {disc > 0 && (
            <span className="text-[11px] font-semibold bg-accent text-bg px-2 py-1 rounded-full">
              -{disc}%
            </span>
          )}
          {product.newArrival && (
            <span className="text-[11px] font-semibold bg-text-primary text-bg px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.bestseller && (
            <span className="text-[11px] font-semibold bg-white/10 text-text-primary border border-stroke px-2 py-1 rounded-full">
              BEST
            </span>
          )}
        </div>
        <button
          onClick={() => (fav ? removeFromWishlist(product.id) : addToWishlist(product))}
          aria-label="Wishlist"
          data-cursor
          className={cn(
            "absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-bg/60 backdrop-blur hover:bg-bg transition-colors",
            fav ? "text-accent" : "text-muted"
          )}
        >
          <Heart size={16} className={fav ? "fill-accent" : ""} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link
          to={`/product/${product.id}`}
          data-cursor
          className="font-medium hover:text-accent transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted mt-1">
          <Star size={12} className="fill-accent text-accent" />
          {product.rating} ({product.reviews})
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
            data-cursor
            className="w-9 h-9 grid place-items-center rounded-full bg-text-primary text-bg hover:bg-accent transition-colors"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

      <button
        onClick={() => setQv(true)}
        aria-label="Quick view"
        data-cursor
        className="absolute bottom-20 right-3 lg:opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 grid place-items-center rounded-full bg-surface border border-stroke text-muted hover:text-text-primary"
      >
        <Eye size={15} />
      </button>

      {qv && (
        <div
          className="fixed inset-0 z-[9990] grid place-items-center p-4 bg-black/70 backdrop-blur"
          onClick={() => setQv(false)}
        >
          <div
            className="bg-surface border border-stroke rounded-3xl w-full max-w-3xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQv(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-8 h-8 grid place-items-center rounded-full bg-black/40 text-muted hover:text-text-primary"
            >
              ✕
            </button>
            <div className="grid md:grid-cols-2">
              <div className="h-72 md:h-96 bg-black/40">
                <Product3DViewer type={product.type} color={product.color} />
              </div>
              <div className="p-6 flex flex-col">
                <p className="text-xs text-muted uppercase">{product.category}</p>
                <h3 className="text-xl font-semibold mt-1">{product.name}</h3>
                <p className="text-muted text-sm mt-2 line-clamp-3">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <span className="text-lg font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product);
                      setQv(false);
                    }}
                    className="ml-auto bg-text-primary text-bg px-5 py-2.5 rounded-full text-sm hover:bg-accent transition-colors"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
