// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDeposit is Ownable {

    struct User {
        address walletAddress;
        Deposit deposit;
    }

    struct Deposit {
        uint256 amount;
        uint256 depositedTime;
    }

    address public token;

    mapping (address=>User) public user;

    constructor(address _tokenAddress)Ownable(msg.sender) {
        token = _tokenAddress;
    }

    function deposit(uint256 amount) external returns(bool){
        IERC20(token).transferFrom(msg.sender,address(this),amount);
        User memory u = user[msg.sender];
        u.deposit.amount = amount;
        u.deposit.depositedTime = block.timestamp;
        return true;
    }

}