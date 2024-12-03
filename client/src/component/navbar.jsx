import { Link } from "react-router-dom";
import './navbar.css'; // Import the CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/register">Register</Link>
      <Link className="nav-link" to="/login">Login</Link>
    </nav>
  );
}
