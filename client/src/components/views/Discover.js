import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import marketplace from "../../utils/Marketplace.json";
import bg from "../../assets/cardbg.png";
import "../../styles/Discover.scss";

function Discover() {
  const [products, setProducts] = useState([]);

  const marketplaceAddress = "0xE9C8549868d0510753f4020729e21c0bfd0C5b22";
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

      for (let i = 0; i <= productCount; i++) {
        let product = await marketplaceContract.products(i);
        _products.push(product);
      }

      setProducts(_products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const purchaseProduct = async (id, price) => {
    try {
      if (window.ethereum) {
        console.log("Transaction started");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );

        console.log(price);
        console.log(ethers.utils.formatEther(price));

        const createTx = await marketplaceContract.purchaseProduct(id, {
          gasLimit: 300000,
          value: ethers.utils.parseUnits(
            ethers.utils.formatEther(price),
            "ether"
          ),
        });

        await createTx.wait();

        console.log(
          "Transaction completed for: " +
            ethers.utils.formatEther(
              ethers.utils.parseUnits(price.toString(), "ether")
            ) +
            " ETH"
        );

        fetchProducts();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
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
            <div className="card" key={index}>
              <div className="cardImage">
                <Link to={`/p/${index}`}>
                  <img src={bg} alt="card background" />
                  <p>
                    {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
                  </p>
                </Link>
              </div>
              <div className="cardRow">
                <div className="cardInfo">
                  <h3>{product.name}</h3>
                  <p>{ethers.utils.formatEther(product.price)} ETH</p>
                </div>
                <button
                  onClick={() => purchaseProduct(product.id, product.price)}
                >
                  Purchase
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Discover;
