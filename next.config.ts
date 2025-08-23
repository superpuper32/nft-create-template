import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WALLET_PROJECT_ID: process.env.WALLET_PROJECT_ID,
  }
};

export default nextConfig;
