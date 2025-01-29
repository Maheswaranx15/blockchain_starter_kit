// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EvenOddChecker {
    
    function isEven(uint256 number) public pure returns (bool) {
        // Use bitwise AND operation to check if the least significant bit is 0
        return (number & 1) == 0;
    }
    
    function isOdd(uint256 number) public pure returns (bool) {
        // Use bitwise AND operation to check if the least significant bit is 1
        return (number & 1) == 1;
    }
}
