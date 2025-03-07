import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-container">
      
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
        
         
        </ul>
        <button className="add-recipe-btn" onClick={() => navigate("/add-recipe")}>
          + Add Recipe
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
