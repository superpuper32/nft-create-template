"use client";

import { useWallet } from "../../hooks/useWallet";

export default function WalletConnect() {
  const { address, isConnected, connect, disconnect, isConnecting } =
    useWallet();

  if (isConnected && address) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            background: "#f3f4f6",
            padding: "8px 12px",
            borderRadius: "6px",
            fontFamily: "monospace",
          }}
        >
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={disconnect}
          style={{
            padding: "8px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      style={{
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        background: isConnecting ? "#9ca3af" : "#6366f1",
        color: "white",
        fontWeight: 600,
        cursor: isConnecting ? "not-allowed" : "pointer",
        fontSize: "16px",
      }}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
