import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="comic-footer">

      {/* Top decorative line */}
      <div className="footer-top-line"></div>

      <div className="footer-content">

        {/* Column 1: Brand */}
        <div className="footer-col">
          <h3 className="footer-logo">COMICVERSE</h3>
          <p>Your multiverse of comics. Explore. Collect. Experience.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/browse">Publishers</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-col">
          <h4>Categories</h4>
          <Link to="/browse?publisher=DC">DC Comics</Link>
          <Link to="/browse?publisher=Marvel">Marvel</Link>
          <Link to="/browse?publisher=Shueisha">Anime</Link>
          <Link to="/browse?publisher=Indie">Indie</Link>
        </div>

        {/* Column 4: Social */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Twitter</a>
        </div>
      </div>

      {/* bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ComicVerse. All rights reserved.
      </div>

    </footer>
  );
}
