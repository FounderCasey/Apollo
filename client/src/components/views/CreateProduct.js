import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/CreateProduct.scss";
import { create } from "ipfs-http-client";
import db from "../../firebase.config";

const client = create("https://ipfs.infura.io:5001/api/v0");

function CreateProduct() {
  const marketplaceAddress = "0x0E85C41E800080a1386FbD9a498Fe71217D38F81";
  const marketplaceABI = marketplace.abi;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [fileUrl, updateFileUrl] = useState(``);

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const setupEvents = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );

        marketplaceContract.on("ProductCreated", (res) => {
          db.collection("products").doc(res.toString()).set({
            files: [],
          });
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    setupEvents();
  }, []);

  return (
    <div id="create-product">
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

      <input type="file" onChange={onChange} />
      {fileUrl && <img src={fileUrl} width="600px" />}

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
