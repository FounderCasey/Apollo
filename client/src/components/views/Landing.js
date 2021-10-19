import React from "react";
import Discover from "./Discover";
import "../../styles/Landing.scss";
import Footer from "../Footer";

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
          <iframe
            src="https://my.spline.design/untitled-f09db2c58d97b34c57db9d68048b18f5/"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </header>
      <Discover />
      <Footer />
    </section>
  );
}

export default Landing;
