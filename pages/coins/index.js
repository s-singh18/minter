import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import * as React from "react";
import { useState } from "react";

const factoryAddress = "0x13aec255A8c30220Ac2b61B579b5E99bFD511b8a";
const factoryabi = require("../../artifacts/contracts/CoinFactory/CoinFactory.json");
const coinabi = require("../../artifacts/contracts/Coin/Coin.json");

export default function coins() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ownedTokens, setOwnedTokens] = useState([{}]);

  async function requestAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  }
  requestAccount();
  async function getTokens() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryabi.abi,
        signer
      );
      const tokenArr = factoryContract.getDeployedCoins();
      for (let i = 0; i < tokenArr.length; i++) {
        const coinContract = new ethers.Contract(
          tokenArr[i],
          coinabi.abi,
          signer
        );
        if (walletAddress == "") {
          return;
        }
        const ownedAmount = (
          await coinContract.balanceOf(walletAddress)
        ).Number();
        const coinName = await coinContract.name;
        const coinSymbol = await coinContract.symbol;
        if (ownedAmount > 0) {
          const token = {
            name: coinName,
            symbol: coinSymbol,
            amount: ownedAmount,
          };
        }
        setOwnedTokens((ownedTokens) => [...ownedTokens, token]);
      }
    }
  }

  const Token = () => {
    return ownedTokens.map(
      (token) =>
        token.name && (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        )
    );
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={requestAccount}>
        {walletAddress ? "Connected!" : "Connect Wallet 🦊"}
      </Button>
      <Token />
    </>
  );
}
