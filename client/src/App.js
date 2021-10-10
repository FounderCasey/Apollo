import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./components/NavigationBar";
import ConnectWallet from "./components/ConnectWallet";
import CreateProduct from "./components/views/CreateProduct";
import Product from "./components/views/Product";
import Landing from "./components/views/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/create">
            <CreateProduct />
          </Route>
          <Route path="/p/:id">
            <Product />
          </Route>
        </Switch>
      </Router>

      <ConnectWallet />
    </div>
  );
}

export default App;
