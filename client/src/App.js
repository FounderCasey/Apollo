import React, { useState, useEffect } from "react";
import "./App.scss";
import { ethers } from "ethers";
import NavigationBar from "./components/NavigationBar";
import marketplace from "./utils/Marketplace.json";
import ConnectWallet from "./components/ConnectWallet";

function App() {
  const [products, setProducts] = useState([]);

  const marketplaceAddress = "0x861f42AB6c6f1DfFaED4168a2282C3c8c3B52F79";
  const marketplaceABI = marketplace.abi;

  const getAllProducts = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );
        const _products = await marketplaceContract.getAllProducts();

        setProducts(_products);
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
          `Test Product #${products.length + 1}`,
          ethers.utils.parseUnits("1.33346456", "ether")
        );

        await createTx.wait();

        getAllProducts();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const purchaseProduct = async (id) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          marketplaceABI,
          signer
        );

        const createTx = await marketplaceContract.purchaseProduct(id, {
          gasLimit: 300000,
          value: ethers.utils.parseUnits("1.33346456", "ether"),
        });

        await createTx.wait();

        console.log(
          "Transaction completed for: " +
            ethers.utils.formatEther(
              ethers.utils.parseUnits("1.33346456", "ether")
            ) +
            " ETH"
        );

        getAllProducts();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <button onClick={createProduct}>Create Product</button>
      <div className="cardContainer">
        {products.map((product, index) => {
          return (
            <div className="card" key={index}>
              <div className="cardImage"></div>
              <div>
                <h3>{product.name}</h3>
                <p>{ethers.utils.formatEther(product.price)}</p>
                <p>
                  {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
                </p>
                <button onClick={() => purchaseProduct(product.id)}>
                  Purchase
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ConnectWallet />
    </div>
  );
}

export default App;
