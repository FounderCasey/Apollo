import React, { useState } from "react";
import { ethers } from "ethers";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/CreateProduct.scss";
import { create } from "ipfs-http-client";
import db from "../../firebase.config";
import HorizontalScroll from "react-scroll-horizontal";

const client = create("https://ipfs.infura.io:5001/api/v0");

function CreateProduct() {
  const marketplaceAddress = "0x3CF6E295Ec5afAfA5Ff5A70A9Df404CffcC2DE7B";
  const marketplaceABI = marketplace.abi;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    desc: "",
  });
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);

  async function onChange(e) {
    setUploading(true);
    const files = e.target.files;
    try {
      console.log(files[0]);
      const added = await client.add(files[0]);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFile({ name: files[0].name, url: url });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setUploading(false);
  }

  // const setupEvents = async () => {
  //   try {
  //     if (window.ethereum) {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const marketplaceContract = new ethers.Contract(
  //         marketplaceAddress,
  //         marketplaceABI,
  //         signer
  //       );

  //       marketplaceContract.on("ProductCreated", (res) => {
  //         //createDoc(res.toString());
  //       });
  //     } else {
  //       console.log("Ethereum object doesn't exist!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

        let count = await marketplaceContract.getAllProducts();

        const createTx = await marketplaceContract.createProduct(
          newProduct.name,
          newProduct.desc,
          ethers.utils.parseUnits(newProduct.price, "ether")
        );

        await createTx.wait();

        //createDoc((count.length + 1).toString());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const createDoc = async (product_id) => {
  //   await db.collection("products").doc(product_id).set({
  //     files: allFiles,
  //   });
  // };

  return (
    <div id="create-product">
      <div className="input-container">
        <header>
          <h1>Create Product</h1>
        </header>
        <input
          type="file"
          accept=".zip,.rar,.7zip"
          placeholder="Test"
          onChange={onChange}
        />
        {file.name != null && <p className="file-name">{file.name}</p>}
        <div className="flex-row">
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="0.015 Eth"
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
          />
        </div>

        <textarea
          placeholder="Description here..."
          onChange={(e) => {
            setNewProduct({ ...newProduct, desc: e.target.value });
          }}
        />

        <button
          onClick={() => {
            createProduct(newProduct.name, newProduct.price, newProduct.desc);
          }}
        >
          Create Product
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
