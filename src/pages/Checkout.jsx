import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const sub = getCartTotal();
  const shipping = items.length ? 199 : 0;
  const discount = applied ? Math.round(sub * 0.1) : 0;
  const total = sub + shipping - discount;

  if (items.length === 0)
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-16 text-center text-muted">
        Your cart is empty.{" "}
        <Link to="/shop" className="text-accent">
          Shop now
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Checkout</h1>
      <form
        className="grid lg:grid-cols-[1fr_360px] gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          clearCart();
          alert("Order placed! Thank you for shopping with NOVA.");
        }}
      >
        <div className="space-y-8">
          <section className="bg-surface border border-stroke rounded-3xl p-6">
            <h2 className="font-semibold mb-4">Customer Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="First name" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
              <input required placeholder="Last name" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
              <input required type="email" placeholder="Email" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
              <input required type="tel" placeholder="Phone" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
            </div>
          </section>
          <section className="bg-surface border border-stroke rounded-3xl p-6">
            <h2 className="font-semibold mb-4">Shipping Address</h2>
            <div className="grid gap-4">
              <input required placeholder="Address" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
              <div className="grid sm:grid-cols-3 gap-4">
                <input required placeholder="City" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
                <input required placeholder="State" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
                <input required placeholder="ZIP" className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent" />
              </div>
            </div>
          </section>
          <section className="bg-surface border border-stroke rounded-3xl p-6">
            <h2 className="font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              {["Credit / Debit Card", "UPI", "Cash on Delivery"].map((m, i) => (
                <label
                  key={m}
                  className="flex items-center gap-3 border border-stroke rounded-xl px-4 py-3 text-sm cursor-pointer hover:border-accent"
                >
                  <input type="radio" name="pay" defaultChecked={i === 0} /> {m}
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit bg-surface border border-stroke rounded-3xl p-6 space-y-4 lg:sticky lg:top-24">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="space-y-2 max-h-48 overflow-auto">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="truncate pr-2">
                  {i.name} ×{i.qty}
                </span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 bg-bg border border-stroke rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => coupon && setApplied(true)}
              className="px-3 py-2 rounded-xl border border-stroke text-sm hover:border-accent"
            >
              Apply
            </button>
          </div>
          {applied && <p className="text-xs text-accent">Coupon applied — 10% off</p>}
          <div className="space-y-2 pt-2 border-t border-stroke text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(sub)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Discount</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-stroke">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            data-cursor
            className="w-full bg-text-primary text-bg py-3 rounded-full text-sm hover:bg-accent transition-colors"
          >
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
}
