import { getAuctionStatus } from "../utils";

const BASE_URL = process.env.DARKBAY_API_URL;

export type Auction = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: Date;
  status: 'open' | 'closed';
  seller: {};
  offers: [];
  createdAt: Date;
};

export type Offer = {
  id: number;
  buyer: Buyer;
  bidPrice: number;
  createdAt: string;
}

export type Buyer = {
  username: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const auctionsService = {
  async getAuctions(params: { page: string; status?: string; minPrice?: string; maxPrice?: string }) {
    const searchParams = new URLSearchParams();

    searchParams.append("status", params.status || "open");
    if (params.page) searchParams.append("page", params.page);
    if (params.minPrice) searchParams.append("minPrice", params.minPrice);
    if (params.maxPrice) searchParams.append("maxPrice", params.maxPrice);

    const res = await fetch(`${BASE_URL}/auctions?${searchParams.toString()}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch auctions");

    const response: PaginatedResponse<Auction> = await res.json();

    return {
      ...response,
      data: response.data.map(auction => ({
        ...auction,
        status: getAuctionStatus(auction.endDate),
      })),
    };
  },

  async getAuctionById(id: number) {
    const auction = await fetch(`${BASE_URL}/auctions/${id}`);
    if (!auction.ok) throw new Error("Auction not found");
    const data: Auction = await auction.json();
    return {
    ...data,
    status: getAuctionStatus(data.endDate),
  };
  }
};