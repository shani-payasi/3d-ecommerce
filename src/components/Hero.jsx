git add src/components/Hero.jsx
git commit -m "Add interactive hero section"import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Product3DViewer from "./Product3DViewer";
import { featuredProduct } from "../data/products";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-desc", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".hero-btn", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-3d", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(137,170,204,0.12),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center w-full">
        <div>
          <span className="hero-badge inline-block text-xs uppercase tracking-[0.3em] text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-6">
            The Future of Shopping
          </span>
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
            Experience Shopping in <span className="text-accent">3D</span>
          </h1>
          <p className="hero-desc text-muted text-lg max-w-md mb-8">
            Discover premium products through an immersive digital shopping
            experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              data-cursor
              className="hero-btn bg-text-primary text-bg px-7 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors hover:scale-105"
            >
              Explore Collection
            </Link>
            <Link
              to="/shop"
              data-cursor
              className="hero-btn border border-stroke text-text-primary px-7 py-3.5 rounded-full text-sm font-medium hover:border-accent transition-colors hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="hero-3d relative h-[360px] sm:h-[480px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(137,170,204,0.15),transparent_60%)] blur-2xl" />
          <Product3DViewer
            type={featuredProduct.type}
            color={featuredProduct.color}
            scale={2.4}
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted">
            Drag to rotate
          </div>
        </div>
      </div>
    </section>
  );
}
