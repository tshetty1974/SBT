# Soulbound Token Project

This project implements a smart contract for managing university degrees as NFTs (Non-Fungible Tokens) on the Ethereum blockchain. Each degree token is represented by an ERC721 token, and the contract includes features such as minting degrees, transferring degrees, and locking/unlocking tokens.

## Project Overview

The smart contract, named `UniversityDegree`, is built on the OpenZeppelin ERC721 and Ownable contracts. The key features include:

- Minting a new degree token: The contract owner can mint new degree tokens, associating them with specific courses, universities, and addresses.

- Transferring degrees: The contract supports the standard ERC721 `transferFrom` function for transferring degrees between addresses.

- Token locking: The contract includes functionality to lock individual tokens. Once locked, a token cannot be transferred.

## Getting Started

### Prerequisites

- Node.js
- Hardhat (a development environment for Ethereum)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/soulbound-token-project.git
