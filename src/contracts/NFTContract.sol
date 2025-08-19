// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NFTContract is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;
    
    string private _baseTokenURI;
    uint256 private _nextTokenId = 1;
    
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        
        return string(
            abi.encodePacked(
                _baseTokenURI,
                tokenId.toString(),
                ".json"
            )
        );
    }

    // Поддержка новых стандартов
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return 
            interfaceId == 0x49064906 || // ERC-4906 (Metadata Update Notification)
            super.supportsInterface(interfaceId);
    }
}
