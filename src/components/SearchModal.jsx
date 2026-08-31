import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../data/products";
import { formatPrice } from "../utils/helpers";

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nova_recent") || "[]");
    } catch {
      return [];
    }
  });

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const t = q.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t) ||
          p.description.toLowerCase().includes(t)
      )
      .slice(0, 6);
  }, [q]);

  const submit = (v) => {
    if (!v) return;
    const next = [v, ...recent.filter((x) => x !== v)].slice(0, 5);
    setRecent(next);
    localStorage.setItem("nova_recent", JSON.stringify(next));
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="absolute top-0 inset-x-0 p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-3xl mx-auto bg-surface border border-stroke rounded-3xl p-5">
          <div className="flex items-center gap-3 border-b border-stroke pb-3">
            <Search size={18} className="text-muted" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit(q)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted"
            />
            <button onClick={onClose} className="text-muted hover:text-text-primary">
              <X size={20} />
            </button>
          </div>

          {!q && recent.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-muted mb-2">Recent searches</p>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button
                    key={r}
                    onClick={() => setQ(r)}
                    className="px-3 py-1.5 rounded-full border border-stroke text-sm text-muted hover:text-text-primary"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2 max-h-80 overflow-auto">
            {q && results.length === 0 && (
              <p className="text-sm text-muted py-6 text-center">
                No results found for "{q}"
              </p>
            )}
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg transition-colors"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.category} · {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
