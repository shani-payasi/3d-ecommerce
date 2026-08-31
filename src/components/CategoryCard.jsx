import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      data-cursor
      className="group relative overflow-hidden rounded-3xl border border-stroke aspect-[4/5] hover:border-accent/50 transition-colors block"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <p className="text-xs text-white/70 uppercase tracking-widest">
          {category.count} items
        </p>
        <h3 className="text-2xl font-semibold text-white group-hover:translate-x-1 transition-transform">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
