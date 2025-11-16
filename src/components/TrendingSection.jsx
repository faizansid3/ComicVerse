import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TrendingSection.css";

export default function TrendingSection() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE = import.meta.env.BASE_URL || "/";

  const trendingIds = [1, 12, 13, 7]; // Batman, Naruto, Demon Slayer, Iron Man

  useEffect(() => {
    let mounted = true;

    // ✅ Correct JSON path for GitHub Pages + Local Dev
    fetch(`${BASE}constant/data.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;

        const picks = trendingIds
          .map((id) => data.find((c) => Number(c.id) === Number(id)))
          .filter(Boolean);

        setComics(picks);
      })
      .catch((err) => {
        console.error("Failed to load comics:", err);
        setComics([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [BASE]);

  if (loading) return <section className="trending-section">Loading trending...</section>;
  if (!comics.length) return <section className="trending-section">No trending comics found.</section>;

  return (
    <section className="trending-section">
      <h2 className="trending-title">🔥 TRENDING COMICS 🔥</h2>

      <div className="trending-grid">
        {comics.map((c) => (
          <div key={c.id} className="trending-card">
            <Link to={`/comic/${c.id}`} aria-label={`Open ${c.title}`}>
              <img
                src={
                  c.poster_url ||
                  c.cover ||
                  `${BASE}images/DC/dc-1.jpg` // fallback image (FIXED)
                }
                alt={c.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
