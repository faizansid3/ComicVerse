import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  const sliderRef = useRef(null);
  const [slides, setSlides] = useState([]);

  // Replace with your local images in public/images/
  useEffect(() => {
    const comics = [
      { id: 1, image: "/images/marvel/marvel-1.jpg", title: "Marvel Comic 1", subtitle: "Explore the Universe" },
      { id: 2, image: "/images/marvel/marvel-2.jpg", title: "Marvel Comic 2", subtitle: "New Adventures Await" },
      { id: 3, image: "/images/marvel/marvel-3.jpg", title: "Marvel Comic 3", subtitle: "Heroes Assemble" },
      { id: 4, image: "/images/DC/dc-1.jpg", title: "DC Comic 1", subtitle: "The Dark Knight Returns" },
      { id: 5, image: "/images/DC/dc-2.jpg", title: "DC Comic 2", subtitle: "Legends of the Multiverse" },
    ];
    // simple preload
    const loaded = [];
    let count = 0;
    comics.forEach(c => {
      const img = new Image();
      img.src = c.image;
      img.onload = () => {
        loaded.push(c);
        count++;
        if (count === comics.length) setSlides(loaded);
      };
      img.onerror = () => {
        // still push to avoid lock
        loaded.push(c);
        count++;
        if (count === comics.length) setSlides(loaded);
      };
    });
  }, []);

  const CARD_W = 300;       // px - width for each card (tweak here if desired)
  const GAP = 16;           // px - gap between cards
  // Slider settings ensure 3 slides visible on desktop
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2800,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, centerMode: true } },
      { breakpoint: 900, settings: { slidesToShow: 1, centerMode: true } }
    ],
    accessibility: false

  };

  if (!slides.length) return <div style={{ height: "520px" }} />;

  return (
    <div className="hero-area">
      <div className="carousel-wrapper" >
        <button className="nav-arrow left" onClick={() => sliderRef.current.slickPrev()} aria-label="Previous">‹</button>

        <Slider ref={sliderRef} {...settings}>
          {slides.map(s => (
            <div key={s.id} className="slick-slide-wrap">
              <div className="card">
                <img src={s.image} alt={s.title} />
                <div className="card-info">
                  <h3>{s.title}</h3>
                  <p>{s.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button className="nav-arrow right" onClick={() => sliderRef.current.slickNext()} aria-label="Next">›</button>
      </div>
    </div>
  );
}
