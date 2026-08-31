import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ onOpenSearch, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { items: wish } = useWishlist();
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setOpen(false), [loc]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-stroke"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-cursor>
          <span className="w-8 h-8 rounded-lg accent-gradient grid place-items-center text-bg font-bold text-sm">
            N
          </span>
          <span className="font-semibold tracking-tight text-lg">NOVA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                data-cursor
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  active
                    ? "text-text-primary bg-surface"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            data-cursor
            className="w-10 h-10 grid place-items-center rounded-full hover:bg-surface text-muted hover:text-text-primary transition-colors"
          >
            <Search size={18} />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            data-cursor
            className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-surface text-muted hover:text-text-primary transition-colors"
          >
            <Heart size={18} />
            <span
              className={`absolute top-1 right-1 text-[10px] w-4 h-4 grid place-items-center rounded-full ${
                wish.length ? "bg-accent text-bg" : "hidden"
              }`}
            >
              {wish.length}
            </span>
          </Link>
          <button
            onClick={onOpenCart}
            aria-label="Cart"
            data-cursor
            className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-surface text-muted hover:text-text-primary transition-colors"
          >
            <ShoppingBag size={18} />
            <span
              className={`absolute top-1 right-1 text-[10px] w-4 h-4 grid place-items-center rounded-full ${
                count ? "bg-accent text-bg" : "hidden"
              }`}
            >
              {count}
            </span>
          </button>
          <Link
            to="/login"
            aria-label="Account"
            data-cursor
            className="hidden sm:grid w-10 h-10 place-items-center rounded-full hover:bg-surface text-muted hover:text-text-primary transition-colors"
          >
            <User size={18} />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            data-cursor
            className="md:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-surface text-text-primary"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-stroke" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-1 bg-bg/95 backdrop-blur">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-3 rounded-xl text-sm ${
                  active ? "bg-surface text-text-primary" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
