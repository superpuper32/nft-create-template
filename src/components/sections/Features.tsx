'use client';
import {
  CodeBracketSquareIcon,
  CloudArrowUpIcon,
  CircleStackIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import { Feature } from "@/components/ui/Feature";
import Form from "./Form";

const features = [
  {
    name: "Crypto wallet",
    description: "Connect your crypto wallet to deploy your NFT",
    icon: WalletIcon,
  },
  {
    name: "Contract deployment",
    description: "Address NFT-contract on the blockchain with Ethers.js",
    icon: CodeBracketSquareIcon,
  },
  {
    name: "Deploy to blockchain",
    description: "Blcokchain deployment with Hardhat and Ethers.js",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Decentralized storage",
    description: "Dowload on IPFS with NFT.Storage or Pinata",
    icon: CircleStackIcon,
  },
];

export default function Features() {
    const { isConnecting, isConnected } = useAccount();

    if (isConnecting) return "Loading";

    if (isConnected) {
      return (
        <>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              Your NFT awaits
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
              Fill out the form below to get started with your NFT creation and
              deployment.
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Form />
          </div>
        </>
      );
    }

  return (
    <>
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
          Deploy faster
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
          Everything you need to create your nft
        </p>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          Create and Deploy NFTs Using ERC-721 and OpenZeppelin. Basic steps
          to create an NFT with an image.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
            <Feature key={feature.name} feature={feature} />
        ))}
        </dl>
      </div>
    </>
  );
}
