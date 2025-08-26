"use client";

import { useWallet } from "../../hooks/useWallet";
import { sepolia, mainnet } from "wagmi/chains";

export default function NetworkSwitch() {
  const { chain, switchNetwork } = useWallet();

  if (!chain) return null;

  const networks = [sepolia, mainnet];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "14px" }}>Network:</span>
      <select
        value={chain.id}
        onChange={(e) => switchNetwork(Number(e.target.value))}
        style={{
          padding: "6px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          background: "white",
        }}
      >
        {networks.map((network) => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </select>
    </div>
  );
}
