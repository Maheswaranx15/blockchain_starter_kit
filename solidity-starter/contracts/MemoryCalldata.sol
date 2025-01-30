// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract MemoryCalldataExample {
    // Function using `memory` for the string argument
    function processWithMemory(string memory _input)
        public
        pure
        returns (string memory)
    {
        // The argument `_input` is copied into memory.
        // `memory` means the data can be modified within the function.

        // Modifying the input by appending a string (this operation is allowed in `memory`)
        _input = string(abi.encodePacked(_input, " - modified"));

        // The modified string is returned.
        return _input;
    }

    // Function using `calldata` for the string argument
    function processWithCalldata(string calldata _input)
        public
        pure
        returns (string memory)
    {
        // The argument `_input` is passed as `calldata`.
        // `calldata` is a read-only location and more gas efficient because it avoids copying.

        // Attempting to modify `_input` directly would fail because `calldata` is immutable.
        // "TypeError: Type string memory is not implicitly convertible to expected type string calldata."
        //_input = string(abi.encodePacked(_input, " - modified"));

        // However, we can use `_input` without modification.

        // We can still return a modified version, but it requires allocating new memory.
        // Here we append " - modified", but we first copy the data to `memory` implicitly when using `abi.encodePacked`.
        return string(abi.encodePacked(_input, " - modified"));
    }
}