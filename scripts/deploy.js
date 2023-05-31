// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = await Coin.deploy(
    "StellaCoin",
    "STL",
    "0x45879C65afCE9f0F63d607E8d32343E3115b3ED0"
  );

  await coin.deployed();

  const CoinFactory = await hre.ethers.getContractFactory("CoinFactory");
  const coinFactory = await CoinFactory.deploy();
  await coinFactory.deployed();

  console.log(
    "Coin contract deployed at address " +
      coin.address +
      " and CoinFactory contract deployed at address " +
      coinFactory.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
