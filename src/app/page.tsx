"use client";

import Features from "@/components/sections/Features";
import WalletConnect from "../components/ui/WalletConnect";
import NetworkSwitch from "../components/ui/NetworkSwitch";

export default function Home() {
  return (
    <div className="bg-white py-12 sm:py-12 dark:bg-gray-900">
      <div className="flex justify-end mt-6 px-4 w-full">
        <NetworkSwitch />
        <WalletConnect />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Features />
      </div>
    </div>
  );
}
