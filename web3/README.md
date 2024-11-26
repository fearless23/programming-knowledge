## Concepts

- Wallet: Software or hardware tool containing your private-keys 
  - private-key is will be used to sign transactions etc
  - Wallet will hold assets like ETH, tokens, NFTs
Wallet Address: public-key of the account for public view or sharing

ETH Address or any other address is just public-key

1. ETH:
- Definition: Ether (ETH) is the native cryptocurrency of the Ethereum blockchain.
- Purpose: Used for transactions, paying gas fees, and interacting with smart contracts.
- Example: 0x1234abcd...

2. Tokens:
- Definition: Digital assets created on a blockchain using smart contracts, typically using standards like ERC-20 (fungible tokens).
- Purpose: Can represent various assets, such as stablecoins, utility tokens, or governance tokens.
- Example: USDT, DAI, or any token based on ERC-20.

3. NFT (Non-Fungible Token):
- Definition: A unique digital asset that represents ownership of a specific item, often using the ERC-721 or ERC-1155 standards.
- Purpose: Represents unique items like art, collectibles, or in-game assets.
- Example: Digital artwork, collectibles on OpenSea.

4. Smart Contract:
- Definition: A self-executing contract with the terms of the agreement directly written into code, deployed on a blockchain.
- Purpose: Automates the creation, transfer, and management of tokens, NFTs, and other decentralized activities.
- Example: A contract that creates and manages an NFT collection.

5. Token ID:
- Definition: A unique identifier for a specific NFT.
- Purpose: Used to differentiate one NFT from another in a collection.
- Example: 12345 for a specific artwork in a collection.

6. Contract Address:
- Definition: The address of a deployed smart contract on the blockchain.
- Purpose: Points to the location of a smart contract, allowing interaction with it (e.g., minting, transferring tokens or NFTs).
- Example: 0x9876abcdef... (the address where an NFT collection's smart contract is deployed).

## Smart Contract on other blockchains
- BTC i.e bitcoin do not support smart contracts natively
- SOL(Solana), ADA (Cardano), Polkadot, EOS, Tron crypto-currencies do support smart contracts

## NFT on other blockchains
- Other blockchain do allow NFT but ETH blockchain is widely used and majorly supported by famous platforms for NFT


## Within a contract
1. Contract details
2. Holders
  - List of accountAddress which holds some NFT or tokens
  - Example: accountAddress, quantity-of-tokens
3. Transfers
  - List of transfers of NFT or tokens from one accountAddress to another