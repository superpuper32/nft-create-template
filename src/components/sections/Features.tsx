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
    const { isConnecting, address } = useAccount();

    if (isConnecting) return "Loading";

    if (address)
    return (
        <div className="mx-auto max-w-2xl">
            <Form />
        </div>
    );

  return (<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
            <Feature key={feature.name} feature={feature} />
        ))}
        </dl>
    </div>
  );
}
