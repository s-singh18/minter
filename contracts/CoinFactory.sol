// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
import "./Coin.sol";

contract CoinFactory {
    address[] public deployedCoins;
    // deployedCoins
    address gov;

    event NewCoinCreated(address newCoinAddress);

    constructor() {
        // gov is address of person who deployed contract
        gov = msg.sender;
    }

    function createNewCoin(
        string memory name,
        string memory symbol
    ) external returns (address) {
        Coin newCoin = new Coin(name, symbol, msg.sender);
        deployedCoins.push(address(newCoin));
        emit NewCoinCreated(address(newCoin));
        return address(newCoin);
    }

    function getDeployedCoins() public view returns (address[] memory) {
        return deployedCoins;
    }
}
