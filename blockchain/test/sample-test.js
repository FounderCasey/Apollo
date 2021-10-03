const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  it("Should return list of products", async function () {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    const getAllProductsTx = await marketplace.getAllProducts();

    // wait until the transaction is mined
    await getAllProductsTx.wait();
  });
});
