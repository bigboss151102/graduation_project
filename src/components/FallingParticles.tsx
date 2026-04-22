'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'rect' | 'diamond' | 'star';
  color: string;
  swayAmp: number;
  swaySpeed: number;
  swayOffset: number;
}

const COLORS = [
  '#4A80F0',   // main blue
  '#2E5FD8',   // dark blue
  '#7aaaf5',   // light blue
  '#a8c4ff',   // pale blue
  '#3B6FE0',   // medium blue
  '#93b8ff',   // soft blue
  '#c8d9ff',   // very light blue
  '#ffffff',   // white
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(canvasWidth: number, startFromTop = true): Particle {
  const shapes: Particle['shape'][] = ['circle', 'rect', 'diamond', 'star'];
  return {
    x: rand(0, canvasWidth),
    y: startFromTop ? rand(-300, -10) : rand(-10, 800),
    size: rand(5, 12),
    speedY: rand(0.8, 1.6),
    speedX: rand(-0.15, 0.15),
    opacity: rand(0.55, 1.0),
    rotation: rand(0, 360),
    rotationSpeed: rand(-2, 2),
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    swayAmp: rand(20, 70),
    swaySpeed: rand(0.006, 0.016),
    swayOffset: rand(0, Math.PI * 2),
  };
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const spikes = 5;
  const outer = size / 2;
  const inner = size / 4.5;
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(0, -outer);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
    rot += step;
    ctx.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
    rot += step;
  }
  ctx.closePath();
}

export default function FallingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 80 particles, half pre-spread across screen height
    const COUNT = 80;
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) =>
      createParticle(canvas.width, i > COUNT * 0.5)
    );

    const animate = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Sway
        p.x += Math.sin(ts * p.swaySpeed + p.swayOffset) * 0.5 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 30) {
          Object.assign(p, createParticle(canvas.width, true));
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        switch (p.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'rect':
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            break;

          case 'diamond':
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2.5, 0);
            ctx.lineTo(0, p.size / 2);
            ctx.lineTo(-p.size / 2.5, 0);
            ctx.closePath();
            ctx.fill();
            break;

          case 'star':
            drawStar(ctx, p.size);
            ctx.fill();
            break;
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
