// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract CommitReveal {
    // Define a struct to hold each user's commitment details
    struct Commitment {
        // The hash of the data, nonce, and secret
        bytes32 commitmentHash;
        // Flag to indicate if the commitment has been revealed
        bool revealed;
    }

    // Mapping to store commitments for each user
    mapping(address => Commitment) public commitments;

    // Event to log commitment
    event Commit(address indexed user, bytes32 commitmentHash);
    // Event to log reveal
    event Reveal(
        address indexed user,
        bytes32 data,
        bytes32 nonce,
        bytes32 secret
    );

    // Function to commit a hashed value
    function commit(bytes32 _commitmentHash) public {
        // Ensure the user has not already committed
        require(
            commitments[msg.sender].commitmentHash == 0,
            "Already committed"
        );

        commitments[msg.sender] = Commitment({
            commitmentHash: _commitmentHash,
            revealed: false
        });

        emit Commit(msg.sender, _commitmentHash);
    }

    // Function to reveal the original value, nonce, and secret
    function reveal(bytes32 _data, bytes32 _nonce, bytes32 _secret) public {
        // Retrieve the user's commitment from storage
        Commitment storage userCommitment = commitments[msg.sender];

        // Ensure a commitment exists for the user
        require(userCommitment.commitmentHash != 0, "No commitment found");
        // Ensure the commitment has not already been revealed
        require(!userCommitment.revealed, "Already revealed");

        // Recompute the hash using the original data, nonce, and secret
        bytes32 computedHash = keccak256(
            abi.encodePacked(_data, _nonce, _secret)
        );

        // Verify that the recomputed hash matches the stored commitment hash
        require(
            computedHash == userCommitment.commitmentHash,
            "Invalid reveal"
        );

        // Mark the commitment as revealed
        userCommitment.revealed = true;

        emit Reveal(msg.sender, _data, _nonce, _secret);
    }
}