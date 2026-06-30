"use client";


import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const floaters = [
  {
    src: "/products/ceramic.png",
    alt: "Handcrafted ceramic vase",
    x: 8,
    y: 14,
    size: 132,
    depth: 26,
    delay: "-1s",
    duration: "animate-float",
  },
  {
    src: "/products/jewelry.png",
    alt: "Handmade gold jewelry",
    x: 64,
    y: 6,
    size: 116,
    depth: 40,
    delay: "-3s",
    duration: "animate-float-slow",
  },
  {
    src: "/products/candle.png",
    alt: "Artisan soy candle",
    x: 72,
    y: 52,
    size: 124,
    depth: 18,
    delay: "-2.4s",
    duration: "animate-float",
  },
  {
    src: "/products/skincare.png",
    alt: "Natural skincare serum",
    x: 4,
    y: 58,
    size: 120,
    depth: 34,
    delay: "-4s",
    duration: "animate-float-slow",
  },
  {
    src: "/products/leather.png",
    alt: "Handmade leather goods",
    x: 40,
    y: 74,
    size: 104,
    depth: 22,
    delay: "-1.8s",
    duration: "animate-float",
  },
];

// network node anchor points in % (matches floaters loosely)
const nodes = [
  { x: 16, y: 24 },
  { x: 70, y: 16 },
  { x: 50, y: 50 },
  { x: 78, y: 62 },
  { x: 14, y: 66 },
  { x: 46, y: 82 },
];

const links = [
  [2, 0],
  [2, 1],
  [2, 3],
  [2, 4],
  [2, 5],
  [0, 1],
  [4, 5],
];

export function HeroScene() {
  const ref = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPointer({ x: px, y: py }));
    };
    const reset = () => setPointer({ x: 0, y: 0 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scene-3d relative mx-auto h-[440px] w-full max-w-lg sm:h-[540px]"
      style={{
        transform: `rotateX(${pointer.y * -6}deg) rotateY(${pointer.x * 8}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* glowing depth backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[90px] animate-glow" />
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 animate-spin-slow" />
        <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 animate-spin-slow [animation-direction:reverse]" />
      </div>

      {/* central glass plate */}
      <div className="glass-strong absolute inset-16 rounded-[2.5rem] border border-border/60 shadow-2xl shadow-black/15" />

      {/* AI network connections */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="aiLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#aiLine)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            className="animate-dash"
            style={{ opacity: 0.55 }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 2 ? 1.4 : 0.9}
            fill={i === 2 ? "var(--gold)" : "var(--primary)"}
            className="animate-pulse-node"
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </svg>

      {/* floating products on depth layers */}
      {floaters.map((f) => (
        <div
          key={f.src}
          className={`absolute ${f.duration}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            transform: `translate3d(${pointer.x * f.depth}px, ${pointer.y * f.depth}px, ${f.depth}px)`,
            transition: "transform 0.25s ease-out",
          }}
        >
          <div className="glass flex size-full items-center justify-center rounded-3xl border border-border/60 p-2.5 shadow-xl shadow-black/15">
            <img
              src={f.src}
              alt={f.alt}
              width={160}
              height={160}
              className="size-full rounded-2xl object-cover"
            />
          </div>
        </div>
      ))}

      {/* floating metric cards */}
      <Metric
        className="left-[-6%] top-[40%]"
        depth={48}
        pointer={pointer}
        value="+240%"
        label="Reach growth"
      />

      <Metric
        className="right-[-4%] top-[24%]"
        depth={56}
        pointer={pointer}
        value="95%"
        label="Creator match"
        gold
      />

      <Metric
        className="bottom-[6%] right-[10%]"
        depth={44}
        pointer={pointer}
        value="500+"
        label="Verified brands"
      />

      {/* AI badge */}
      <div
        className="glass-strong absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-gold/40 px-4 py-2 shadow-xl shadow-black/20"
        style={{ transform: `translate(-50%, -50%) translateZ(60px)` }}
      >
        <Sparkles className="size-4 text-gold" aria-hidden="true" />
        <span className="text-sm font-semibold">AI matching live</span>
      </div>
    </div>
  );
}

function Metric({ className, depth, pointer, value, label, gold }) {
  return (
    <div
      className={`glass-strong absolute rounded-2xl border border-border/60 px-4 py-3 text-center shadow-xl shadow-black/15 ${className}`}
      style={{
        transform: `translate3d(${pointer.x * depth}px, ${pointer.y * depth}px, ${depth}px)`,
        transition: "transform 0.25s ease-out",
      }}
    >
      <p
        className={`font-heading text-2xl font-semibold ${gold ? "text-gold" : "text-primary"}`}
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
