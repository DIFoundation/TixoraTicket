"use client";

import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { kairos } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { http } from "viem";
import { Toaster } from "sonner";

const config = getDefaultConfig({
    appName: 'Tixora Ticket',
    projectId: '505bbca624bfefde94e149726255a254',
    chains: [kairos],
    transports: {
      [kairos.id]: http('https://public-en-kairos.node.kaia.io', {
        timeout: 60000,
        retryDelay: 2
      })
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
          <Toaster position="top-right" richColors />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
