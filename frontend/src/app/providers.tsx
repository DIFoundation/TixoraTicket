"use client";

import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { somniaTestnet } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { http, createPublicClient, createWalletClient, custom } from "viem"
import { injected, metaMask } from "wagmi/connectors";

// Create a fresh Somnia testnet configuration with unique chain ID to bypass circuit breaker
const freshSomniaTestnet = {
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://somnia-testnet.socialscan.io' },
  },
  testnet: true,
} as const

const config = createConfig({
  chains: [freshSomniaTestnet],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: 'Tixora Ticket',
        url: 'https://tixora.com',
      },
    }),
  ],
  transports: {
    [freshSomniaTestnet.id]: http('https://dream-rpc.somnia.network', {
      timeout: 30000,
      retryCount: 0,
      batch: false,
    }),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          modalSize="compact" 
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
          // showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
