import React from "react";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          Built by{" "}
          <a href="https://imcasey.com" target="_blank">
            0xCasey
          </a>
        </p>
        <p>
          Please use the <span>Rinkeby</span> testnet.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
