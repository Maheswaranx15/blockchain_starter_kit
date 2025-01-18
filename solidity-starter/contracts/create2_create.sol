// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.21;

contract ContractToBeCreated {}

contract Factory {
    // Arbitrary value used to calculate new contract address
    bytes32 constant private SALT = "random salt value";

    /**
     * @return The predicted address of the new contract
     */
    function getPredictedNewContractAddressUsingCreateFormula()
      external
      view
      returns (address)
    {
        // This involves Recursive Length Prefix (RLP) encoding, which is
        // outside the scope of this demonstration...
        // This can be accomplished using Javascript libraries such as rlp.js
        // and web3.js...
    }

    /**
     * @notice Creates a new contract using the CREATE opcode
     */
    function create() external returns (address deployedContractAddress) {
        bytes memory bytecode = type(ContractToBeCreated).creationCode;

        assembly {
            deployedContractAddress := create(
                // wei sent with current call
                0,
                // Actual code starts after skipping the first 32 bytes
                add(bytecode, 0x20),
                // Load the size of code contained in the first 32 bytes
                mload(bytecode)
            )
        }
    }
    
    /**
     * @return The predicted address of the new contract
     */
    function getPredictedNewContractAddressUsingCreate2Formula()
      external
      view
      returns (address)
    {
        bytes1 constantValue = bytes1(0xff);
        address sendersAddress = address(this);
        bytes memory bytecode = type(ContractToBeCreated).creationCode;
        bytes32 hash = keccak256(
          abi.encodePacked(
            constantValue,
            sendersAddress,
            SALT,
            keccak256(bytecode)
          )
        );
        
        return address(uint160(uint256(hash)));
    }

    /**
     * @notice Creates a new contract using the CREATE2 opcode
     */
    function create2() external returns (address deployedContractAddress) {
        bytes memory bytecode = type(ContractToBeCreated).creationCode;

        assembly {
            deployedContractAddress := create2(
                // wei sent with current call
                0,
                // Actual code starts after skipping the first 32 bytes
                add(bytecode, 0x20),
                // Load the size of code contained in the first 32 bytes
                mload(bytecode),
                // Developer-specified salt value
                SALT
            )
        }
    }
}