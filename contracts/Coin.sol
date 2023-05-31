// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Coin is ERC20 {
    address manager;

    constructor(
        string memory _name,
        string memory _symbol,
        address _manager
    ) ERC20("name", "SYM") {
        manager = _manager;
    }

    function mint(uint tokensToMint) public {
        require(msg.sender == manager);
        _mint(manager, tokensToMint);
    }
}
