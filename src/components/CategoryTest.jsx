// src/components/CategoryTestC.jsx
import "./CategoryTest.css";

export default function CategoryTestC() {
  return (
    <section className="cat-c-block">
      <div className="cat-c-inner">

        {/* Logo */}
        <div className="cat-c-logo">
          <img src="/images/categories/dc-logo.png" alt="DC Logo" />
        </div>

        {/* Floating Parallax Cards */}
        <div className="cat-c-floating-cards">
          <div className="float-card"></div>
          <div className="float-card"></div>
          <div className="float-card"></div>
        </div>

        {/* Text + CTA */}
        <div className="cat-c-cta">
          <h2>DC Comics</h2>
          <p>Curated picks from the DC Universe</p>
          <a href="/browse?publisher=DC" className="btn-c">Browse DC</a>
        </div>

      </div>
    </section>
  );
}
