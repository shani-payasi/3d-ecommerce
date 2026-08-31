import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const t = e.target.closest("a, button, [data-cursor]");
      setHover(!!t);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity .2s",
      }}
    >
      <div
        className={`rounded-full bg-white/70 mix-blend-difference transition-transform duration-200 ${
          hover
            ? "w-10 h-10 -translate-x-5 -translate-y-5"
            : "w-3 h-3 -translate-x-1.5 -translate-y-1.5"
        }`}
      />
    </div>
  );
}
