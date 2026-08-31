import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const shipping = items.length ? 199 : 0;
  const sub = getCartTotal();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 border border-stroke rounded-3xl">
          <ShoppingBag size={40} className="mx-auto text-muted mb-4" />
          <p className="text-muted">Your cart is waiting for something amazing.</p>
          <Link
            to="/shop"
            data-cursor
            className="inline-block mt-4 bg-text-primary text-bg px-5 py-2.5 rounded-full text-sm"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-3">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex gap-4 bg-surface border border-stroke rounded-2xl p-4"
              >
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${i.id}`}
                    data-cursor
                    className="font-medium hover:text-accent"
                  >
                    {i.name}
                  </Link>
                  {i.color && (
                    <p className="text-xs text-muted">
                      {i.color}
                      {i.size ? ` · Size ${i.size}` : ""}
                    </p>
                  )}
                  <p className="text-sm text-muted mt-1">
                    {formatPrice(i.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(i.id)}
                      className="w-8 h-8 grid place-items-center rounded-full border border-stroke"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center">{i.qty}</span>
                    <button
                      onClick={() => increaseQuantity(i.id)}
                      className="w-8 h-8 grid place-items-center rounded-full border border-stroke"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold">
                    {formatPrice(i.price * i.qty)}
                  </span>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="text-muted hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit bg-surface border border-stroke rounded-3xl p-6 space-y-3 lg:sticky lg:top-24">
            <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(sub)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-3 border-t border-stroke">
              <span>Total</span>
              <span>{formatPrice(sub + shipping)}</span>
            </div>
            <Link
              to="/checkout"
              data-cursor
              className="block text-center bg-text-primary text-bg py-3 rounded-full text-sm hover:bg-accent transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-xs text-muted hover:text-text-primary"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
