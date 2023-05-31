import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import * as React from "react";
import { useState } from "react";

const factoryAddress = "0x13aec255A8c30220Ac2b61B579b5E99bFD511b8a";
const factoryabi = require("../artifacts/contracts/CoinFactory/CoinFactory.json");
const coinabi = require("../artifacts/contracts/Coin/Coin.json");

export default function CreateCoin() {
  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({ name: "", symbol: "", amount: 0 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function requestAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  }
  requestAccount();

  async function mintCoin(event) {
    event.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryabi.abi,
        signer
      );
      const tx = await factoryContract.createNewCoin(
        formData.name,
        formData.symbol
      );

      const receipt = await tx.wait();
      const newCoinAddress = receipt.events[0].args[0];
      const newCoinContract = new ethers.Contract(
        newCoinAddress,
        coinabi.abi,
        signer
      );
      await newCoinContract.mint(formData.amount);
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={requestAccount}>
        {walletAddress ? "Connected!" : "Connect Wallet 🦊"}
      </Button>
      <Box
        component="form"
        onSubmit={mintCoin}
        sx={{ maxWidth: "500px", mx: "auto" }}
      >
        <Typography variant="h4" align="center">
          Create a Coin
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          ></TextField>
          <TextField
            fullWidth
            name="symbol"
            label="Symbol"
            value={formData.symbol}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          ></TextField>
          <TextField
            fullWidth
            name="amount"
            label="Amount"
            value={formData.amount}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          ></TextField>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
