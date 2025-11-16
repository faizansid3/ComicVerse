import { useEffect, useRef } from "react";
import "./ScrollTransition.css";

export default function ScrollTransition({
  heroImage = "/images/DC/supe-fly.png",
  cityImage = "/images/categories/buildings-6.avif",
  stripHeight = 180,
}) {
  const wrapRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const hero = heroRef.current;
    if (!wrap || !hero) return;

    let raf = null;

    const loop = () => {
      const rect = wrap.getBoundingClientRect();

      // 0 → 1 progress
      let progress = 1 - rect.top / window.innerHeight;
      progress = Math.max(0, Math.min(1, progress));

      const screen = window.innerWidth;
      const heroW = hero.getBoundingClientRect().width;

      // Superman moves OFF-SCREEN RIGHT → THROUGH CENTER → OFF-SCREEN LEFT
      const totalTravel = screen + heroW * 2;

      const offset =
        (screen / 2 + heroW) - progress * totalTravel;

      hero.style.setProperty("--hero-offset", `${offset}px`);





      // speed detection for blur ripple
const speed = Math.abs(offset - (hero.prevOffset || offset));
hero.prevOffset = offset;

// blur only when moving fast
if (speed > 20) {
  hero.classList.add("cape-flicker");
} else {
  hero.classList.remove("cape-flicker");
}



      // enable whoosh when moving
      if (progress > 0.05 && progress < 0.95) {
        hero.classList.add("whoosh");
      } else {
        hero.classList.remove("whoosh");
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="st-strip"
      ref={wrapRef}
      style={{
        "--strip-height": `${stripHeight}px`,
        "--city-url": `url(${cityImage})`,
      }}
    >
      <div className="st-bg" />
      
      <div className="st-speed-lines"></div>
  <div className="st-wind"></div>

      

      <div className="st-inner">
        <div className="st-stage">
          <img
            src={heroImage}
            className="st-hero"
            ref={heroRef}
            alt="Superman"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
