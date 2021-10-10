import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/Product.scss";

function Product() {
  const marketplaceAddress = "0x0E85C41E800080a1386FbD9a498Fe71217D38F81";
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

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section id="product">
      <h1>Product: {id}</h1>
      {product && (
        <>
          <p>{product.name}</p>
          <p>{ethers.utils.formatEther(product.price)} ETH</p>
          <p>{product.id.toString()}</p>
          <p>
            {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
          </p>
        </>
      )}
    </section>
  );
}

export default Product;
