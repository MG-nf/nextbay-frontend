import { Auction, auctionsService } from "@/lib/service/auctionsService";
import { AuctionCard } from "./components/AuctionCard";
import { redirect } from "next/navigation";
import { Pagination } from "./components/Pagination";
import { AuctionFilterBar } from "./components/AuctionFilterBar";

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; minPrice?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const status = params.status || 'open';

  const { data, meta } = await auctionsService.getAuctions({
    page: currentPage.toString(),
    status: params.status,
    minPrice: params.minPrice,
  });

  if (currentPage > meta.totalPages && meta.totalPages > 0) {
    redirect(`/auctions?page=${meta.totalPages}`);
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Auctions</h1>
      <AuctionFilterBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>

      <Pagination 
        totalPages={meta.totalPages} 
        currentPage={currentPage} 
      />
    </main>
  );
}