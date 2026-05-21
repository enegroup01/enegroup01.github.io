"use client";

import { useEffect, useRef } from "react";
import { SimplexNoise } from "@/lib/simplex";

type PaletteName = "orange" | "blue" | "green" | "white" | "ching";

const palettes: Record<PaletteName, Array<{ r: number; g: number; b: number }>> = {
  orange: [
    { r: 233, g: 238, b: 242 },
    { r: 243, g: 107, b: 33 },
    { r: 146, g: 156, b: 166 },
    { r: 255, g: 184, b: 118 }
  ],
  blue: [
    { r: 233, g: 238, b: 242 },
    { r: 116, g: 215, b: 255 },
    { r: 90, g: 105, b: 118 },
    { r: 180, g: 205, b: 218 }
  ],
  green: [
    { r: 233, g: 238, b: 242 },
    { r: 0, g: 193, b: 178 },
    { r: 75, g: 106, b: 116 },
    { r: 116, g: 215, b: 255 }
  ],
  white: [
    { r: 233, g: 238, b: 242 },
    { r: 148, g: 158, b: 168 },
    { r: 210, g: 222, b: 230 },
    { r: 243, g: 107, b: 33 }
  ],
  ching: [
    { r: 79, g: 143, b: 216 },
    { r: 75, g: 72, b: 165 },
    { r: 142, g: 174, b: 220 },
    { r: 45, g: 127, b: 209 }
  ]
};

type Props = {
  palette?: PaletteName;
  density?: "hero" | "divider" | "quiet";
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  speed: number;
  alpha: number;
  size: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function colorAt(palette: Array<{ r: number; g: number; b: number }>, value: number) {
  const t = (value + 1) * 0.5;
  const idx = t * (palette.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = palette[Math.min(i, palette.length - 1)];
  const b = palette[Math.min(i + 1, palette.length - 1)];
  return {
    r: Math.round(lerp(a.r, b.r, f)),
    g: Math.round(lerp(a.g, b.g, f)),
    b: Math.round(lerp(a.b, b.b, f))
  };
}

export function RadiantFlowField({ palette = "orange", density = "hero", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const media = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = new SimplexNoise(74);
    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const chosen = palettes[palette];
    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;

    const baseCount = density === "hero" ? 1600 : density === "divider" ? 760 : 420;
    const particleCount = media.matches ? Math.floor(baseCount * 0.38) : baseCount;
    const speed = density === "quiet" ? 0.62 : 0.92;
    const scale = density === "hero" ? 0.0023 : 0.0031;

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.34 + Math.random() * 0.94,
      alpha: 0.08 + Math.random() * 0.28,
      size: 0.35 + Math.random() * 1.1
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) particles.push(createParticle());
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const drawFallback = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(79,143,216,0.12)");
      gradient.addColorStop(0.5, "rgba(75,72,165,0.1)");
      gradient.addColorStop(1, "rgba(255,255,255,0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(247, 249, 252, 0.075)";
      ctx.fillRect(0, 0, width, height);
      time += 0.00085;

      for (const p of particles) {
        const nx = p.x * scale;
        const ny = p.y * scale;
        const angle = noise.noise3D(nx, ny, time) * Math.PI * 2;
        const colorNoise = noise.noise3D(nx * 1.6 + 40, ny * 1.6 + 40, time * 0.5);
        let vx = Math.cos(angle) * p.speed * speed;
        let vy = Math.sin(angle) * p.speed * speed;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const force = (1 - dist / 160) * 2.2;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        const px = p.x;
        const py = p.y;
        p.x += vx;
        p.y += vy;
        const color = colorAt(chosen, colorNoise);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha})`;
        ctx.lineWidth = p.size;
        ctx.stroke();

        if (p.x < -24 || p.x > width + 24 || p.y < -24 || p.y > height + 24) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    if (reducedMotion) {
      drawFallback();
    } else {
      frame = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, palette]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
