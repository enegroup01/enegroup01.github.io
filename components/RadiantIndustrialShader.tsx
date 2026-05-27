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
    const burnCanvas = document.createElement("canvas");
    const burnCtx = burnCanvas.getContext("2d");
    let laserNeedsReset = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (burnCtx) {
        burnCanvas.width = Math.floor(width * dpr);
        burnCanvas.height = Math.floor(height * dpr);
        burnCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      start = performance.now();
      laserNeedsReset = true;
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

    type Point = { x: number; y: number };
    type LaserTrace = {
      points: Point[];
      segLengths: number[];
      totalLength: number;
      drawnLength: number;
      speed: number;
      done: boolean;
      tip: Point;
      prevTip: Point;
    };
    type LaserSpark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; bright: boolean };
    type LaserSmoke = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; grow: number; opacity: number };

    const makeCircle = (cx: number, cy: number, r: number, segments: number) => Array.from({ length: segments + 1 }, (_, i) => {
        const a = (i / segments) * Math.PI * 2 - Math.PI / 2;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });
    const makeStar = (cx: number, cy: number, outerR: number, innerR: number, points: number, rotation = 0) => Array.from({ length: points * 2 + 1 }, (_, i) => {
        const a = (i / (points * 2)) * Math.PI * 2 + rotation - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });
    const makeSpiral = (cx: number, cy: number, maxR: number, turns: number, segments: number) => Array.from({ length: segments + 1 }, (_, i) => {
        const t = i / segments;
        const a = t * turns * Math.PI * 2 - Math.PI / 2;
        const r = t * maxR;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });
    const makeLaserPolygon = (cx: number, cy: number, r: number, sides: number, rotation = 0) => Array.from({ length: sides + 1 }, (_, i) => {
        const a = (i / sides) * Math.PI * 2 + rotation;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

    let laserShapeIndex = 0;
    let laserPhase: "drawing" | "holding" | "fading" = "drawing";
    let laserPhaseTimer = 0;
    let laserFadeAlpha = 1;
    let laserLastTime = 0;
    let laserTraces: LaserTrace[] = [];
    let laserSparks: LaserSpark[] = [];
    let laserSmoke: LaserSmoke[] = [];

    const createLaserTrace = (points: Point[]): LaserTrace => {
      const segLengths = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
      const totalLength = segLengths.reduce((sum, length) => sum + length, 0);
      return {
        points,
        segLengths,
        totalLength,
        drawnLength: 0,
        speed: (180 + Math.random() * 120) * (mobile ? 0.8 : 1),
        done: false,
        tip: points[0],
        prevTip: points[0]
      };
    };

    const laserPosAt = (trace: LaserTrace, dist: number) => {
      let walked = 0;
      for (let i = 0; i < trace.segLengths.length; i += 1) {
        const length = trace.segLengths[i];
        if (walked + length >= dist) {
          const t = length > 0 ? (dist - walked) / length : 0;
          const p0 = trace.points[i];
          const p1 = trace.points[i + 1];
          return { x: p0.x + (p1.x - p0.x) * t, y: p0.y + (p1.y - p0.y) * t };
        }
        walked += length;
      }
      return trace.points[trace.points.length - 1];
    };

    const generateLaserShapeSet = () => {
      const cx = width * (mobile ? 0.5 : 0.54);
      const cy = height * (mobile ? 0.42 : 0.5);
      const scale = Math.min(width, height) * (mobile ? 0.35 : 0.42);
      const set: Point[][] = [];
      switch (laserShapeIndex % 7) {
        case 0:
          set.push(makeLaserPolygon(cx, cy + scale * 0.2, scale * 0.82, 3, -Math.PI / 2));
          set.push(makeCircle(cx, cy + scale * 0.2, scale * 0.42, 48));
          set.push(makeLaserPolygon(cx, cy + scale * 0.2, scale * 0.35, 3, Math.PI / 2));
          break;
        case 1:
          set.push(makeDiamond(cx, cy, scale * 0.78));
          set.push(makeCircle(cx, cy, scale * 0.55, 48));
          break;
        case 2:
          set.push(makeStar(cx, cy, scale * 0.82, scale * 0.34, 5));
          set.push(makeLaserPolygon(cx, cy, scale * 0.52, 5, -Math.PI / 2));
          set.push(makeCircle(cx, cy, scale * 0.26, 36));
          break;
        case 3:
          set.push(makeLaserPolygon(cx, cy, scale * 0.82, 6, -Math.PI / 6));
          set.push(makeLaserPolygon(cx, cy, scale * 0.5, 6));
          set.push(makeCircle(cx, cy, scale * 0.68, 48));
          break;
        case 4:
          set.push(makeCircle(cx, cy, scale * 0.78, 64));
          set.push(makeStar(cx, cy, scale * 0.74, scale * 0.3, 8));
          set.push(makeLaserPolygon(cx, cy, scale * 0.4, 4, Math.PI / 4));
          break;
        case 5:
          set.push(makeSpiral(cx, cy, scale * 0.72, 3, 120));
          set.push(makeCircle(cx, cy, scale * 0.78, 48));
          break;
        default:
          set.push(makeLaserPolygon(cx, cy, scale * 0.82, 4, Math.PI / 4));
          set.push(makeLaserPolygon(cx, cy, scale * 0.55, 4));
          set.push(makeLaserPolygon(cx, cy, scale * 0.3, 4, Math.PI / 4));
      }
      laserShapeIndex += 1;
      return set;
    };

    const startNewLaserShape = () => {
      laserTraces = generateLaserShapeSet().map(createLaserTrace);
      laserSparks = [];
      laserSmoke = [];
      laserPhase = "drawing";
      laserPhaseTimer = 0;
      laserFadeAlpha = 1;
      laserNeedsReset = false;
      burnCtx?.clearRect(0, 0, width, height);
    };

    const burnScorch = (x1: number, y1: number, x2: number, y2: number) => {
      if (!burnCtx) return;
      burnCtx.lineCap = "round";
      burnCtx.beginPath();
      burnCtx.moveTo(x1, y1);
      burnCtx.lineTo(x2, y2);
      burnCtx.strokeStyle = "rgba(12, 10, 8, 0.62)";
      burnCtx.lineWidth = 5;
      burnCtx.stroke();
      burnCtx.beginPath();
      burnCtx.moveTo(x1, y1);
      burnCtx.lineTo(x2, y2);
      burnCtx.strokeStyle = "rgba(48, 35, 26, 0.42)";
      burnCtx.lineWidth = 3;
      burnCtx.stroke();
    };

    const emitLaserSparks = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * 280;
        const life = 0.2 + Math.random() * 0.8;
        laserSparks.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed * (0.5 + Math.random() * 0.5),
          vy: Math.sin(angle) * speed * (0.5 + Math.random() * 0.5),
          life,
          maxLife: life,
          size: 0.5 + Math.random() * 2.5,
          bright: Math.random() > 0.3
        });
      }
    };

    const emitLaserSmoke = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i += 1) {
        const life = 0.8 + Math.random() * 1.5;
        laserSmoke.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 20,
          vy: -(15 + Math.random() * 40),
          life,
          maxLife: life,
          size: 4 + Math.random() * 12,
          grow: 8 + Math.random() * 16,
          opacity: 0.06 + Math.random() * 0.1
        });
      }
    };

    const updateLaserTrace = (trace: LaserTrace, dt: number) => {
      if (trace.done) return;
      trace.prevTip = trace.tip;
      trace.drawnLength = Math.min(trace.totalLength, trace.drawnLength + trace.speed * dt);
      trace.tip = laserPosAt(trace, trace.drawnLength);
      burnScorch(trace.prevTip.x, trace.prevTip.y, trace.tip.x, trace.tip.y);
      if (Math.random() < 0.85) emitLaserSparks(trace.tip.x, trace.tip.y, 2 + Math.floor(Math.random() * 4));
      if (Math.random() < 0.6) emitLaserSmoke(trace.tip.x, trace.tip.y, 1 + Math.floor(Math.random() * 2));
      if (trace.drawnLength >= trace.totalLength) {
        trace.done = true;
        emitLaserSparks(trace.tip.x, trace.tip.y, 24);
        emitLaserSmoke(trace.tip.x, trace.tip.y, 8);
      }
    };

    const drawLaserBeam = (trace: LaserTrace) => {
      if (trace.drawnLength <= 0 || trace.done) return;
      const hotZone = Math.min(120, trace.totalLength * 0.28);
      const hotStart = Math.max(0, trace.drawnLength - hotZone);
      let walked = 0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const layers = [
        { color: "rgba(200, 60, 20,", alpha: 0.06, width: 40 },
        { color: "rgba(220, 120, 40,", alpha: 0.12, width: 22 },
        { color: "rgba(255, 160, 60,", alpha: 0.2, width: 12 },
        { color: "rgba(255, 220, 160,", alpha: 0.4, width: 5 },
        { color: "rgba(255, 250, 240,", alpha: 0.78, width: 1.2 }
      ];
      for (let i = 1; i < trace.points.length; i += 1) {
        const p0 = trace.points[i - 1];
        const p1 = trace.points[i];
        const len = trace.segLengths[i - 1];
        const segStart = walked;
        const segEnd = walked + len;
        walked = segEnd;
        if (segEnd <= hotStart || segStart >= trace.drawnLength) continue;
        const t0 = Math.max(0, (hotStart - segStart) / len);
        const t1 = Math.min(1, (trace.drawnLength - segStart) / len);
        if (t1 <= t0) continue;
        const x0 = p0.x + (p1.x - p0.x) * t0;
        const y0 = p0.y + (p1.y - p0.y) * t0;
        const x1 = p0.x + (p1.x - p0.x) * t1;
        const y1 = p0.y + (p1.y - p0.y) * t1;
        const heat = Math.pow((segEnd - hotStart) / hotZone, 2);
        layers.forEach((layer) => {
          const alpha = layer.alpha * heat * laserFadeAlpha;
          if (alpha < 0.002) return;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = `${layer.color} ${alpha.toFixed(4)})`;
          ctx.lineWidth = layer.width;
          ctx.stroke();
        });
      }
    };

    const drawLaserTip = (x: number, y: number) => {
      const flicker = 0.86 + Math.random() * 0.14;
      [
        { r: 120, a: 0.12, c: "255, 100, 20" },
        { r: 60, a: 0.3, c: "255, 160, 40" },
        { r: 30, a: 0.55, c: "255, 220, 140" },
        { r: 14, a: 0.92, c: "255, 255, 245" },
        { r: 5, a: 1, c: "255, 255, 255" }
      ].forEach((layer) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, layer.r);
        grad.addColorStop(0, `rgba(${layer.c}, ${(layer.a * flicker * laserFadeAlpha).toFixed(4)})`);
        grad.addColorStop(1, `rgba(${layer.c}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, layer.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawLaser = (time: number) => {
      if (!burnCtx) return;
      if (laserNeedsReset || laserTraces.length === 0) startNewLaserShape();
      const dt = laserLastTime ? Math.min(time - laserLastTime, 0.05) : 0.016;
      laserLastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#3d3937";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 56; i += 1) {
        if (Math.random() > 0.45) continue;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(90,85,80,0.04)" : "rgba(25,23,21,0.04)";
        ctx.fillRect(Math.random() * width, Math.random() * height, 3 + Math.random() * 12, 1);
      }

      if (laserPhase === "drawing") {
        let allDone = true;
        laserTraces.forEach((trace) => {
          updateLaserTrace(trace, reduced ? dt * 0.15 : dt);
          if (!trace.done) allDone = false;
        });
        if (allDone) {
          laserPhase = "holding";
          laserPhaseTimer = 0;
        }
      } else if (laserPhase === "holding") {
        laserPhaseTimer += dt;
        if (laserPhaseTimer >= 1.15) {
          laserPhase = "fading";
          laserPhaseTimer = 0;
        }
      } else {
        laserPhaseTimer += dt;
        laserFadeAlpha = Math.max(0, 1 - laserPhaseTimer / 1.8);
        if (laserPhaseTimer >= 1.8) startNewLaserShape();
      }

      laserSparks = laserSparks.filter((spark) => {
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.vx *= 0.96;
        spark.vy = spark.vy * 0.96 + 180 * dt;
        spark.life -= dt;
        return spark.life > 0;
      });
      laserSmoke = laserSmoke.filter((smoke) => {
        smoke.x += smoke.vx * dt;
        smoke.y += smoke.vy * dt;
        smoke.vx *= 0.98;
        smoke.vy *= 0.985;
        smoke.size += smoke.grow * dt;
        smoke.life -= dt;
        return smoke.life > 0;
      });

      ctx.save();
      ctx.globalAlpha = laserFadeAlpha;
      ctx.shadowOffsetX = -2;
      ctx.shadowOffsetY = -2;
      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.drawImage(burnCanvas, 0, 0, width, height);
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = laserFadeAlpha * 0.5;
      ctx.shadowOffsetX = 2.5;
      ctx.shadowOffsetY = 2.5;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(255, 255, 250, 0.45)";
      ctx.drawImage(burnCanvas, 0, 0, width, height);
      ctx.restore();

      laserSmoke.forEach((smoke) => {
        const life = smoke.life / smoke.maxLife;
        const alpha = Math.min(1, (1 - life) * 5) * life * smoke.opacity * laserFadeAlpha;
        if (alpha < 0.002) return;
        const grad = ctx.createRadialGradient(smoke.x, smoke.y, 0, smoke.x, smoke.y, smoke.size);
        grad.addColorStop(0, `rgba(140, 92, 62, ${(alpha * 0.8).toFixed(4)})`);
        grad.addColorStop(1, "rgba(90, 68, 54, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(smoke.x, smoke.y, smoke.size, 0, Math.PI * 2);
        ctx.fill();
      });

      laserTraces.forEach((trace) => {
        drawLaserBeam(trace);
        if (laserPhase === "drawing" && !trace.done) drawLaserTip(trace.tip.x, trace.tip.y);
      });

      laserSparks.forEach((spark) => {
        const life = spark.life / spark.maxLife;
        const alpha = life * laserFadeAlpha;
        const trailLength = Math.hypot(spark.vx, spark.vy) * 0.015;
        if (trailLength > 1) {
          ctx.beginPath();
          ctx.moveTo(spark.x, spark.y);
          ctx.lineTo(spark.x - spark.vx * 0.015, spark.y - spark.vy * 0.015);
          ctx.strokeStyle = spark.bright ? `rgba(255,255,255,${(alpha * 0.6).toFixed(4)})` : `rgba(255,180,60,${(alpha * 0.5).toFixed(4)})`;
          ctx.lineWidth = spark.size;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        ctx.fillStyle = spark.bright ? `rgba(255,255,255,${(alpha * 0.95).toFixed(4)})` : `rgba(255,200,80,${(alpha * 0.9).toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const cx = width * (mobile ? 0.5 : 0.54);
      const cy = height * (mobile ? 0.42 : 0.5);
      const vignette = ctx.createRadialGradient(cx, cy, Math.max(width, height) * 0.15, cx, cy, Math.max(width, height) * 0.72);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.5, "rgba(0,0,0,0.1)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
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
