# Tixora - DeFi Event Ticketing Platform

Tixora is a decentralized event ticketing platform built on KAIA Network that revolutionizes the events industry through DeFi mechanisms. The platform provide instant ticket transactions, fraud-proof NFT tickets, and real-time revenue distribution.

## Key Features

- NFT-Based Tickets: Each ticket is a unique ERC-721 token ensuring authenticity
- Instant Settlements: Real-time revenue distribution using kaia's speed
- Zero Fraud Risk: Blockchain-verified ticket authenticity
- P2P Transfers: Secure ticket transfers between users
- Dynamic Pricing: Smart contract-based pricing adjustments
- Cross-Platform Integration: Metaverse-ready ticket system

## Architecture

The platform consists of three main components:

### Smart Contracts
Core ticketing logic built with Solidity 0.8.28:
- EventTicketing.sol: Main ticketing contract with DeFi mechanisms
- TicketNft.sol: ERC-721 NFT implementation for tickets
- EventTicketingLib.sol: Shared utilities and gas optimizations

**[View Smart Contract Documentation](./smcontract/README.md)** for detailed technical information, deployment guides, and API reference.

### Frontend Application
Modern web application built with Next.js 15:
- TypeScript for type safety
- Wagmi v2 for Web3 React hooks
- RainbowKit for multi-wallet connection
- Tailwind CSS for responsive design

**[View Frontend Documentation](./frontend/README.md)** for setup instructions, component details, and development guide.

### Blockchain Network
- Network: KAIA Kairos Testnet (Chain ID: 1001)
- Performance: 1M+ TPS with sub-second finality
- Compatibility: Full EVM compatibility
- Token: KAIA (native token)

## Contract Addresses

- EventTicketing: `0x6815e76CE475451D42363f4b55533720f19Ebada`
- TicketNft: `0xF708183DA2f773c213F93A3220eC5922fd73C720`
- Explorer: [Kaia Blockchain Explorer](https://kairos.kaiascan.io/)

## Usage

### For Event Attendees
1. Connect your Web3 wallet to the platform
2. Browse available events in the marketplace
3. Purchase tickets with KAIA Kairos tokens
4. Manage your ticket NFTs in your portfolio
5. Transfer tickets to other users if needed

### For Event Organizers
1. Connect wallet and create new events
2. Set event details, pricing, and capacity
3. Monitor ticket sales in real-time
4. Withdraw proceeds after event completion
5. Cancel events with automatic refunds if needed

## Demo

- Live Application: [View Demo](https://tixora-demo.vercel.app)
- Smart Contracts: Deployed on Somnia Testnet
- Block Explorer: [Shannon Explorer](https://shannon-explorer.somnia.network)

## Hackathon Submission

This project was built for the Kaia Wave Stablecoin Summer Hackathon and demonstrates:

- DeFi Innovation: Novel financial primitives for event ticketing
- Technical Excellence: Production-ready smart contracts with advanced security
- User Experience: Seamless Web3 integration with modern UI
- Market Impact: Addresses real-world problems in the $68B ticketing industry

### Submission Categories
- Primary: DeFi Innovation
- Secondary: NFT Utilities, Web3 UX

## License

This project is licensed under the MIT License.

## Contributing

We welcome contributions!

## Team

**Deborah Olaboye** - Full-Stack Blockchain Developer
- GitHub: [@DeborahOlaboye](https://github.com/DeborahOlaboye)

**Ibrahim Adewale Adeniran** - Full-Stack Blockchain Developer  
- GitHub: [@DIFoundation](https://github.com/DIFoundation)

## Support

For support and questions:
- GitHub Issues: Create an issue for bug reports or feature requests
- Community: Join our Discord server (link coming soon)
