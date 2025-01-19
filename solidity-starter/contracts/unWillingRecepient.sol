// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * This contract does NOT have a payable, receive or fallback function,
 * so it cannot receive Ether through regular transactions.
 */
contract UnwillingRecipient {
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

contract ForceEtherSender {
    // Constructor to optionally receive Ether upon deployment
    constructor() payable {}

    // Function to allow the contract to receive Ether
    receive() external payable {}

    // Function to self-destruct and force-send Ether to an address
    function forceSend(address payable recipient) external {
        // Requires that the contract has a balance greater than 0
        require(address(this).balance > 0, "No Ether to send");

        // selfdestruct sends all Ether held by the contract to the recipient
        selfdestruct(recipient);
    }
}