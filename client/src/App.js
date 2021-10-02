import React, { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import marketplace from "./utils/Marketplace.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const marketplaceAddress = "0x0738B64990Bb6cB789c80a816A9e41A2241F038e";
  const marketplaceABI = marketplace.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      {!currentAccount && <button onClick={connectWallet}>Connect</button>}
    </div>
  );
}

export default App;
