// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.21;


contract MaxCodeSizeDemo {
    function func1() public pure returns(uint256) {
        return 1;
    }
    
    // Add similar functions up to funcN
    // ...

    function func4096() public pure returns(uint256) {
        return 4096;
    }
    
    /** 
     * ...and so on... until eventually, the contract size will
     * exceed 24,576 bytes and an attempt to deploy will
     * show an error similar to:
     *
     * Warning: Contract code size exceeds 24576 bytes (a limit
     * introduced in Spurious Dragon). This contract may not be
     * deployable on Mainnet. Consider enabling the optimizer (with
     * a low "runs" value!), turning off revert strings, or using libraries.
     */
    
}