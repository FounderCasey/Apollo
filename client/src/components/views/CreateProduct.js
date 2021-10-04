import React, { useState } from "react";
import { ethers } from "ethers";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/CreateProduct.scss";

function CreateProduct() {
  const marketplaceAddress = "0x05630FBA6338DfBf5355E2516BB7AD4E92253BC8";
  const marketplaceABI = marketplace.abi;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });

  const createProduct = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );

        const createTx = await marketplaceContract.createProduct(
          newProduct.name,
          ethers.utils.parseUnits(newProduct.price, "ether")
        );

        await createTx.wait();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(e) => {
          setNewProduct({ ...newProduct, name: e.target.value });
        }}
      />

      <br />
      <input
        type="text"
        placeholder="0.015 Eth"
        onChange={(e) => {
          setNewProduct({ ...newProduct, price: e.target.value });
        }}
      />
      <br />
      <button
        onClick={() => {
          createProduct(newProduct.name, newProduct.price);
        }}
      >
        Create Product
      </button>
    </div>
  );
}

export default CreateProduct;
