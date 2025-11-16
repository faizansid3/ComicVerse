import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="comic-navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          COMIC<span>VERSE</span>
        </div>
      </div>

      <div className="navbar-links">

        <Link to="/">HOME</Link>
        <div className="nav-divider"></div>

        <Link to="/browse">BROWSE</Link>
        <div className="nav-divider"></div>

        <Link to="/cart">CART</Link>

      </div>

      <div style={{ width: 120 }}></div>
    </header>
  );
}
