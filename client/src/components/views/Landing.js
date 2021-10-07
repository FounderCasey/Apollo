import React from "react";
import Discover from "./Discover";
import "../../styles/Landing.scss";
import Card from "../../assets/card.png";

function Landing() {
  return (
    <section>
      <header>
        <div className="container">
          <div className="header-info">
            <h1>Craft and Sell your digital products on chain.</h1>
            <p>
              Apollo is built with creators in mind - we want to boost your
              success
            </p>
            <button>Get Started</button>
          </div>
          <img src={Card} alt="card"></img>
        </div>
      </header>
      <Discover />
    </section>
  );
}

export default Landing;
