import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += Math.random() * 14 + 4;
      if (i >= 100) {
        i = 100;
        setP(100);
        clearInterval(t);
        setTimeout(() => setDone(true), 500);
      } else {
        setP(i);
      }
    }, 110);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full border-2 border-stroke border-t-accent animate-spin mb-8" />
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            Entering the experience
          </p>
          <div className="mt-6 w-48 h-[2px] bg-stroke overflow-hidden rounded-full">
            <div
              className="h-full accent-gradient transition-all"
              style={{ width: `${p}%` }}
            />
          </div>
          <span className="mt-3 text-sm tabular-nums text-muted">
            {Math.round(p)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
