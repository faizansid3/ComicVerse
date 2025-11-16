// src/components/CategoryShowcaseRow.jsx
import "./CategoryShowcaseRow.css";
export default function CategoryShowcaseRow({ title, cover, cards, effect,logo }) {
  return (
    <section className="csr-row">

      {/* LEFT CATEGORY BOX */}
      <div className={`csr-left csr-left-${effect}`}>
        <img src={logo} className="csr-logo" />
        <div className="csr-desc">Explore the best of {title}</div>
        <a href={`/browse?publisher=${title}`} className="csr-left-browse">
          Browse {title}
        </a>
      </div>


      {/* CARDS */}
      <div className="csr-card-area">
        {cards.slice(0, 3).map((card, i) => (
          <div
            key={i}
            className={`csr-card csr-${effect}`}
            style={{ ["--csr-card-img"]: `url(${card.cover})` }}
          >
            <div className="csr-card-cover"></div>

            <div className="csr-card-info">
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
            </div>

            <div className="csr-mini-pages">
              {(card.pages || []).map((p, idx) => (
                <span
                  className="csr-mini-page"
                  key={idx}
                  style={{ backgroundImage: `url(${p})` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
