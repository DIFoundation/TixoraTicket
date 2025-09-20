// // Contract addresses and ABIs for Tixora platform
// export const ticketNftAddress = "0x9f2595C4fC87903F940c1eb7503507EF78a07E72" as `0x${string}`;
// export const eventTicketingAddress = "0xdE254352681d843375895186a88DAF82B2930C7b" as `0x${string}`;
// export const resaleMarketAddress = "0x124c6F40571dFc3F2A03c17d2C502BB59F75dff6" as `0x${string}`;

// Type definitions for contract data
export interface Ticket {
  id: bigint;
  creator: string;
  price: bigint;
  eventName: string;
  description: string;
  eventTimestamp: bigint;
  location: string;
  closed: boolean;
  canceled: boolean;
  metadata: string;
  maxSupply: bigint;
  sold: bigint;
  totalCollected: bigint;
  totalRefunded: bigint;
  proceedsWithdrawn: boolean;
}

export interface NFTTicket {
  tokenId: bigint;
  ticketId: bigint;
  eventName: string;
  description: string;
  eventTimestamp: bigint;
  location: string;
  owner: string;
}

export const ticketNftAbi = [] as const;
export const resaleMarketAbi = [] as const;
