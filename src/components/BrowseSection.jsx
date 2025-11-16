import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BrowseSection.css";

export default function BrowseSection() {
  const navigate = useNavigate();

  const [allComics, setAllComics] = useState([]);
  const [comics, setComics] = useState([]);

  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("ALL");
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState("ALL");
  const [character, setCharacter] = useState("ALL");

  const BASE = import.meta.env.BASE_URL || "/";

  const CHARACTER_LIST = [
    "All Might","Anya Forger","Aquaman","Armin","Asta","Bakugo","Batman",
    "Beast Boy","Black Panther","Boruto","Bucky Barnes","Captain America","Catwoman",
    "Daredevil","Deadpool","Deku","Denji","Eren","Flash","Gamora","Gojo","Goku",
    "Hal Jordan","Harley Quinn","Hawkeye","Hinata Shoyo","Hulk","Ichigo","Ichigo Kurosaki",
    "Iron Man","Isagi Yoichi","Joker","Kageyama","Kamala Khan","Kaneki Ken","Kate Bishop",
    "L","Light Yagami","Loid Forger","Luffy","Makima","Mikasa","Miles Morales","Mitsuki",
    "Moon Knight","Nami","Naruto","Nezuko","Nightwing","Nobara","Power","Raven","Reze","Robin",
    "Rocket","Rukia","Sakura","Sarada","Sasuke","Shazam","Spider-Man","Star-Lord","Starfire",
    "Supergirl","Superman","Tanjiro","Terry McGinnis","The Flash","Thor","Touka Kirishima",
    "Vegeta","Venom","Wolverine","Wonder Woman","Yuji","Yuji Itadori","Yuno","Zoro"
  ];

  const GENRE_LIST = [
    "Action","Adventure","Alternate Universe","Comedy","Crime","Dark Fantasy","Fantasy",
    "Horror","Mythology","Sci-Fi","Sports","Superhero","Supernatural","Thriller"
  ];

  // Load comics JSON correctly for GitHub Pages
  useEffect(() => {
    fetch(`${BASE}constant/data.json`)
      .then((res) => res.json())
      .then((data) => {
        setAllComics(data);
        setComics(data);
      })
      .catch((err) => console.error("BrowseSection JSON Load Error:", err));
  }, [BASE]);

  // Apply filters dynamically
  useEffect(() => {
    let filtered = [...allComics];

    if (search.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (publisher !== "ALL") {
      filtered = filtered.filter((c) => c.publisher === publisher);
    }

    if (genre !== "ALL") {
      filtered = filtered.filter((c) => c.genre === genre);
    }

    if (character !== "ALL") {
      filtered = filtered.filter((c) => c.characters.includes(character));
    }

    if (sort === "PRICE_LOW_HIGH") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "PRICE_HIGH_LOW") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "TITLE_AZ") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "DATE_NEW") {
      filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sort === "DATE_OLD") {
      filtered.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    setComics(filtered);
  }, [search, publisher, genre, character, sort, allComics]);

  return (
    <div className="browse-container">

      <h1 className="browse-title">Browse Comics</h1>

      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search comics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={publisher} onChange={(e) => setPublisher(e.target.value)}>
          <option value="ALL">All Publishers</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Shueisha">Shueisha</option>
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="ALL">All Genres</option>
          {GENRE_LIST.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={character} onChange={(e) => setCharacter(e.target.value)}>
          <option value="ALL">All Characters</option>
          {CHARACTER_LIST.map((ch) => (
            <option key={ch} value={ch}>{ch}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="PRICE_LOW_HIGH">Price: Low → High</option>
          <option value="PRICE_HIGH_LOW">Price: High → Low</option>
          <option value="TITLE_AZ">Title: A → Z</option>
          <option value="DATE_NEW">Newest First</option>
          <option value="DATE_OLD">Oldest First</option>
        </select>

      </div>

      <div className="product-grid">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="product-card"
            onClick={() => navigate(`/comic/${comic.id}`)}
          >
            <div className="product-img-box">
              <img src={comic.poster_url} alt={comic.title} />
            </div>

            <div className="product-info">
              <h3 className="product-title">{comic.title}</h3>
              <p className="product-publisher">{comic.publisher}</p>
              <p className="product-price">₹ {comic.price}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
