import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import marketplace from "../../utils/Marketplace.json";
import bg from "../../assets/cardbg.png";
import "../../styles/Discover.scss";

function Discover() {
  const [products, setProducts] = useState([]);

  const marketplaceAddress = "0x6Df17907b1Fc60300FCFE8e7Ca4d27C47be6a4eB";
  const marketplaceABI = marketplace.abi;

  const fetchProducts = async () => {
    try {
      const provider = new ethers.providers.getDefaultProvider("rinkeby");
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        provider
      );

      let _products = [];
      let productCount = await marketplaceContract.productCount();

      for (let i = 0; i < productCount; i++) {
        let product = await marketplaceContract.products(i);
        _products.push(product);
      }

      setProducts(_products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id="discover" className="container">
      <h2>Discover</h2>
      <p>Find what other creators have crafted</p>
      <div className="cardContainer">
        {products.map((product, index) => {
          return (
            <Link to={`/p/${index}`} key={index}>
              <div className="card">
                <div className="cardImage">
                  <img src={bg} alt="card background" />
                  <p>
                    {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
                  </p>
                </div>
                <div className="cardRow">
                  <button className="card-button">View</button>
                  <div className="cardInfo">
                    <h3>{product.name}</h3>
                    <p>{ethers.utils.formatEther(product.price)} ETH</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Discover;
