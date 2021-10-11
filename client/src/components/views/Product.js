import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/Product.scss";

function Product() {
  const marketplaceAddress = "0x3CF6E295Ec5afAfA5Ff5A70A9Df404CffcC2DE7B";
  const marketplaceABI = marketplace.abi;
  let { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );

        let count = await marketplaceContract.getAllProducts();

        console.log(count[id]);

        setProduct(count[id]);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
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
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section id="product">
      <header>
        <div className="product-container">
          {product && (
            <>
              <div className="product-header">
                <h2>{product.name}</h2>
                <p>
                  {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
                </p>
              </div>
              <p className="pricing">
                {ethers.utils.formatEther(product.price)} ETH
              </p>
              <p>{product.desc}</p>
            </>
          )}
          <button
            onClick={() => {
              purchaseProduct(product.id, product.price);
            }}
          >
            Purchase
          </button>
        </div>
      </header>
    </section>
  );
}

export default Product;
