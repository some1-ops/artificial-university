"use client";

import { useEffect, useRef } from "react";

export default function FluidGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, vx: 0, vy: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid points: 3D coordinates (x, y, z)
    const columns = 28;
    const rows = 20;
    const spacingX = width / (columns - 1);
    const spacingY = height / (rows - 1);

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      
      mouse.vx = dx * 0.1;
      mouse.vy = dy * 0.1;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    // Projection constants
    const fov = 350;
    const centerY = height * 0.5;
    const centerX = width * 0.5;

    // Animation Loop
    const draw = () => {
      time += 0.015;
      ctx.fillStyle = "rgba(5, 5, 5, 0.45)"; // Rich backdrop black fade
      ctx.fillRect(0, 0, width, height);

      // Dampen mouse velocity
      const mouse = mouseRef.current;
      mouse.vx *= 0.95;
      mouse.vy *= 0.95;
      
      // Interpolate smooth target coordinates
      mouse.rx += (mouse.x - mouse.rx) * 0.1;
      mouse.ry += (mouse.y - mouse.ry) * 0.1;

      // Draw grid paths
      ctx.strokeStyle = "rgba(0, 229, 255, 0.05)"; // Base cyber blue
      ctx.lineWidth = 1.0;

      // Projected points matrix
      const projected: { x: number; y: number; factor: number; intensity: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        projected[r] = [];
        for (let c = 0; c < columns; c++) {
          // World coordinates
          const wx = c * spacingX - centerX;
          const wy = r * spacingY - centerY;

          // Compute ripple distance to cursor
          const mx = wx + centerX;
          const my = wy + centerY;
          const dx = mx - mouse.rx;
          const dy = my - mouse.ry;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ripple calculations
          const ripple = Math.sin(time * 3 - dist * 0.007) * 22;
          const cursorFactor = mouse.active ? Math.max(0, 1 - dist / 350) : 0;
          const cursorImpact = cursorFactor * Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) * 20;

          // Height z offset (combining waves and mouse dynamics)
          const z = ripple + cursorImpact + (Math.sin(time + c * 0.2) * Math.cos(time + r * 0.2) * 10);

          // Simple 3D projection
          const depth = 350 + z;
          const px = (wx * fov) / depth + centerX;
          const py = (wy * fov) / depth + centerY;

          projected[r][c] = {
            x: px,
            y: py,
            factor: cursorFactor,
            intensity: Math.max(0, 1 - dist / 500)
          };
        }
      }

      // Draw horizontal lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
          const ptA = projected[r][c];
          const ptB = projected[r][c + 1];

          // Dynamic colors blending Toxic Green and Cyber Blue based on cursor proximity
          const mix = ptA.factor * 0.8;
          ctx.strokeStyle = `rgba(${Math.floor(mix * 0)}, ${Math.floor(mix * 255 + (1 - mix) * 0)}, ${Math.floor(mix * 102 + (1 - mix) * 255)}, ${0.035 + ptA.intensity * 0.12})`;
          
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.stroke();
        }
      }

      // Draw vertical lines
      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const ptA = projected[r][c];
          const ptB = projected[r + 1][c];

          const mix = ptA.factor * 0.8;
          ctx.strokeStyle = `rgba(${Math.floor(mix * 0)}, ${Math.floor(mix * 255 + (1 - mix) * 0)}, ${Math.floor(mix * 102 + (1 - mix) * 255)}, ${0.035 + ptA.intensity * 0.12})`;
          
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.stroke();
        }
      }

      // Drawing glowing grid junctions (points)
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < columns; c += 2) {
          const pt = projected[r][c];
          if (pt.factor > 0.4) {
            ctx.fillStyle = `rgba(0, 255, 102, ${pt.factor * 0.25})`; // Glow points (Toxic Green)
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
