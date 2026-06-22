const BASE_URL = process.env.DARKBAY_API_URL;

export type AuctionRequest = {
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
  async getAuctions() {
    const auctions = await fetch(`${BASE_URL}/auctions`, {
      next: { revalidate: 60 },
    });
    
    if (!auctions.ok) throw new Error("Failed to fetch auctions");
    return auctions.json();
  },

  async getAuctionById(id: number) {
    const auction = await fetch(`${BASE_URL}/auctions/${id}`);
    if (!auction.ok) throw new Error("Auction not found");
    return auction.json();
  }
};