import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Zap,
  Star,
  Minus,
  Plus,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";
import Product3DViewer from "../components/Product3DViewer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice, discountPercent } from "../utils/helpers";

const colorMap = {
  white: "#ffffff",
  black: "#111111",
  red: "#c0392b",
  blue: "#2c5fcf",
  silver: "#c0c0c0",
  gold: "#c9a14a",
  navy: "#1f2d52",
  olive: "#5b5e3a",
  tan: "#8a6d4b",
  brown: "#5a4a3a",
  purple: "#6b3fa0",
  stone: "#a8a29e",
  green: "#3f6b4a",
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === String(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [color, setColor] = useState(product?.colors?.[0]);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product)
    return (
      <div className="pt-32 text-center text-muted">
        Product not found.{" "}
        <Link to="/shop" className="text-accent">
          Back to shop
        </Link>
      </div>
    );

  const fav = isInWishlist(product.id);
  const disc = discountPercent(product.oldPrice, product.price);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <nav className="text-xs text-muted mb-6">
        <Link to="/" className="hover:text-text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-text-primary">
          Shop
        </Link>{" "}
        / <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl border border-stroke bg-surface overflow-hidden h-[420px] lg:h-[560px]">
          <Product3DViewer type={product.type} color={product.color} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-accent mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted mb-4">
            <span className="flex text-accent">
              <Star size={14} className="fill-accent" />
            </span>
            {product.rating} · {product.reviews} reviews
          </div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-muted line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {disc > 0 && (
                  <span className="text-accent text-sm">-{disc}%</span>
                )}
              </>
            )}
          </div>
          <p className="text-muted mb-6">{product.description}</p>

          <div className="mb-5">
            <p className="text-sm font-medium mb-2">
              Color: <span className="text-muted">{color}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                  data-cursor
                  className={`w-9 h-9 rounded-full border-2 ${
                    color === c ? "border-accent" : "border-stroke"
                  }`}
                  style={{ background: colorMap[c.toLowerCase()] || "#555" }}
                />
              ))}
            </div>
          </div>

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    data-cursor
                    className={`min-w-11 px-3 py-2 rounded-xl border text-sm ${
                      size === s
                        ? "border-accent bg-accent/10"
                        : "border-stroke hover:border-text-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Qty</span>
            <div className="flex items-center border border-stroke rounded-full">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 grid place-items-center"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 grid place-items-center"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => addToCart({ ...product, color, size }, qty)}
              data-cursor
              className="flex-1 inline-flex items-center justify-center gap-2 bg-text-primary text-bg px-7 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
            >
              <ShoppingBag size={16} /> Add to cart
            </button>
            <button
              onClick={() => {
                addToCart({ ...product, color, size }, qty);
                navigate("/checkout");
              }}
              data-cursor
              className="flex-1 inline-flex items-center justify-center gap-2 border border-accent text-text-primary px-7 py-3.5 rounded-full text-sm font-medium hover:bg-accent hover:text-bg transition-colors"
            >
              <Zap size={16} /> Buy now
            </button>
            <button
              onClick={() =>
                fav ? removeFromWishlist(product.id) : addToWishlist(product)
              }
              aria-label="Wishlist"
              data-cursor
              className={`w-12 grid place-items-center rounded-full border ${
                fav
                  ? "border-accent text-accent"
                  : "border-stroke text-muted hover:text-text-primary"
              }`}
            >
              <Heart size={18} className={fav ? "fill-accent" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center border border-stroke rounded-2xl p-4">
            {[Truck, RefreshCw, Shield].map((I, i) => (
              <div key={i}>
                <I size={18} className="mx-auto text-accent mb-1" />
                <p className="text-[11px] text-muted">
                  {["Free Shipping", "30-Day Returns", "2-Year Warranty"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <ul className="divide-y divide-stroke border border-stroke rounded-2xl overflow-hidden">
            {Object.entries(product.specs || {}).map(([k, v]) => (
              <li
                key={k}
                className="flex justify-between px-4 py-3 text-sm"
              >
                <span className="text-muted">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-muted leading-relaxed">{product.description}</p>
          <p className="text-muted leading-relaxed mt-3">
            Crafted with precision and designed for those who refuse to
            compromise. Every detail of the {product.name} has been engineered to
            deliver a premium experience that lasts.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
