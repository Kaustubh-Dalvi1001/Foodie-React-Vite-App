import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="headerDiv">
      <div id="logoDiv">
        <Link to="/">
          <img src="/images/foodie_logo.png" alt="Foodie Logo" id="logoImg" />
        </Link>
      </div>
      <div id="navDiv">
        <ul>
          <li>
            <Link to="/" className="Link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="Link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="Link">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" className="Link">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
