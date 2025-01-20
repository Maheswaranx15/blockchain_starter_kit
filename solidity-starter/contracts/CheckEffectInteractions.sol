// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract ChecksEffectsInteractions {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] = msg.value;
    }

    function withdraw(uint amount) public {
        // Check
        require(balances[msg.sender] >= amount);

        // Effects
        balances[msg.sender] -= amount;

        // Interactions
        (bool sent, bytes memory data) = msg.sender.call{value: amount}("");
    }
}