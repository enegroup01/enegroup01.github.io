"use client";

import { useEffect, useRef } from "react";

type Variant = "ching" | "mitutoyo" | "siemens";

type Props = {
  variant?: Variant;
  density?: "hero" | "divider" | "quiet";
  className?: string;
};

const variantColors = {
  ching: {
    low: [38, 136, 232],
    high: [73, 58, 194],
    flash: [42, 156, 255]
  },
  mitutoyo: {
    low: [243, 107, 33],
    high: [79, 143, 216],
    flash: [243, 107, 33]
  },
  siemens: {
    low: [0, 143, 126],
    high: [0, 190, 210],
    flash: [0, 220, 190]
  }
} as const;

const kineticDemoParams = {
  impulseRate: 0.7,
  springTension: 1.0,
  impulseForce: 1.0,
  damping: 0.987,
  returnForce: 0.003,
  springBase: 0.12
};

export function RadiantKineticGrid({ variant = "ching", density = "hero", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const colors = variantColors[variant];
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const cols = mobile ? 22 : density === "hero" ? 40 : 40;
    const rows = mobile ? 15 : density === "hero" ? 25 : 25;
    const nodeCount = cols * rows;
    const posX = new Float32Array(nodeCount);
    const posY = new Float32Array(nodeCount);
    const velX = new Float32Array(nodeCount);
    const velY = new Float32Array(nodeCount);
    const restX = new Float32Array(nodeCount);
    const restY = new Float32Array(nodeCount);
    let springs: number[] = [];
    let flashes: Array<{ x: number; y: number; life: number; ring: number }> = [];
    let width = 0;
    let height = 0;
    let spacingX = 0;
    let spacingY = 0;
    let marginX = 0;
    let marginY = 0;
    let frame = 0;
    let lastTime = 0;
    let timeSinceImpulse = 0;
    let screenFlash = 0;
    let pointerDown = false;

    const idx = (col: number, row: number) => row * cols + col;

    const buildGrid = () => {
      marginX = width * 0.06;
      marginY = height * 0.06;
      spacingX = (width - marginX * 2) / (cols - 1);
      spacingY = (height - marginY * 2) / (rows - 1);
      springs = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const i = idx(col, row);
          const x = marginX + col * spacingX;
          const y = marginY + row * spacingY;
          restX[i] = x;
          restY[i] = y;
          posX[i] = x;
          posY[i] = y;
          velX[i] = 0;
          velY[i] = 0;
          if (col < cols - 1) springs.push(i, idx(col + 1, row), spacingX);
          if (row < rows - 1) springs.push(i, idx(col, row + 1), spacingY);
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const injectAt = (x: number, y: number, strength = 18 * kineticDemoParams.impulseForce) => {
      const radius = 4.2 * Math.max(spacingX, spacingY);
      for (let i = 0; i < nodeCount; i += 1) {
        const dx = restX[i] - x;
        const dy = restY[i] - y;
        const dist = Math.hypot(dx, dy);
        if (dist < radius && dist > 0.1) {
          const falloff = Math.pow(1 - dist / radius, 2);
          velX[i] += (dx / dist) * strength * falloff;
          velY[i] += (dy / dist) * strength * falloff;
        }
      }
      flashes.push({ x, y, life: 1, ring: 1 });
      screenFlash = 0.04;
    };

    const injectSingleImpulse = (edge: number, strength: number) => {
      const regionSize = mobile ? 4 + Math.floor(Math.random() * 4) : 4 + Math.floor(Math.random() * 6);
      let startNode = 0;
      let flashX = width * 0.5;
      let flashY = height * 0.5;

      if (edge === 0) {
        startNode = Math.floor(Math.random() * Math.max(1, cols - regionSize));
        flashX = marginX + (startNode + regionSize * 0.5) * spacingX;
        flashY = marginY;
        for (let col = startNode; col < startNode + regionSize && col < cols; col += 1) {
          const i = idx(col, 0);
          const falloff = 1 - Math.abs(col - startNode - regionSize * 0.5) / (regionSize * 0.5);
          velY[i] += strength * falloff * falloff;
        }
      } else if (edge === 1) {
        startNode = Math.floor(Math.random() * Math.max(1, rows - regionSize));
        flashX = marginX + (cols - 1) * spacingX;
        flashY = marginY + (startNode + regionSize * 0.5) * spacingY;
        for (let row = startNode; row < startNode + regionSize && row < rows; row += 1) {
          const i = idx(cols - 1, row);
          const falloff = 1 - Math.abs(row - startNode - regionSize * 0.5) / (regionSize * 0.5);
          velX[i] -= strength * falloff * falloff;
        }
      } else if (edge === 2) {
        startNode = Math.floor(Math.random() * Math.max(1, cols - regionSize));
        flashX = marginX + (startNode + regionSize * 0.5) * spacingX;
        flashY = marginY + (rows - 1) * spacingY;
        for (let col = startNode; col < startNode + regionSize && col < cols; col += 1) {
          const i = idx(col, rows - 1);
          const falloff = 1 - Math.abs(col - startNode - regionSize * 0.5) / (regionSize * 0.5);
          velY[i] -= strength * falloff * falloff;
        }
      } else {
        startNode = Math.floor(Math.random() * Math.max(1, rows - regionSize));
        flashX = marginX;
        flashY = marginY + (startNode + regionSize * 0.5) * spacingY;
        for (let row = startNode; row < startNode + regionSize && row < rows; row += 1) {
          const i = idx(0, row);
          const falloff = 1 - Math.abs(row - startNode - regionSize * 0.5) / (regionSize * 0.5);
          velX[i] += strength * falloff * falloff;
        }
      }

      flashes.push({ x: flashX, y: flashY, life: 1, ring: 1 });
    };

    const injectEdge = () => {
      const edge = Math.floor(Math.random() * 4);
      const baseStrength = (22 + Math.random() * 14) * kineticDemoParams.impulseForce;
      injectSingleImpulse(edge, density === "quiet" ? baseStrength * 0.65 : baseStrength);
      screenFlash = 0.04;
    };

    const simulate = () => {
      const damping = kineticDemoParams.damping;
      const returnForce = kineticDemoParams.returnForce;
      const springK = kineticDemoParams.springBase * kineticDemoParams.springTension;
      for (let s = 0; s < springs.length; s += 3) {
        const a = springs[s];
        const b = springs[s + 1];
        const restLen = springs[s + 2];
        const dx = posX[b] - posX[a];
        const dy = posY[b] - posY[a];
        const dist = Math.hypot(dx, dy);
        if (dist < 0.001) continue;
        const force = (springK * (dist - restLen)) / dist;
        const fx = dx * force;
        const fy = dy * force;
        velX[a] += fx;
        velY[a] += fy;
        velX[b] -= fx;
        velY[b] -= fy;
      }
      for (let i = 0; i < nodeCount; i += 1) {
        velX[i] += (restX[i] - posX[i]) * returnForce;
        velY[i] += (restY[i] - posY[i]) * returnForce;
        velX[i] *= damping;
        velY[i] *= damping;
        posX[i] += velX[i];
        posY[i] += velY[i];
      }
    };

    const lineColor = (tension: number, alpha: number) => {
      const t = Math.max(0, Math.min(1, tension));
      const r = Math.round(colors.low[0] + (colors.high[0] - colors.low[0]) * t);
      const g = Math.round(colors.low[1] + (colors.high[1] - colors.low[1]) * t);
      const b = Math.round(colors.low[2] + (colors.high[2] - colors.low[2]) * t);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const render = (now: number) => {
      const time = now * 0.001;
      const dt = Math.min(0.05, lastTime ? time - lastTime : 0.016);
      lastTime = time;
      timeSinceImpulse += dt;
      const impulseInterval = (density === "quiet" ? 2.6 : 1.8) / kineticDemoParams.impulseRate;
      if (!prefersReduced && timeSinceImpulse >= impulseInterval) {
        injectEdge();
        timeSinceImpulse -= impulseInterval + Math.random() * impulseInterval * 0.3;
      }
      if (!prefersReduced) simulate();

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(246, 252, 251, 0.44)";
      ctx.fillRect(0, 0, width, height);

      if (screenFlash > 0.001) {
        ctx.fillStyle = `rgba(${colors.flash[0]}, ${colors.flash[1]}, ${colors.flash[2]}, ${screenFlash * 2.35})`;
        ctx.fillRect(0, 0, width, height);
        screenFlash *= 0.88;
      }

      const tensionScale = 1 / (((spacingX + spacingY) * 0.5) * 0.35);
      const breathe = 0.85 + 0.15 * Math.sin(time * 0.8);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (let layer = 0; layer < 2; layer += 1) {
        for (let s = 0; s < springs.length; s += 3) {
          const a = springs[s];
          const b = springs[s + 1];
          const restLen = springs[s + 2];
          const dist = Math.hypot(posX[b] - posX[a], posY[b] - posY[a]);
          const tension = Math.abs(dist - restLen) * tensionScale;
          const alphaBoost = density === "divider" ? 1.08 : 1;
          const alpha = (layer === 0 ? 0.06 + tension * 0.2 : 0.16 + tension * 0.68) * breathe * alphaBoost;
          ctx.beginPath();
          ctx.moveTo(posX[a], posY[a]);
          ctx.lineTo(posX[b], posY[b]);
          ctx.strokeStyle = lineColor(tension, Math.min(0.95, alpha));
          ctx.lineWidth = layer === 0 ? 3.5 + tension * 8 : 0.7 + tension * 1.7;
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodeCount; i += 1) {
        const speed = Math.min(1, Math.hypot(velX[i], velY[i]) * 0.2);
        if (speed < 0.02) continue;
        ctx.beginPath();
        ctx.arc(posX[i], posY[i], 0.8 + speed * 2.25, 0, Math.PI * 2);
        ctx.fillStyle = lineColor(speed, Math.min(0.88, 0.14 + speed * 0.76));
        ctx.fill();
      }

      for (let i = flashes.length - 1; i >= 0; i -= 1) {
        const flash = flashes[i];
        flash.life -= dt * 1.8;
        flash.ring -= dt * 1.8;
        if (flash.life <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        const radius = 18 + (1 - flash.life) * 120;
        const grad = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, radius);
        grad.addColorStop(0, `rgba(225, 255, 249, ${0.72 * flash.life})`);
        grad.addColorStop(0.22, `rgba(${colors.flash[0]}, ${colors.flash[1]}, ${colors.flash[2]}, ${0.42 * flash.life})`);
        grad.addColorStop(0.52, `rgba(${colors.high[0]}, ${colors.high[1]}, ${colors.high[2]}, ${0.2 * flash.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, 20 + (1 - flash.ring) * 130, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${colors.flash[0]}, ${colors.flash[1]}, ${colors.flash[2]}, ${0.52 * flash.ring * flash.ring})`;
        ctx.lineWidth = Math.max(0.7, 2 * flash.ring);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      frame = requestAnimationFrame(render);
    };

    const onPointerDown = (event: PointerEvent) => {
      pointerDown = true;
      const rect = canvas.getBoundingClientRect();
      injectAt(event.clientX - rect.left, event.clientY - rect.top, 18);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return;
      const rect = canvas.getBoundingClientRect();
      injectAt(event.clientX - rect.left, event.clientY - rect.top, 10);
    };
    const onPointerUp = () => {
      pointerDown = false;
    };

    resize();
    injectEdge();
    frame = requestAnimationFrame(render);
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
  }, [density, variant]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
