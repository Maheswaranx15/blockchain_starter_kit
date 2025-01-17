// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract SendEther {
    constructor() payable {}

    // Event to log the success status of the send method
    event SendStatus(bool success);
    
    function sendViaTransfer(address payable _to) external payable {
        // Automatically reverts on failure
        // Only forwards 2300 gas
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) external payable {
        // Returns a boolean value indicating success or failure
        // Only forwards 2300 gas
        bool success = _to.send(msg.value);

        emit SendStatus(success);
    }
}

contract RejectingRecipient {
    receive() external payable {
        // This causes the transfer to fail since it always evaluates to false
        require(0 == 1, "");
    }
}



// Question #32 (Medium): What is the difference between transfer and send? Why should they not be used?

// Answer: The difference between transfer and send is that transfer will revert the transaction upon failure while send will not revert the transaction but instead return a boolean which represents the success or failure of the operation.
// transfer and send should not be used because these calls only forward 2300 gas, which isn’t enough for a smart contract recipient to execute complex logic upon receiving Ether.
// Also, since transfer reverts on failure, it doesn’t provide the calling contract any flexibility to execute logic to handle transfer failures.