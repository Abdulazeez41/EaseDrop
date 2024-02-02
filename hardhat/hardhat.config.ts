// @ts-nocheck

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
//const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },

  defaultNetwork: "hardhat",
  networks: {
    // for mainnet
    "lightlink-mainnet": {
      url: "https://replicator.phoenix.lightlink.io/rpc/v1",
      accounts: [PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    "lightlink-testnet": {
      url: "https://replicator.pegasus.lightlink.io/rpc/v1",
      accounts: [PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for local dev environment
    "base-local": {
      url: "http://localhost:8545",
      accounts: [PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },

  etherscan: {
    customChains: [
      {
        network: "pegasus",
        chainId: 1891,
        urls: {
          apiURL: "https://pegasus.lightlink.io/api",
          browserURL: "https://pegasus.lightlink.io",
        },
      },
      {
        network: "devnet",
        chainId: 88,
        urls: {
          apiURL: "https://devnet.lightlink.io/api",
          browserURL: "https://devnet.lightlink.io",
        },
      },
    ],
  },
};

export default config;
