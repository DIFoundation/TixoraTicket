# Tixora Smart Contracts

This directory contains the smart contracts for the Tixora decentralized event ticketing platform, built on Solidity 0.8.28 and deployed on Somnia testnet.

## Contract Overview

### Core Contracts

#### EventTicketing.sol
The main contract handling all ticketing logic including:
- Event creation and management
- Ticket registration and payments
- Revenue distribution and fee handling
- Event cancellation with automatic refunds
- Access control and security measures

**Key Features:**
- Gas-optimized batch refund processing
- ReentrancyGuard protection
- Dynamic fee calculation
- Event lifecycle management
- Comprehensive error handling

#### TicketNft.sol
ERC-721 NFT contract for ticket tokens:
- Mints unique NFT tickets for each registration
- Handles ticket metadata and URI management
- Supports ticket transfers between users
- Integrates with main EventTicketing contract

#### EventTicketingLib.sol
Shared library containing utility functions:
- Fee calculations and transfers
- Amount validations
- Gas-optimized helper functions
- Reusable contract logic

## Deployed Addresses

**Somnia Testnet:**
- **EventTicketing**: `0x594465a37a938Eb33C9F99F5c3F69915Bf5142bA`
- **TicketNft**: `0xF708183DA2f773c213F93A3220eC5922fd73C720`
- **TicketResaleMarket**: `0x1573Cbbe7fcdeFe94Bbda4854Cac622C02b983EF`

**Block Explorer:**
- [EventTicketing Contract](https://shannon-explorer.somnia.network/address/0x594465a37a938Eb33C9F99F5c3F69915Bf5142bA#code)
- [TicketNft Contract](https://shannon-explorer.somnia.network/address/0xF708183DA2f773c213F93A3220eC5922fd73C720#code)
- [TicketResaleMarket Contract](https://shannon-explorer.somnia.network/address/0x1573Cbbe7fcdeFe94Bbda4854Cac622C02b983EF#code)

## Development Setup

### Prerequisites
- Node.js v18 or higher
- Hardhat development environment
- Somnia testnet RPC access

### Installation
```bash
cd smcontract
npm install
```

### Environment Configuration
Create a `.env` file with:
```env
PRIVATE_KEY_2=your_private_key_here
ETHERSCAN_API_KEY=your_api_key_here
```

### Compilation
```bash
npx hardhat compile
```

### Testing
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/EventTicketing.ts

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### Deployment
```bash
# Deploy to Somnia testnet
npx hardhat ignition deploy ./ignition/modules/Deploy.ts --network somnia_testnet

# Verify contracts
npx hardhat verify --network somnia_testnet <CONTRACT_ADDRESS>
```

## Contract Architecture

### EventTicketing Contract Functions

#### Event Management
```solidity
function createTicket(
    uint256 price,
    string calldata eventName,
    string calldata description,
    uint256 eventTimestamp,
    uint256 maxSupply,
    string calldata metadata,
    string calldata location
) external returns (uint256 newId)

function updateTicket(
    uint256 ticketId,
    uint256 newPrice,
    string calldata newLocation,
    uint256 newEventTimestamp
) external

function cancelTicket(uint256 ticketId) external nonReentrant
```

#### Registration & Payments
```solidity
function register(uint256 ticketId) 
    external payable nonReentrant 
    returns (uint256 nftTokenId)

function withdrawProceeds(uint256 ticketId) external nonReentrant
```

#### View Functions
```solidity
function getRecentTickets() external view returns (Ticket[] memory)
function isRegistered(uint256 ticketId, address user) external view returns (bool)
function getTicket(uint256 ticketId) external view returns (Ticket memory)
```

### Events
```solidity
event TicketCreated(
    uint256 indexed ticketId,
    address indexed creator,
    uint256 price,
    string eventName,
    string description,
    uint256 eventTimestamp,
    uint256 maxSupply
);

event Registered(
    uint256 indexed ticketId, 
    address indexed registrant, 
    uint256 nftTokenId
);

event TicketUpdated(
    uint256 indexed ticketId, 
    uint256 newPrice, 
    uint256 newTimestamp, 
    string newLocation
);

event TicketCanceled(
    uint256 indexed ticketId, 
    address indexed canceledBy
);

event ProceedsWithdrawn(
    uint256 indexed ticketId, 
    address indexed creator, 
    uint256 creatorAmount, 
    uint256 feeAmount
);
```

## Security Features

### Access Control
- Owner-only administrative functions
- Creator-only event management functions
- User-specific registration validation

### Reentrancy Protection
- ReentrancyGuard on all payable functions
- Checks-Effects-Interactions pattern
- State updates before external calls

### Input Validation
- Comprehensive parameter checking
- Custom error messages
- Boundary condition handling

### Gas Optimization
- Batch processing for refunds
- Efficient storage patterns
- Minimal external calls

## Testing

The test suite covers:
- Event creation and management
- Ticket registration and payments
- Revenue distribution
- Event cancellation and refunds
- Access control and security
- Edge cases and error conditions

### Test Files
- `test/EventTicketing.ts` - Main contract functionality
- `test/DebugEventTicketing.ts` - Debug and edge cases

### Running Tests
```bash
# All tests
npx hardhat test

# With coverage
npx hardhat coverage

# With gas reporting
REPORT_GAS=true npx hardhat test
```

## Network Configuration

### Somnia Testnet
```javascript
somnia_testnet: {
  url: "https://dream-rpc.somnia.network",
  chainId: 50312,
  accounts: [process.env.PRIVATE_KEY_2],
  timeout: 60000,
  gasPrice: "auto"
}
```

## Troubleshooting

### Common Issues

#### Deployment Failures
- Ensure sufficient STT balance for gas
- Verify network configuration
- Check private key format

#### Transaction Reverts
- Validate input parameters
- Check contract state requirements
- Ensure proper access permissions

#### Gas Estimation Errors
- Increase gas limit in hardhat config
- Check for infinite loops or heavy computations
- Verify external contract interactions

### Error Messages
- `EventNotFound`: Invalid ticket ID provided
- `AlreadyRegistered`: User already registered for event
- `SoldOut`: Event has reached maximum capacity
- `EventClosed`: Registration period has ended
- `InvalidPaymentAmount`: Incorrect payment sent
- `Unauthorized`: Caller lacks required permissions
