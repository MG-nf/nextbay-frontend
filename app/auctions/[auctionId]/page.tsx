import { auctionsService } from "@/lib/service/auctionsService";

export default async function AuctionDetailPage({
  params,
}: PageProps<"/auctions/[auctionId]">) {
  const { auctionId } = await params;
  const auction = await auctionsService.getAuctionById(Number(auctionId));

  if (!auction) {
    throw Error('auction not found');
  }

  return (
    <div>
      <h1>Auction #{auctionId}</h1>
      <p>
        {auction.description}
      </p>
      <p>Current price: €{auction.currentPrice}</p>
    </div>
  );
}