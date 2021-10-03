import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import NavigationBar from "./components/NavigationBar";
import marketplace from "./utils/Marketplace.json";

function App() {
  const [products, setProducts] = useState([]);

  const marketplaceAddress = "0xb6044e2D77d204650f6574b3a59Ac64848076347";
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
          30000000000000
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

  return (
    <div className="App">
      <NavigationBar />
      {!currentAccount && <button onClick={connectWallet}>Connect</button>}
      <button onClick={createProduct}>Create Product</button>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <div>{product.name}</div>
            <div className="info">
              <p>{ethers.utils.formatEther(product.price)}</p>
              <p>
                {product.owner.slice(0, 6)}...{product.owner.slice(-4)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
