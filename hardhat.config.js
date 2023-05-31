require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/c0c480eb2eb646e8bac63d82df3166a2",
      accounts: [
        "d74a22788e1b94bcc0954275e6221116f11bbb2ce4e308ef740f7abb1fdaf530",
      ],
    },
  },
  solidity: "0.8.18",
};
