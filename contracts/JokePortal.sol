// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract JokePortal {
    uint256 totalJokes;

    uint256 private seed;

    event NewJoke(address indexed from, uint256 timestamp, string message);

    struct Joke {
        address joker; // addy of joke teller
        string message; // the joke
        uint256 timestamp; // timestamp of joke
    }

    Joke[] jokes;

    mapping(address => uint256) public lastJokeAt;

    constructor() payable {
        console.log("Beefy smart contract.");
    }

    function tellJoke(string memory _message) public {
        require(
            lastJokeAt[msg.sender] + 5 minutes < block.timestamp,
            "Let someone else get a chance. Come back in 5m"
        );
        lastJokeAt[msg.sender] = block.timestamp;

        totalJokes += 1;
        console.log("%s has told a joke", msg.sender);

        jokes.push(Joke(msg.sender, _message, block.timestamp));
        emit NewJoke(msg.sender, block.timestamp, _message);

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("The number is: %s", randomNumber);
        seed = randomNumber;

        if(randomNumber < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0003 ether;
            require(
                prizeAmount <= address(this).balance,
                "Contract is poor now"
            );
            (bool success, ) = (msg.sender).call{value:prizeAmount}("");
            require(success, "Failed to withdraw from contract");
        }
    }

    function getAllJokes() public view returns (Joke[] memory) {
        return jokes;
    }

    function getTotalJokes() public view returns (uint256) {
        console.log("There are %d total jokes!", totalJokes);
        return totalJokes;
    }
}