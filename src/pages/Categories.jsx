import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/products";

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Categories</h1>
      <p className="text-muted mb-8">Browse our collections by category.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((c) => (
          <CategoryCard key={c.name} category={c} />
        ))}
      </div>
    </div>
  );
}
