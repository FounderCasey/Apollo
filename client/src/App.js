import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { ethers } from "ethers";
import NavigationBar from "./components/NavigationBar";
import ConnectWallet from "./components/ConnectWallet";
import CreateProduct from "./components/views/CreateProduct";
import Discover from "./components/views/Discover";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Discover />
          </Route>
          <Route path="/create">
            <CreateProduct />
          </Route>
        </Switch>
      </Router>

      <ConnectWallet />
    </div>
  );
}

export default App;
