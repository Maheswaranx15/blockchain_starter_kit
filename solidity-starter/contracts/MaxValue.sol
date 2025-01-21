// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Max {
    function getMaxValue () external pure returns (uint256) {
        // Returns: 115792089237316195423570985008687907853269984665640564039457584007913129639935
        return type(uint256).max;
    }
}