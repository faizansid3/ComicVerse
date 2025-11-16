import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ComicDetail.css";

export default function ComicDetail() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [flash, setFlash] = useState(false);

  const BASE = import.meta.env.BASE_URL || "/";

  useEffect(() => {
    fetch(`${BASE}constant/data.json`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => Number(c.id) === Number(id));
        setComic(found);
      })
      .catch((err) => console.error("JSON load error:", err));
  }, [id, BASE]);

  const showFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === comic.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...comic, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showFlash();
  };

  if (!comic)
    return <h1 style={{ color: "white", padding: 40 }}>Loading...</h1>;

  return (
    <div className="detail-main-bg">

      {flash && <div className="flash-success">Added to cart ✔</div>}

      <div className="detail-container">

        <div className="detail-left">
          <h1 className="detail-title">{comic.title}</h1>

          <div className="detail-meta">
            <p><strong>Publisher:</strong> {comic.publisher}</p>
            <p><strong>Genre:</strong> {comic.genre}</p>
            <p><strong>Characters:</strong> {comic.characters.join(", ")}</p>
            <p><strong>Release Date:</strong> {comic.release_date}</p>
          </div>

          <h2 className="detail-price">₹ {comic.price}</h2>

          <p className="detail-desc">{comic.description}</p>

          <button className="add-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>

        <div className="detail-right">
          <img
            src={
              comic.poster_url
                ? comic.poster_url
                : `${BASE}images/default-placeholder.jpg`
            }
            alt={comic.title}
            className="detail-img"
          />
        </div>
      </div>
    </div>
  );
}
