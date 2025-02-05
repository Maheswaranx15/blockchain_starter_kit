// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract Proxy {
    address public implementation;  // Address of logic contract (can be upgraded)
    address public admin;           // Only admin can upgrade

    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender; // Deploying address becomes admin
    }

    function upgrade(address newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        implementation = newImplementation;
    }

    fallback() external payable {
        (bool success, bytes memory result) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    receive() external payable {} // Allows contract to receive ETH
}
