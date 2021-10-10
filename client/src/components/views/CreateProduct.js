import React, { useState } from "react";
import { ethers } from "ethers";
import marketplace from "../../utils/Marketplace.json";
import "../../styles/CreateProduct.scss";
import { create } from "ipfs-http-client";
import db from "../../firebase.config";
import HorizontalScroll from "react-scroll-horizontal";

const client = create("https://ipfs.infura.io:5001/api/v0");

function CreateProduct() {
  const marketplaceAddress = "0x0E85C41E800080a1386FbD9a498Fe71217D38F81";
  const marketplaceABI = marketplace.abi;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [allFiles, setAllFiles] = useState([]);

  async function onChange(e) {
    const files = e.target.files;
    let newFiles = [];
    for (const key of Object.keys(files)) {
      try {
        const added = await client.add(files[key]);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        console.log(url);
        newFiles.push(url);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
    setAllFiles(...allFiles, newFiles); //TODO: Look into why the stinkin previous state is not being kept
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
          ethers.utils.parseUnits(newProduct.price, "ether")
        );

        await createTx.wait();

        createDoc((count.length + 1).toString());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDoc = async (product_id) => {
    await db.collection("products").doc(product_id).set({
      files: allFiles,
    });
  };

  return (
    <div id="create-product">
      <div className="input-container">
        <header>
          <h1>Create Product</h1>
        </header>
        <input type="file" multiple onChange={onChange} />
        <HorizontalScroll
          reverseScroll={true}
          className={allFiles.length === 0 ? "hidden" : "horizontal"}
        >
          {allFiles.map((e, index) => {
            return <img key={index} src={e} />;
          })}
        </HorizontalScroll>
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

        <textarea placeholder="Description here..." />

        <button
          onClick={() => {
            createProduct(newProduct.name, newProduct.price);
          }}
        >
          Create Product
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
