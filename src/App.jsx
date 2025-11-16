import { Route, Routes } from "react-router-dom";

import CategoryShowcaseRow from "./components/CategoryShowcaseRow";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import Navbar from "./components/Navbar";
import ScrollTransition from "./components/ScrollTransition";
import TrendingSection from "./components/TrendingSection";

import BrowseSection from "./components/BrowseSection";
import Cart from "./components/Cart";
import ComicDetail from "./components/ComicDetail";

import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="main-content">
        <Routes>

          {/* ⭐ HOME ROUTE */}
          <Route
            path="/"
            element={
              <>
                {/* Welcome */}
                <h1 className="welcome-hero-title">
                  WELCOME, TRUE BELIEVERS! 💥
                </h1>

                <p className="welcome-hero-tagline">
                  Dive into a universe of heroes, villains, legends — and YOU at the center of it all.
                </p>

                {/* Hero */}
                <div style={{ position: "relative" }}>
  <div className="glow-orange" style={{ top: "-150px", left: "20%" }}></div>
  <HeroCarousel />
</div>

<div style={{ position: "relative" }}>
  <div className="glow-orange" style={{ top: "-50px", left: "60%" }}></div>
  <h2 className="collection-heading">📚 Browse Our Collection</h2>
</div>

                <div style={{ position: "relative" }}>
  <div className="glow-orange" style={{ top: "120px", left: "10%" }}></div>
                {/* ===================== DC ===================== */}
                <CategoryShowcaseRow
                  title="DC"
                  logo="/images/categories/dc-logo.png"
                  cover="/images/DC/dc-hero.jpg"
                  effect="dc"
                  cards={[
                    {
                      cover: "/images/DC/dc-1.jpg",
                      title: "The Underworld Rises",
                      subtitle: "Explore the Universe",
                      pages: [
                        "/images/DC/supe-1.jpeg",
                        "/images/DC/supe-2.jpeg",
                        "/images/DC/supe-3.jpeg",
                      ],
                    },
                    {
                      cover: "/images/DC/dc-2.jpg",
                      title: "Legends",
                      subtitle: "Read more",
                      pages: [
                        "/images/DC/wonder-w-1.jpeg",
                        "/images/DC/wonder-w-2.jpeg",
                        "/images/DC/wonder-w-3.jpeg",
                      ],
                    },
                    {
                      cover: "/images/DC/dc-3.jpg",
                      title: "Classic",
                      subtitle: "View details",
                      pages: [
                        "/images/DC/Boys-1.jpeg",
                        "/images/DC/Boys-2.jpeg",
                        "/images/DC/Boys-3.jpeg",
                      ],
                    },
                  ]}
                />

                {/* ===================== MARVEL ===================== */}
                <CategoryShowcaseRow
                  title="Marvel"
                  logo="/images/categories/marvel-logo.png"
                  cover="/images/marvel/marvel-hero.jpg"
                  effect="marvel"
                  cards={[
                    {
                      cover: "/images/marvel/marvel-1.jpg",
                      title: "Marvel Comic 1",
                      subtitle: "Explore the Universe",
                    },
                    {
                      cover: "/images/marvel/marvel-2.jpg",
                      title: "Marvel Comic 2",
                      subtitle: "Read more",
                    },
                    {
                      cover: "/images/marvel/marvel-3.jpg",
                      title: "Marvel Comic 3",
                      subtitle: "View details",
                    },
                  ]}
                />

                {/* ===================== ANIME ===================== */}
                {/* ===================== ANIME ===================== */}
<CategoryShowcaseRow
  title="Anime"
  logo="/images/categories/anime-logo.jpeg"
  cover="https://m.media-amazon.com/images/I/518KKkmd1fL._SY445_SX342_FMwebp_.jpg"
  effect="anime"
  cards={[
    {
      cover: "https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/en/comics/2022/09/29/RqRC69jCy2qPhxeH/cover.jpg",
      title: "Naruto Vol. 1",
      subtitle: "Explore",
    },
    {
      cover: "https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg",
      title: "Demon Slayer Vol. 1",
      subtitle: "Read more",
    },
    {
      cover: "https://m.media-amazon.com/images/I/518KKkmd1fL._SY445_SX342_FMwebp_.jpg",
      title: "One Piece Vol. 1",
      subtitle: "View details",
    },
  ]}
/>
</div>

                {/* CITY ANIMATION */}
                <ScrollTransition
                  heroImage="/images/DC/supe-fly.png"
                  cityImage="/images/categories/buildings-6.avif"
                />
<div style={{ position: "relative" }}>
  <div className="glow-orange" style={{ top: "50px", left: "70%" }}></div>
  <TrendingSection />
</div>

                <div style={{ position: "relative" }}>
  <div className="glow-orange" style={{ bottom: "-150px", left: "40%" }}></div>
  <Footer />
</div>

              </>
            }
          />

          {/* BROWSE */}
          <Route path="/browse" element={<BrowseSection />} />

          {/* DETAIL */}
          <Route path="/comic/:id" element={<ComicDetail />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </main>
    </div>
  );
}
