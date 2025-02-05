// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LockedNFT is ERC721, Ownable {
    mapping(uint256 => bool) public lockedTokens;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address recipient, uint256 tokenId) public onlyOwner {
        _mint(recipient, tokenId);
    }

    function lockNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can lock this NFT");
        require(!lockedTokens[tokenId], "This NFT is already locked");

        lockedTokens[tokenId] = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        require(!lockedTokens[tokenId], "This NFT is locked and cannot be transferred");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
