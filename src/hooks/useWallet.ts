'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

export function useWallet() {
    const { address, isConnected, chain } = useAccount();
    const { connect, connectors, status: connectStatus } = useConnect();
    const { disconnect } = useDisconnect();
    const { switchChain } = useSwitchChain();

    const connectWallet = () => {
        const injectedConnector = connectors.find(c => c.id === 'injected');
        if (injectedConnector) {
            connect({ connector: injectedConnector });
        }
    };

    const switchNetwork = (chainId: number) => {
        switchChain({ chainId });
    };

    return {
        address,
        isConnected,
        chain,
        connect: connectWallet,
        disconnect,
        switchNetwork,
        isConnecting: connectStatus === 'pending',
    };
}