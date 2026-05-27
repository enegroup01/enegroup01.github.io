"use client";

import { useEffect, useRef } from "react";

type ShaderVariant = "branching-tree" | "pendulum-wave" | "spark-chamber" | "laser-precision" | "clockwork-mind";
type BrandTone = "ching" | "ching-soft" | "mitutoyo" | "siemens";

type Props = {
  variant: ShaderVariant;
  tone?: BrandTone;
  className?: string;
};

const tones = {
  ching: {
    a: [79, 143, 216],
    b: [75, 72, 165],
    hot: [255, 255, 255]
  },
  "ching-soft": {
    a: [157, 191, 235],
    b: [172, 166, 225],
    hot: [255, 255, 255]
  },
  mitutoyo: {
    a: [243, 107, 33],
    b: [79, 143, 216],
    hot: [255, 245, 225]
  },
  siemens: {
    a: [0, 143, 126],
    b: [79, 143, 216],
    hot: [245, 255, 252]
  }
} as const;

const rgba = (rgb: readonly number[], a: number) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
const mix = (a: readonly number[], b: readonly number[], t: number) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t)
];

const branchingTreeDemoParams = {
  growthSpeed: 0.008,
  branchDepth: 9
};

export function RadiantIndustrialShader({ variant, tone = "ching", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const color = tones[tone];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    let width = 1;
    let height = 1;
    let frame = 0;
    let running = false;
    let start = performance.now();
    let pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start = performance.now();
    };

    const clearPaper = (alpha = 0.78) => {
      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, `rgba(255,255,255,${alpha * 0.78})`);
      bg.addColorStop(0.6, `rgba(247,249,252,${alpha * 0.62})`);
      bg.addColorStop(1, `rgba(235,241,249,${alpha * 0.72})`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    };

    const drawClockwork = (time: number) => {
      clearPaper(0.38);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const unit = Math.min(width, height) / (mobile ? 8.5 : 10.5);
      const gears = [
        { x: 0, y: 0, r: 1.28, teeth: 34, dir: 1, speed: 0.42, spoke: 6 },
        { x: 2.2, y: -0.55, r: 0.82, teeth: 22, dir: -1, speed: 0.64, spoke: 5 },
        { x: -2.05, y: 0.58, r: 0.9, teeth: 24, dir: -1, speed: 0.58, spoke: 6 },
        { x: 1.22, y: 1.58, r: 0.62, teeth: 16, dir: 1, speed: 0.82, spoke: 4 },
        { x: -1.08, y: -1.54, r: 0.68, teeth: 18, dir: 1, speed: 0.76, spoke: 5 }
      ];

      const drawGear = (gear: (typeof gears)[number], index: number) => {
        const x = cx + gear.x * unit;
        const y = cy + gear.y * unit;
        const radius = gear.r * unit;
        const toothDepth = radius * 0.12;
        const root = radius - toothDepth;
        const tip = radius + toothDepth;
        const rotation = gear.dir * time * gear.speed + index * 0.42;
        const primary = index % 2 === 0 ? color.a : color.b;
        const secondary = index % 2 === 0 ? color.b : color.a;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < gear.teeth * 2; i += 1) {
          const angle = (i / (gear.teeth * 2)) * Math.PI * 2;
          const rr = i % 2 === 0 ? tip : root;
          const px = Math.cos(angle) * rr;
          const py = Math.sin(angle) * rr;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(-radius * 0.28, -radius * 0.28, radius * 0.08, 0, 0, tip);
        grad.addColorStop(0, rgba(color.hot, 0.7));
        grad.addColorStop(0.32, rgba(primary, 0.56));
        grad.addColorStop(0.78, rgba(secondary, 0.34));
        grad.addColorStop(1, rgba(primary, 0.18));
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = rgba(primary, 0.82);
        ctx.lineWidth = 1.4;
        ctx.shadowColor = rgba(primary, 0.32);
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = rgba(secondary, 0.5);
        ctx.lineWidth = 1;
        for (let i = 0; i < gear.spoke; i += 1) {
          const angle = (i / gear.spoke) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * radius * 0.22, Math.sin(angle) * radius * 0.22);
          ctx.lineTo(Math.cos(angle) * radius * 0.72, Math.sin(angle) * radius * 0.72);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.72)";
        ctx.fill();
        ctx.strokeStyle = rgba(primary, 0.7);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = rgba(secondary, 0.85);
        ctx.fill();
        ctx.restore();

        const halo = ctx.createRadialGradient(x, y, 0, x, y, tip * 1.5);
        halo.addColorStop(0, rgba(primary, 0.14));
        halo.addColorStop(1, rgba(primary, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, tip * 1.5, 0, Math.PI * 2);
        ctx.fill();
      };

      ctx.strokeStyle = rgba(color.b, 0.18);
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 34) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      gears.forEach(drawGear);
    };

    const drawTree = (time: number) => {
      clearPaper(0.46);
      const cx = width * (mobile ? 0.5 : 0.58);
      const baseY = height * (mobile ? 0.68 : 0.84);
      const maxDepth = branchingTreeDemoParams.branchDepth;
      const sway = (pointer.active ? (pointer.x / width - 0.5) * 0.28 : 0) + Math.sin(time * 0.35) * 0.045;
      const growth = reduced ? 1 : Math.min(1, (((time * 60 * branchingTreeDemoParams.growthSpeed) % 1.4) / 1.05));

      const drawBranch = (x: number, y: number, len: number, angle: number, depth: number, seed: number) => {
        if (depth > maxDepth || len < 5) return;
        const localGrow = Math.max(0, Math.min(1, growth * (maxDepth + 1) - depth * 0.65));
        if (localGrow <= 0) return;
        const t = 1 - Math.pow(1 - localGrow, 3);
        const bend = Math.sin(time * 0.7 + seed) * 0.08 + sway * (depth / maxDepth);
        const a = angle + bend;
        const x2 = x + Math.cos(a) * len * t;
        const y2 = y + Math.sin(a) * len * t;
        const depthT = depth / maxDepth;
        const stroke = Math.max(0.8, (maxDepth - depth + 1) * 0.78);
        const c = mix(color.b, color.a, depthT);

        ctx.beginPath();
        ctx.moveTo(x, y);
        const cx1 = x + Math.cos(a - 0.16) * len * 0.35 * t;
        const cy1 = y + Math.sin(a - 0.16) * len * 0.35 * t;
        const cx2 = x + Math.cos(a + 0.12) * len * 0.7 * t;
        const cy2 = y + Math.sin(a + 0.12) * len * 0.7 * t;
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        ctx.strokeStyle = rgba(c, 0.34 + depthT * 0.5);
        ctx.lineWidth = stroke * 1.25;
        ctx.lineCap = "round";
        ctx.stroke();

        if (depth >= maxDepth - 2) {
          ctx.beginPath();
          ctx.arc(x2, y2, 1.2 + Math.sin(time * 2 + seed) * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = rgba(color.a, 0.48);
          ctx.fill();
        }

        if (localGrow > 0.62) {
          const spread = 0.34 + Math.sin(seed * 3.1) * 0.08;
          drawBranch(x2, y2, len * 0.72, a - spread, depth + 1, seed + 1.7);
          drawBranch(x2, y2, len * 0.68, a + spread, depth + 1, seed + 2.4);
          if (depth < 3) drawBranch(x2, y2, len * 0.58, a + Math.sin(seed) * 0.22, depth + 1, seed + 4.2);
        }
      };

      drawBranch(cx, baseY, height * (mobile ? 0.15 : 0.18), -Math.PI / 2, 0, 1);
    };

    const drawPendulum = (time: number) => {
      clearPaper(0.62);
      const count = mobile ? 13 : 22;
      const margin = width * 0.08;
      const top = height * 0.16;
      const usable = width - margin * 2;
      ctx.strokeStyle = rgba(color.b, 0.42);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(margin, top);
      ctx.lineTo(width - margin, top);
      ctx.stroke();

      const points: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < count; i += 1) {
        const t = i / (count - 1);
        const pivotX = margin + usable * t;
        const length = height * (0.34 + 0.28 * (1 - t));
        const omega = 1.3 + i * 0.052;
        const angle = Math.cos(time * omega) * 0.46;
        const x = pivotX + Math.sin(angle) * length;
        const y = top + Math.cos(angle) * length;
        points.push({ x, y });
        const c = mix(color.a, color.b, t);

        ctx.beginPath();
        ctx.moveTo(pivotX, top);
        ctx.lineTo(x, y);
        ctx.strokeStyle = rgba(c, 0.38);
        ctx.lineWidth = 1.15;
        ctx.stroke();

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 18);
        glow.addColorStop(0, rgba(c, 0.62));
        glow.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(c, 0.95);
        ctx.beginPath();
        ctx.arc(x, y, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = rgba(color.a, 0.62);
      ctx.lineWidth = 2.4;
      ctx.stroke();
    };

    type Spark = { x: number; y: number; vx: number; vy: number; e: number; q: number; trail: Array<{ x: number; y: number; e: number }> };
    const sparks: Spark[] = [];
    const spawnSpark = () => {
      const speed = 2.2 + Math.random() * 2.6;
      const angle = -0.35 + Math.random() * 0.7;
      sparks.push({
        x: width * 0.08,
        y: height * (0.2 + Math.random() * 0.6),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        e: 0.9,
        q: Math.random() < 0.5 ? 1 : -1,
        trail: []
      });
    };

    const drawSpark = () => {
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.fillRect(0, 0, width, height);
      if (sparks.length < (mobile ? 9 : 18) && Math.random() < 0.18) spawnSpark();
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        const b = 0.012;
        const ax = s.q * b * s.vy;
        const ay = -s.q * b * s.vx;
        s.vx = (s.vx + ax) * 0.996;
        s.vy = (s.vy + ay) * 0.996;
        s.x += s.vx;
        s.y += s.vy;
        s.e *= 0.997;
        s.trail.push({ x: s.x, y: s.y, e: s.e });
        if (s.trail.length > 110) s.trail.shift();
        const c = mix(color.a, color.b, s.q > 0 ? 0.25 : 0.8);
        for (let j = 1; j < s.trail.length; j += 1) {
          const p0 = s.trail[j - 1];
          const p1 = s.trail[j];
          const a = (j / s.trail.length) * 0.58 * p1.e;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = rgba(c, a);
          ctx.lineWidth = 1.2 + p1.e * 3.6;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        ctx.fillStyle = rgba(color.hot, 0.98);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        if (s.e < 0.08 || s.x > width + 80 || s.y < -80 || s.y > height + 80) sparks.splice(i, 1);
      }
    };

    const makeTriangle = (cx: number, cy: number, r: number) => Array.from({ length: 4 }, (_, i) => {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / 3);
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

    const makeHexagon = (cx: number, cy: number, r: number) => Array.from({ length: 7 }, (_, i) => {
        const a = -Math.PI / 6 + i * (Math.PI * 2 / 6);
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

    const makeDiamond = (cx: number, cy: number, r: number) => Array.from({ length: 5 }, (_, i) => {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / 4);
        return { x: cx + Math.cos(a) * r * (i % 2 ? 0.65 : 1), y: cy + Math.sin(a) * r };
      });

    const makeLaserShape = (time: number, cx: number, cy: number, r: number) => {
      const shapeIndex = Math.abs(Math.floor(time / 5)) % 3;
      if (shapeIndex === 0) return makeTriangle(cx, cy, r);
      if (shapeIndex === 1) return makeHexagon(cx, cy, r);
      return makeDiamond(cx, cy, r);
    };

    const drawLaser = (time: number) => {
      clearPaper(0.54);
      const cx = width * 0.58;
      const cy = height * 0.48;
      const r = Math.min(width, height) * (mobile ? 0.26 : 0.32);
      const shape = makeLaserShape(time, cx, cy, r);
      const perimeter = shape.reduce((sum, p, i) => {
        if (i === 0) return sum;
        const q = shape[i - 1];
        return sum + Math.hypot(p.x - q.x, p.y - q.y);
      }, 0);
      const progress = reduced ? 1 : (time * 0.18) % 1;
      let remaining = perimeter * progress;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = rgba(color.b, 0.34);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      shape.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();

      let tip = shape[0];
      ctx.beginPath();
      ctx.moveTo(shape[0].x, shape[0].y);
      for (let i = 1; i < shape.length; i += 1) {
        const p0 = shape[i - 1];
        const p1 = shape[i];
        const len = Math.hypot(p1.x - p0.x, p1.y - p0.y);
        if (remaining >= len) {
          ctx.lineTo(p1.x, p1.y);
          tip = p1;
          remaining -= len;
        } else {
          const t = Math.max(0, remaining / len);
          tip = { x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t };
          ctx.lineTo(tip.x, tip.y);
          break;
        }
      }
      ctx.strokeStyle = rgba(color.a, 1);
      ctx.lineWidth = 2.8;
      ctx.shadowColor = rgba(color.a, 0.82);
      ctx.shadowBlur = 24;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const glow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 70);
      glow.addColorStop(0, rgba(color.hot, 0.95));
      glow.addColorStop(0.18, rgba(color.a, 0.72));
      glow.addColorStop(1, rgba(color.a, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 70, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 16; i += 1) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 42;
        ctx.fillStyle = rgba(color.b, 0.42 + Math.random() * 0.5);
        ctx.fillRect(tip.x + Math.cos(a) * d, tip.y + Math.sin(a) * d, 1.4, 1.4);
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      const time = (now - start) / 1000;
      if (variant === "branching-tree") drawTree(time);
      if (variant === "pendulum-wave") drawPendulum(time);
      if (variant === "spark-chamber") drawSpark();
      if (variant === "laser-precision") drawLaser(time);
      if (variant === "clockwork-mind") drawClockwork(time);
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      start = performance.now();
      frame = requestAnimationFrame(draw);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    if (variant === "spark-chamber") clearPaper(0.5);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { rootMargin: "180px" }
    );
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [tone, variant]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
