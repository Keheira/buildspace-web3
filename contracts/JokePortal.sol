// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract JokePortal {
    uint256 totalJokes;

    constructor() {
        console.log("This is a contract for jokes");
    }

    function tellJoke() public {
        totalJokes += 1;
        console.log("%s has told a joke", msg.sender);
    }

    function getTotalJokes() public view returns (uint256) {
        console.log("There are %d total jokes!", totalJokes);
        return totalJokes;
    }
}