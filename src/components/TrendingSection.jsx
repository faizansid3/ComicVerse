// src/components/TrendingSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TrendingSection.css";

export default function TrendingSection() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fixed 4 IDs for Option 1 (Batman, Naruto, Demon Slayer, Iron Man)
  const trendingIds = [1, 12, 13, 7];

  useEffect(() => {
    let mounted = true;
    fetch("/constant/data.json")
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
  }, []);

  if (loading) return <section className="trending-section">Loading trending...</section>;
  if (!comics.length) return <section className="trending-section">No trending comics found.</section>;

  return (
    <section className="trending-section">
      <h2 className="trending-title">🔥 TRENDING COMICS 🔥</h2>

      <div className="trending-grid">
        {comics.map((c) => (
          <div key={c.id} className="trending-card">
            {/* clicking image takes user to /comic/:id */}
            <Link to={`/comic/${c.id}`} aria-label={`Open ${c.title}`}>
              <img src={c.poster_url || c.cover || "/images/DC/dc-1.jpg"} alt={c.title} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
