import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function CartDrawer({ open, onClose }) {
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
    <div
      className={`fixed inset-0 z-[9991] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-surface border-l border-stroke transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-5 border-b border-stroke">
          <h3 className="font-semibold text-lg">Your Cart</h3>
          <button onClick={onClose} className="text-muted hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <ShoppingBag size={40} className="mx-auto text-muted mb-4" />
              <p className="text-muted">Your cart is waiting for something amazing.</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-block mt-4 bg-text-primary text-bg px-5 py-2.5 rounded-full text-sm"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex gap-3 bg-bg rounded-2xl p-3 border border-stroke"
                >
                  <img
                    src={i.image}
                    alt={i.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{i.name}</p>
                    <p className="text-xs text-muted">
                      {formatPrice(i.price)}
                      {i.color ? ` · ${i.color}` : ""}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(i.id)}
                        className="w-7 h-7 grid place-items-center rounded-full border border-stroke"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <button
                        onClick={() => increaseQuantity(i.id)}
                        className="w-7 h-7 grid place-items-center rounded-full border border-stroke"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm font-semibold">
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
            <div className="border-t border-stroke p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(sub + shipping)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block text-center bg-text-primary text-bg py-3 rounded-full text-sm hover:bg-accent transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-xs text-muted hover:text-text-primary"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
