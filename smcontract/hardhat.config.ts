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
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      kairos: API_KEY,
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://kairos-api.kaiascan.io/hardhat-verify",
          browserURL: "https://kairos.kaiascan.io",
        }
      },
    ]
  },
  sourcify: {
    enabled: false,
  },
};

export default config;


// https://kairos.kaiascan.io/
