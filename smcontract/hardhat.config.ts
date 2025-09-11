import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import { vars } from "hardhat/config";

const PRIVATE_KEY = vars.get("PRIVATE_KEY_2");
const API_KEY = vars.get("ETHERSCAN_API_KEY"); // from etherscan

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // <--- This enables the Yul Intermediate Representation
    },
  },
  networks: {
    celo_sepolia: {
      url: "https://rpc.ankr.com/celo_sepolia",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      "celo-sepolia": API_KEY,
    },
    customChains: [
      {
        network: "celo-sepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://celo-sepolia.blockscout.com/api",
          browserURL: "https://celo-sepolia.blockscout.com"
        }
      }
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
