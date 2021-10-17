import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/Product.scss";

function Product() {
  const marketplaceAddress = "0x6Df17907b1Fc60300FCFE8e7Ca4d27C47be6a4eB";
  const marketplaceABI = marketplace.abi;
  let { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const provider = new ethers.providers.getDefaultProvider("rinkeby");
      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        provider
      );

      let prod = await marketplaceContract.products(id);

      // const buyer = await marketplaceContract.buyers(
      //   "0x21e162e396336dd40a1ce93C51d3696FA4a73896",
      //   0
      // );

      const getBuyer = await marketplaceContract.getBuyerLength();

      console.log(getBuyer.toString());
      setProduct(prod);
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
              {product.name !== "" ? (
                <>
                  <div className="product-header">
                    <h2>{product.name}</h2>
                    <p>
                      {product.seller.slice(0, 6)}...
                      {product.seller.slice(-4)}
                    </p>
                  </div>
                  <p className="pricing">
                    {ethers.utils.formatEther(product.price)}
                    ETH
                  </p>
                  <p>{product.desc}</p>
                  <button
                    onClick={() => {
                      purchaseProduct(product.id, product.price);
                    }}
                  >
                    Purchase
                  </button>
                </>
              ) : (
                <div className="fof">
                  <h2>404</h2>
                  <p>
                    Sorry about this but we can't find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Back to Discover
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </section>
  );
}

export default Product;
