# Tixora Frontend

This is the frontend application for Tixora, a decentralized event ticketing platform built with Next.js 15 and deployed on Somnia blockchain.

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Wagmi v2**: React hooks for Ethereum
- **RainbowKit**: Wallet connection library
- **Viem**: TypeScript interface for Ethereum
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Data fetching and caching

## Getting Started

### Prerequisites
- Node.js v18 or higher
- Web3 wallet (MetaMask recommended)
- STT tokens for Somnia testnet

### Installation

1. **Clone and navigate to frontend**
```bash
cd frontend
npm install
```

2. **Environment Setup**
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open Application**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── create-event/       # Event creation page
│   │   ├── marketplace/        # Event marketplace
│   │   ├── tickets/           # User ticket management
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── providers.tsx      # Web3 providers
│   ├── components/            # React components
│   │   ├── event-card.tsx     # Event display
│   │   ├── ticket-management-system.tsx  # Ticket portfolio
│   │   ├── wallet-connect-button.tsx     # Wallet integration
│   │   └── ui/                # UI components
│   ├── data/                  # Static data
│   └── lib/                   # Utilities
├── public/                    # Static assets
└── package.json              # Dependencies
```

## Key Components

### EventCard Component
**Location**: `src/components/event-card.tsx`

Displays event information with real-time blockchain data:
- Event details (name, date, location, price)
- Live ticket availability
- Registration status checking
- Transaction handling with user feedback
- Error handling and loading states

**Key Features:**
```typescript
// Real-time registration status
const { data: isRegistered } = useReadContract({
  address: eventTicketingAddress,
  abi: eventTicketingAbi,
  functionName: 'isRegistered',
  args: [ticketId, address],
})

// Transaction handling
const { writeContract, isPending } = useWriteContract({
  mutation: {
    onSuccess: (hash) => {
      toast.success(`Registration successful! Hash: ${hash}`)
    }
  }
})
```

### TicketManagementSystem Component
**Location**: `src/components/ticket-management-system.tsx`

Comprehensive ticket portfolio management:
- Display all user-owned ticket NFTs
- Ticket metadata and event details
- QR code generation for event entry
- Ticket transfer functionality
- Transaction history and blockchain verification

**Key Features:**
```typescript
// Fetch user tickets
const { data: userTickets } = useReadContract({
  address: ticketNftAddress,
  abi: ticketNftAbi,
  functionName: 'tokensOfOwner',
  args: [address],
})

// Transfer tickets
const transferTicket = (tokenId: bigint, toAddress: string) => {
  writeContract({
    address: ticketNftAddress,
    abi: ticketNftAbi,
    functionName: 'transferFrom',
    args: [address, toAddress, tokenId],
  })
}
```

### WalletConnectButton Component
**Location**: `src/components/wallet-connect-button.tsx`

Multi-wallet connection with RainbowKit integration:
- Support for MetaMask, WalletConnect, Coinbase Wallet
- Network switching to Somnia testnet
- Balance display and account management
- Custom styling with Tailwind CSS

## Web3 Integration

### Providers Setup
**Location**: `src/app/providers.tsx`

```typescript
const config = getDefaultConfig({
  appName: 'Tixora Ticket',
  projectId: '505bbca624bfefde94e149726255a254',
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http('https://dream-rpc.somnia.network', {
      timeout: 60000,
      retryDelay: 2
    })
  }, 
});
```

### Custom Hooks

#### useEventRegistration
Check if user is registered for specific events:
```typescript
const useEventRegistration = (ticketId: bigint, userAddress: string) => {
  return useReadContract({
    address: eventTicketingAddress,
    abi: eventTicketingAbi,
    functionName: 'isRegistered',
    args: [ticketId, userAddress],
  })
}
```

#### useTransferTicket
Handle ticket transfers between users:
```typescript
const useTransferTicket = () => {
  const { writeContract } = useWriteContract()
  
  return (tokenId: bigint, fromAddress: string, toAddress: string) => {
    writeContract({
      address: ticketNftAddress,
      abi: ticketNftAbi,
      functionName: 'transferFrom',
      args: [fromAddress, toAddress, tokenId],
    })
  }
}
```

## State Management

### Blockchain State
- **Wagmi**: Manages Web3 connections and contract interactions
- **TanStack Query**: Caches blockchain data with automatic refetching
- **Real-time Updates**: 1-second intervals for live data

### UI State
- **React State**: Component-level state management
- **React Context**: Global app state (theme, user preferences)
- **Local Storage**: Persistent user settings

## Styling

### Tailwind CSS Configuration
**Location**: `tailwind.config.ts`

Custom design system with:
- Dark/light mode support
- Custom color palette
- Responsive breakpoints
- Animation utilities

### Component Library
- **Radix UI**: Accessible primitives for complex components
- **Custom Components**: Built on top of Radix with Tailwind styling
- **Responsive Design**: Mobile-first approach

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (if configured)

### Environment Variables

```env
# Required
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional
NEXT_PUBLIC_ENABLE_TESTNETS=true
NEXT_PUBLIC_APP_NAME=Tixora
```

## Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build application
npm run build

# Start production server
npm start
```

## Network Configuration

### Somnia Testnet
- **Chain ID**: 50312
- **RPC URL**: https://dream-rpc.somnia.network
- **Currency**: STT
- **Explorer**: https://shannon-explorer.somnia.network

### Adding to Wallet
Users can add Somnia testnet through the app interface or manually:
```javascript
{
  chainId: '0xC458', // 50312 in hex
  chainName: 'Somnia Testnet',
  nativeCurrency: {
    name: 'STT',
    symbol: 'STT',
    decimals: 18
  },
  rpcUrls: ['https://dream-rpc.somnia.network'],
  blockExplorerUrls: ['https://shannon-explorer.somnia.network']
}
```

## Troubleshooting

### Common Issues

#### Wallet Connection Problems
- Ensure MetaMask is installed and unlocked
- Check network configuration (Chain ID: 50312)
- Verify RPC URL accessibility

#### Transaction Failures
- Confirm sufficient STT balance for gas
- Check contract addresses are correct
- Validate transaction parameters

#### Build Errors
- Clear `.next` directory and rebuild
- Update dependencies to latest versions
- Check TypeScript errors

### Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Use `@next/bundle-analyzer`
- **Caching**: Aggressive caching for blockchain data

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Test thoroughly on Somnia testnet
5. Submit pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Somnia Network Documentation](https://somnia.network/docs)
