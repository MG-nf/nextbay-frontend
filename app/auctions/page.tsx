import { Auction, auctionsService } from "@/lib/service/auctionsService";
import { AuctionCard } from "./components/AuctionCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; minPrice?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>

      <div className="flex gap-4 mt-10 items-center justify-center">
        {currentPage > 1 ? (
          <Link href={`/auctions?page=${currentPage - 1}`} className="px-4 py-2 border rounded">
            Previous
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Previous</span>
        )}

        <span className="font-medium">
          Page {currentPage} of {meta.totalPages}
        </span>

        {currentPage < meta.totalPages ? (
          <Link href={`/auctions?page=${currentPage + 1}`} className="px-4 py-2 border rounded">
            Next
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Next</span>
        )}
      </div>
    </main>
  );
}