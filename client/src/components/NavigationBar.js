import React from "react";
import "../styles/NavigationBar.scss";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <div className="container">
        <Link className="title" to="/">
          Apollo
        </Link>
        <Link to="/create">Create Product</Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
