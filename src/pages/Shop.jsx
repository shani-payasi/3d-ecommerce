import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const priceRanges = [
  { l: "Under ₹5,000", min: 0, max: 5000 },
  { l: "₹5,000–₹10,000", min: 5000, max: 10000 },
  { l: "₹10,000–₹20,000", min: 10000, max: 20000 },
  { l: "Above ₹20,000", min: 20000, max: Infinity },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [cat, setCat] = useState(params.get("category") || "All");
  const [price, setPrice] = useState("All");
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let r = products.slice();
    if (cat !== "All") r = r.filter((p) => p.category === cat);
    if (price !== "All") {
      const pr = priceRanges.find((p) => p.l === price);
      r = r.filter((p) => p.price >= pr.min && p.price < pr.max);
    }
    if (rating) r = r.filter((p) => p.rating >= rating);
    if (q) {
      const t = q.toLowerCase();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.description.toLowerCase().includes(t)
      );
    }
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      r.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    return r;
  }, [cat, price, rating, q, sort]);

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Shop</h1>
      <p className="text-muted mb-8">
        Explore our full collection of premium products.
      </p>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Category</h3>
            <div className="flex flex-col gap-1">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    if (c === "All") setParams({});
                    else setParams({ category: c });
                  }}
                  data-cursor
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    cat === c
                      ? "bg-surface text-text-primary"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Price</h3>
            <div className="flex flex-col gap-1">
              {["All", ...priceRanges.map((p) => p.l)].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrice(p)}
                  data-cursor
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    price === p
                      ? "bg-surface text-text-primary"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Rating</h3>
            <div className="flex flex-col gap-1">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(r)}
                  data-cursor
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    rating === r
                      ? "bg-surface text-text-primary"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {r === 0 ? "All" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 bg-surface border border-stroke rounded-full px-4">
              <Search size={16} className="text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none py-2.5 text-sm"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-surface border border-stroke rounded-full px-4 py-2.5 text-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <p className="text-sm text-muted mb-4">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted">
              No products match your filters.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisible((v) => v + 8)}
                    data-cursor
                    className="border border-stroke rounded-full px-6 py-3 text-sm hover:border-accent transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
