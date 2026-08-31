import { Link } from "react-router-dom";
import Product3DViewer from "../components/Product3DViewer";
import { ArrowRight } from "lucide-react";

const stats = [
  { v: "20+", l: "Years Experience" },
  { v: "95+", l: "Projects Done" },
  { v: "200%", l: "Satisfied Clients" },
];

const team = [
  { n: "Alex Rivera", r: "Founder & CEO" },
  { n: "Priya Nair", r: "Head of Design" },
  { n: "Jonas Lee", r: "Lead Engineer" },
  { n: "Sofia Khan", r: "Brand Director" },
];

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
          Our Story
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Redefining commerce
        </h1>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          NOVA was born from a simple idea — shopping should feel as immersive
          as the products themselves. We build the bridge between physical craft
          and digital wonder.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="rounded-3xl border border-stroke bg-surface h-72 overflow-hidden">
          <Product3DViewer type="ring" color="#89aacc" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-stroke bg-surface p-8">
          <h3 className="text-xl font-semibold mb-3">Mission</h3>
          <p className="text-muted text-sm">
            To make premium shopping an experience, not a transaction.
          </p>
        </div>
        <div className="rounded-3xl border border-stroke bg-surface p-8">
          <h3 className="text-xl font-semibold mb-3">Vision</h3>
          <p className="text-muted text-sm">
            A world where every product can be explored in full 3D before you
            buy.
          </p>
        </div>
        <div className="rounded-3xl border border-stroke bg-surface p-8">
          <h3 className="text-xl font-semibold mb-3">Values</h3>
          <p className="text-muted text-sm">
            Craft, transparency, and an obsession with the details.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-3xl border border-stroke bg-surface py-10"
          >
            <p className="text-4xl font-bold text-accent">{s.v}</p>
            <p className="text-sm text-muted mt-2">{s.l}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((m) => (
            <div
              key={m.n}
              className="rounded-3xl border border-stroke bg-surface overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-accent/30 to-transparent" />
              <div className="p-4">
                <p className="font-medium">{m.n}</p>
                <p className="text-xs text-muted">{m.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
        <Link
          to="/shop"
          data-cursor
          className="inline-flex items-center gap-2 bg-text-primary text-bg px-7 py-3.5 rounded-full text-sm hover:bg-accent transition-colors"
        >
          Start Shopping <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
