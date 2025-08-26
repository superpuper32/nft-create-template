import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WALLET_PROJECT_ID: process.env.WALLET_PROJECT_ID,
    SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL,
    MAINNET_RPC_URL: process.env.MAINNET_RPC_URL,
  }
};

export default nextConfig;
