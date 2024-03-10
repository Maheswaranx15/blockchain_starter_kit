// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract iAgent_Nft is ERC721A, Ownable {
    uint256 MAX_MINTS = 1000;
    uint256 MAX_SUPPLY = 20000;
    mapping(address => bool) public whitelist;
    string public _tokenURI = "https://ipfs.io/ipfs/QmePXkCTzXtrqoosat7QQMWzKqeGRLmhv8C6denofMPCjr/";

    event AddressAddedToWhitelist(address indexed _address);
    event AddressRemovedFromWhitelist(address indexed _address);
    event TokensMinted(address indexed _minter, uint256 _quantity);
    event TokensTransferredToWhitelisted(address indexed _sender, address indexed _receiver, uint256[] _tokenIds);

    constructor() Ownable(msg.sender) ERC721A("iAgent", "IAT") {
        whitelist[owner()] = true; 
    }

    function addAddressToWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
            emit AddressAddedToWhitelist(_addresses[i]);
        }
    }

    function removeAddressFromWhitelist(address _address) external onlyOwner {
        whitelist[_address] = false;  
    }
    
    function isAddressWhitelisted(address _address) external view returns (bool) {
        return whitelist[_address];
    }

    function mint(uint256 quantity) external  {
        require(whitelist[msg.sender] == true, "Address not whitelisted"); 
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
        _safeMint(msg.sender, quantity);
        emit TokensMinted(msg.sender, quantity);

    }

    function transferToWhitelisted(address receiver, uint256[] calldata tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(_isApprovedOrOwner(msg.sender, tokenIds[i]), "You are not approved to transfer this token");
            safeTransferFrom(msg.sender, receiver, tokenIds[i]);
        }
        emit TokensTransferredToWhitelisted(msg.sender, receiver, tokenIds);
    }
    
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId) , ".json")) : '';
    }


    function _baseURI() internal view override returns (string memory) {
        return _tokenURI;
    }

}