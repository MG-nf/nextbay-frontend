const BASE_URL = process.env.DARKBAY_API_URL;

export type Auction = {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: Date;
  seller: {};
  offers: [];
  createdAt: Date;
};

export const auctionsService = {
  async getAuctions(params: { page: string; status?: string; minPrice?: string; maxPrice?: string }) {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page);
    if (params.status) searchParams.append("status", params.status);
    if (params.minPrice) searchParams.append("minPrice", params.minPrice);
    if (params.maxPrice) searchParams.append("minPrice", params.maxPrice);

    const res = await fetch(`${BASE_URL}/auctions?${searchParams.toString()}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch auctions");
    return res.json();
  },

  async getAuctionById(id: number) {
    const auction = await fetch(`${BASE_URL}/auctions/${id}`);
    if (!auction.ok) throw new Error("Auction not found");
    return auction.json();
  }
};