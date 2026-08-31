import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      c++;
      setCount(c);
      if (c >= 100) clearInterval(interval);
    }, 2700 / 100);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      setTimeout(() => setIsLoading(false), 400);
    }
  }, [count]);

  return (
    <div className="min-h-screen bg-[#040405] text-[#f5f5f5] font-body antialiased">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-[#040405] flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#696969] mb-10">Portfolio</span>
          <h2 className="text-6xl md:text-8xl font-display italic text-[#f5f5f5]/80">Loading</h2>
          <span className="text-9xl font-display tabular-nums">{String(count).padStart(3, "0")}</span>
        </div>
      )}
      {!isLoading && (
        <>
          <section className="h-screen relative overflow-hidden">
            <video ref={(v) => {
              if (!v) return;
              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8');
                hls.attachMedia(v);
              } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
                v.src = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
              }
              v.play();
            }} autoPlay muted loop playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </section>
          <section className="py-16">
            <h2 className="text-5xl font-display italic">Works</h2>
          </section>
        </>
      )}
    </div>
  );
}
