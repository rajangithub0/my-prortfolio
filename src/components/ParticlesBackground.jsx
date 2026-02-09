import { useEffect, useRef } from "react";

class Particle {
  constructor(canves) {
    this.x = Math.random() * canves.width;
    this.y = Math.random() * canves.height;
    this.radius = Math.random() * 2 + 1;
    this.colors = "rgba(255,255,255, 0.7)";
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.canves = canves;
    this.ctx = canves.getContext("2d");
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.colors;
    this.ctx.fillStyle = this.colors;
    this.ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = this.canves.width;
    if (this.x > this.canves.width) this.x = 0;
    if (this.y < 0) this.y = this.canves.height;
    if (this.y > this.canves.height) this.y = 0;
    this.draw();
  }
}

export default function ParticlesBackground() {
  const canvesRef = useRef(null);

  useEffect(() => {
    const canves = canvesRef.current;
    const ctx = canves.getContext("2d");

    let particals = [];
    const particalsCount = 100;

    function createParticles() {
      particals = [];
      for (let i = 0; i < particalsCount; i++) {
        particals.push(new Particle(canves));
      }
    }

    function handelResize() {
      canves.width = window.innerWidth;
      canves.height = window.innerHeight;
      createParticles();
    }
    handelResize();
    window.addEventListener("resize", handelResize);
    let animationID;
    function animate() {
      ctx.clearRect(0, 0, canves.width, canves.height);
      particals.forEach((p) => p.update());
      animationID = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(animationID);
      window.removeEventListener("resize", handelResize);
    };
  }, []);
  return (
    <canvas
      ref={canvesRef}
      className="absolute  w-full h-full pointer-events-none z-0"
    ></canvas>
  );
}
