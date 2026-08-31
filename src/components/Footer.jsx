import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const cols = [
    { h: "Shop", links: ["Sneakers", "Watches", "Headphones", "Bags"] },
    { h: "Company", links: ["About", "Careers", "Press", "Sustainability"] },
    { h: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
  ];

  return (
    <footer className="border-t border-stroke bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg accent-gradient grid place-items-center text-bg font-bold text-sm">
              N
            </span>
            <span className="font-semibold text-lg tracking-tight">NOVA</span>
          </div>
          <p className="text-muted text-sm max-w-xs">
            Premium products in an immersive 3D shopping experience. The future
            of retail is here.
          </p>
          <div className="flex gap-3 mt-5 text-muted">
            {[Twitter, Instagram, Linkedin, Github].map((I, i) => (
              <a
                key={i}
                href="#"
                data-cursor
                className="w-9 h-9 grid place-items-center rounded-full border border-stroke hover:border-accent hover:text-text-primary transition-colors"
              >
                <I size={16} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-sm font-semibold mb-4">{c.h}</h4>
            <ul className="space-y-2 text-sm text-muted">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-text-primary transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-stroke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} NOVA. All rights reserved.</span>
          <span>Crafted for the future of shopping.</span>
        </div>
      </div>
    </footer>
  );
}
