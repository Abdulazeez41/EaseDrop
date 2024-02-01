// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EaseNFTDrop: ERC721 Token Contract with Airdrop Functionality
 * @dev Extends ERC721Enumerable and Ownable contracts
 */
contract EaseNFTDrop is ERC721Enumerable, Ownable {
    // Struct representing an NFT
    struct NFT {
        string name;
        string symbol;
        string uri;
    }

    // Mapping to store NFTs for each address
    mapping(address => NFT[]) public nfts;

    /**
     * @dev Constructor to initialize the EaseNFTDrop contract
     * @param name The name of the ERC721 token
     * @param symbol The symbol of the ERC721 token
     */
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    /**
     * @dev Airdrop function to distribute NFTs to a list of addresses
     * @param _addresses Array of recipient addresses
     * @param _name Name of the NFT
     * @param _symbol Symbol of the NFT
     * @param _uri URI for additional NFT information
     * @return A boolean indicating the success of the NFT airdrop
     */
    function doNFtAirDrop(
        address[] memory _addresses,
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) public onlyOwner returns (bool) {
        uint256 count = _addresses.length;
        for (uint256 i = 0; i < count; i++) {
            // Calling the mint function to create and assign NFTs to recipients
            mint(_addresses[i], _name, _symbol, _uri);
        }
        return true;
    }

    /**
     * @dev Function to mint a new NFT and assign it to a specific address
     * @param _to The address to receive the NFT
     * @param _name Name of the NFT
     * @param _symbol Symbol of the NFT
     * @param _uri URI for additional NFT information
     */
    function mint(
        address _to,
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) internal {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(_to, tokenId);

        // Create a new NFT struct
        NFT memory newNFT;
        newNFT.name = _name;
        newNFT.symbol = _symbol;
        newNFT.uri = _uri;

        // Add the new NFT to the nfts mapping for the recipient's address
        nfts[_to].push(newNFT);
    }

    /**
     * @dev Function to get the number of NFTs associated with a specific address
     * @param _owner The address of the owner
     * @return The number of NFTs
     */
    function noOfNFTs(address _owner) public view returns (uint) {
        return nfts[_owner].length;
    }

    /**
     * @dev Function to view all NFTs associated with a specific address
     * @param _owner The address of the owner
     * @return An array of NFT structs
     */
    function viewNFTs(address _owner) public view returns (NFT[] memory) {
        return nfts[_owner];
    }
}
