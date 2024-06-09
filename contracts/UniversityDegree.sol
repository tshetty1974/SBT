// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";



contract UniversityDegree is ERC721, Ownable {
    // Mapping to store whether each token is locked
    mapping(uint256 => bool) private _lockedTokens;
    uint256[] private _issuedTokens;

    // Struct to represent a degree with name and university
    struct Degree {
        string courseName;
        string universityName;
        address deployedFrom; //owner
        address deployedTo;
    }

    // Mapping to associate each token with a Degree
    mapping(uint256 => Degree) private _personToDegree;

    // Constructor to initialize the ERC721 contract
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    // Function to mint a new degree token
    function mint(
        address owner,
        address to,
        uint256 tokenId,
        string memory courseName,
        string memory universityName
    ) external onlyOwner {
        // Check if the token ID already exists
        require(!_exists(tokenId), "Token ID already exists");
        
        // Mint the token using OpenZeppelin's _safeMint
        _safeMint(owner, tokenId);

        // Store the degree information for the token
        _personToDegree[tokenId] = Degree(courseName, universityName, owner, to);
        _issuedTokens.push(tokenId);
    }

    // Override transferFrom to include token locking logic
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        // Check if the token is locked
        require(!_lockedTokens[tokenId], "Token is locked and cannot be transferred");

        // Call the parent ERC721 transferFrom function
        super.transferFrom(from, to, tokenId);

        // Lock the token after transfer
        _lockedTokens[tokenId] = true;
    }

    // Function to manually lock a token by the owner
    function lockToken(uint256 tokenId) external onlyOwner {
        // Check if the token ID exists
        require(_exists(tokenId), "Token ID does not exist");
        
        // Check if the token is already locked
        require(!_lockedTokens[tokenId], "Token is already locked");

        // Lock the token
        _lockedTokens[tokenId] = true;
    }

    // Function to check if a token is locked
    function isTokenLocked(uint256 tokenId) external view returns (bool) {
        return _lockedTokens[tokenId];
    }

    // Function to retrieve degree information for a token
    function getDegree(uint256 tokenId) external view returns (string memory courseName, string memory universityName, address owner, address to) {
        // Check if the token ID exists
        require(_exists(tokenId), "Token ID does not exist");

        // Retrieve degree information from the mapping
        Degree memory degree = _personToDegree[tokenId];
        return (degree.courseName, degree.universityName, degree.deployedFrom, degree.deployedTo);
    }
    function getIssuedDegreesCount() external view returns (uint256) {
        return _issuedTokens.length;
    }

    // Function to get the details of all issued degrees
    function getIssuedDegrees() external view returns (uint256[] memory, Degree[] memory) {
        uint256 count = _issuedTokens.length;
        Degree[] memory degrees = new Degree[](count);

        for (uint256 i = 0; i < count; i++) {
            uint256 tokenId = _issuedTokens[i];
            degrees[i] = _personToDegree[tokenId];
        }

        return (_issuedTokens, degrees);
    }
}


