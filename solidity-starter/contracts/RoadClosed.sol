
// Objective of CTF:

// Become the owner of the contract.
// Change the value of hacked to true.

// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.22;

contract RoadClosed {
  bool hacked;
  address owner;
  address pwner;
  mapping(address => bool) whitelistedMinters;

  function isContract(address addr) public view returns (bool) {
    uint size;
    assembly {
      size := extcodesize(addr)
    }
    return size > 0;
  }

  function isOwner() public view returns (bool) {
    if (msg.sender == owner) {
      return true;
    } else return false;
  }

  constructor() {
    owner = msg.sender;
  }

  function addToWhitelist(address addr) public {
    require(!isContract(addr), "Contracts are not allowed");
    whitelistedMinters[addr] = true;
  }

  function changeOwner(address addr) public {
    require(whitelistedMinters[addr], "You are not whitelisted");
    require(msg.sender == addr, "address must be msg.sender");
    require(addr != address(0), "Zero address");
    owner = addr;
  }

  function pwn(address addr) external payable {
    require(!isContract(msg.sender), "Contracts are not allowed");
    require(msg.sender == addr, "address must be msg.sender");
    require(msg.sender == owner, "Must be owner");
    hacked = true;
  }

  function pwn() external payable {
    require(msg.sender == pwner);
    hacked = true;
  }

  function isHacked() public view returns (bool) {
    return hacked;
  }
}
// The Attack
// We can immediately see that non-contract accounts can whitelist themselves via the addToWhitelist function. A whitelisted account can become the owner simply by calling the changeOwner function. Once an account becomes the owner, all that is left to do is call the pwn function, and the contract will have hacked = true. In short:

// addToWhitelist(yourAddress)
// changeOwner(yourAddress)
// pwn(yourAddress)
// As an extra note, you can do this hack with a contract if you execute everything within the constructor, because extcodesize of a contract at it's constructor phase will return 0.

// Proof of Concept
// The Hardhat test code to demonstrate this attack is given below. Contract types are generated via TypeChain.

