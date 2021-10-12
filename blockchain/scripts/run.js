const main = async () => {
  const mpContractFactory = await hre.ethers.getContractFactory("Marketplace");
  const mpContract = await mpContractFactory.deploy();
  await mpContract.deployed();
  console.log("Contract addy:", mpContract.address);
  let createTxn = await mpContract.createProduct(
    "Test #1",
    ethers.utils.parseUnits("1.33346456", "ether"),
    "Description",
    "file url here.com"
  );
  await createTxn.wait();
  let count = await mpContract.getAllProducts();

  console.log(count);

  //const getAllProducts = await mpContract.getAllProducts();
  /*
  let purchaseTx = await mpContract.purchaseProduct(0, {
    value: ethers.utils.parseUnits("1.33346456", "ether"),
  });
  */
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
