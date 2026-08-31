import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote, Sparkles } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Product3DViewer from "../components/Product3DViewer";
import { products, featuredProduct, categories } from "../data/products";

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="text-muted mt-3">{sub}</p>}
    </div>
  );
}

const reviews = [
  { n: "Aarav", r: 5, t: "The 3D preview is unreal. Felt like holding the product." },
  { n: "Mira", r: 5, t: "Fast shipping and premium quality. Will buy again." },
  { n: "Leo", r: 4, t: "Beautiful interface, smooth and immersive experience." },
];

export default function Home() {
  const trending = products.filter((p) => p.featured).slice(0, 4);
  const newArr = products.filter((p) => p.newArrival).slice(0, 4);
  const best = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 h-80 rounded-3xl border border-stroke bg-surface overflow-hidden">
          <Product3DViewer type={featuredProduct.type} color={featuredProduct.color} />
        </div>
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
            Featured
          </p>
          <h3 className="text-3xl font-bold mb-3">{featuredProduct.name}</h3>
          <p className="text-muted mb-6">{featuredProduct.description}</p>
          <Link
            to={`/product/${featuredProduct.id}`}
            data-cursor
            className="inline-flex items-center gap-2 bg-text-primary text-bg px-6 py-3 rounded-full text-sm hover:bg-accent transition-colors"
          >
            View Product <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle
          eyebrow="Browse"
          title="Shop by Category"
          sub="Find exactly what you're looking for across our curated collections."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((c) => (
            <CategoryCard key={c.name} category={c} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/categories"
            data-cursor
            className="inline-flex items-center gap-2 border border-stroke rounded-full px-6 py-3 text-sm hover:border-accent transition-colors"
          >
            View all categories <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle eyebrow="Hot Right Now" title="Trending Products" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="py-16 border-y border-stroke bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Showcase" title="3D Product Showcase" />
          <div className="grid sm:grid-cols-3 gap-5">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-stroke bg-surface overflow-hidden"
              >
                <div className="h-56 bg-black/30">
                  <Product3DViewer type={p.type} color={p.color} scale={1.8} />
                </div>
                <div className="p-4">
                  <Link
                    to={`/product/${p.id}`}
                    data-cursor
                    className="font-medium hover:text-accent"
                  >
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted mt-1">{p.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle eyebrow="Just Landed" title="New Arrivals" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {newArr.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle eyebrow="Customer Favorites" title="Best Sellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-accent/20 to-transparent p-10 md:p-16 text-center">
          <Sparkles className="mx-auto mb-4 text-accent" size={28} />
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Up to 40% off select items
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Limited time offer. Upgrade your collection with premium gear at
            unbeatable prices.
          </p>
          <Link
            to="/shop"
            data-cursor
            className="inline-flex items-center gap-2 bg-text-primary text-bg px-7 py-3.5 rounded-full text-sm hover:bg-accent transition-colors"
          >
            Shop the Sale
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle eyebrow="Loved by Thousands" title="Customer Reviews" />
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-3xl border border-stroke bg-surface p-6">
              <Quote className="text-accent mb-3" size={22} />
              <p className="text-sm mb-4">{r.t}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.n}</span>
                <span className="flex text-accent">
                  {Array.from({ length: r.r }).map((_, k) => (
                    <Star key={k} size={14} className="fill-accent" />
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <SectionTitle eyebrow="Stay in the loop" title="Join the Newsletter" />
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-surface border border-stroke rounded-full px-5 py-3 outline-none focus:border-accent"
          />
          <button className="bg-text-primary text-bg px-6 py-3 rounded-full text-sm hover:bg-accent transition-colors">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
