"use client";

import { useEffect, useRef } from "react";

type Tone = "ching" | "mitutoyo" | "siemens";

type Props = {
  tone?: Tone;
  className?: string;
};

const palettes = {
  ching: [
    [79, 143, 216],
    [75, 72, 165],
    [45, 127, 209],
    [118, 91, 210]
  ],
  mitutoyo: [
    [243, 107, 33],
    [79, 143, 216],
    [255, 145, 76],
    [75, 72, 165]
  ],
  siemens: [
    [0, 143, 126],
    [79, 143, 216],
    [0, 178, 160],
    [75, 72, 165]
  ]
} as const;

type Projected = {
  x: number;
  y: number;
  depth: number;
};

const rgba = (rgb: readonly number[], alpha: number) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

export function RadiantTesseractShadow({ tone = "ching", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const colors = palettes[tone];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const vertices = Array.from({ length: 16 }, (_, i) => [
      i & 1 ? 1 : -1,
      i & 2 ? 1 : -1,
      i & 4 ? 1 : -1,
      i & 8 ? 1 : -1
    ]);
    const edges: Array<[number, number, number]> = [];

    for (let i = 0; i < 16; i += 1) {
      for (let j = i + 1; j < 16; j += 1) {
        let diff = 0;
        let axis = 0;
        for (let k = 0; k < 4; k += 1) {
          if (vertices[i][k] !== vertices[j][k]) {
            diff += 1;
            axis = k;
          }
        }
        if (diff === 1) edges.push([i, j, axis]);
      }
    }

    let width = 1;
    let height = 1;
    let frame = 0;
    let start = performance.now();
    let mouseDown = false;
    let lastX = 0;
    let lastY = 0;
    let dragX = 0;
    let dragY = 0;
    const trails: Projected[][] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotate = (v: number[], a: number, b: number, angle: number) => {
      const out = [...v];
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      out[a] = v[a] * c - v[b] * s;
      out[b] = v[a] * s + v[b] * c;
      return out;
    };

    const project = (v4: number[]): Projected => {
      const view4 = 4.2;
      const scale4 = view4 / (view4 - v4[3]);
      const x3 = v4[0] * scale4;
      const y3 = v4[1] * scale4;
      const z3 = v4[2] * scale4;
      const view3 = 5.4;
      const scale3 = view3 / (view3 - z3);
      return {
        x: x3 * scale3,
        y: y3 * scale3,
        depth: Math.max(0, Math.min(1, ((v4[3] + 1) / 2) * 0.55 + ((z3 + 1.6) / 3.2) * 0.45))
      };
    };

    const computeFrame = (time: number) => {
      const speed = 0.42;
      return vertices.map((vertex) => {
        let v = [...vertex];
        v = rotate(v, 0, 3, time * speed * 0.72 + dragX);
        v = rotate(v, 1, 2, time * speed * 0.55 + dragY);
        v = rotate(v, 0, 1, time * speed * 0.22);
        v = rotate(v, 2, 3, time * speed * 0.18);
        return project(v);
      });
    };

    const draw = (now: number) => {
      const time = reduced ? 0 : (now - start) / 1000;
      const cx = width * 0.62;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.27;
      const current = computeFrame(time);

      if (!reduced && Math.floor(time * 12) % 3 === 0) {
        trails.push(current.map((p) => ({ ...p })));
        if (trails.length > 5) trails.shift();
      }

      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.62);
      bg.addColorStop(0, "rgba(255,255,255,0.16)");
      bg.addColorStop(0.48, "rgba(247,249,252,0.08)");
      bg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const drawEdge = (points: Projected[], edge: [number, number, number], alphaScale: number, lineScale: number) => {
        const a = points[edge[0]];
        const b = points[edge[1]];
        const depth = (a.depth + b.depth) * 0.5;
        const c = colors[edge[2]];
        const ax = cx + a.x * scale;
        const ay = cy + a.y * scale;
        const bx = cx + b.x * scale;
        const by = cy + b.y * scale;
        const alpha = (0.32 + depth * 0.68) * alphaScale;
        const line = (1.1 + depth * 2.6) * lineScale;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = rgba(c, alpha * 0.2);
        ctx.lineWidth = line + 10;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = rgba(c, alpha);
        ctx.lineWidth = line;
        ctx.stroke();
      };

      trails.forEach((trail, index) => {
        const alpha = ((index + 1) / (trails.length + 1)) * 0.22;
        edges.forEach((edge) => drawEdge(trail, edge, alpha, 0.55));
      });

      const sortedEdges = [...edges].sort((left, right) => {
        const l = (current[left[0]].depth + current[left[1]].depth) * 0.5;
        const r = (current[right[0]].depth + current[right[1]].depth) * 0.5;
        return l - r;
      });
      sortedEdges.forEach((edge) => drawEdge(current, edge, 1, 1));

      current.forEach((point, index) => {
        const x = cx + point.x * scale;
        const y = cy + point.y * scale;
        const c = colors[index % colors.length];
        const radius = 7 + point.depth * 17;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glow.addColorStop(0, rgba(c, 0.48 + point.depth * 0.3));
        glow.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(c, 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 2.2 + point.depth * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const onPointerDown = (event: PointerEvent) => {
      mouseDown = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!mouseDown) return;
      dragX += (event.clientX - lastX) * 0.01;
      dragY += (event.clientY - lastY) * 0.01;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = () => {
      mouseDown = false;
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [tone]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
