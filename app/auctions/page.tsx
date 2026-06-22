import { auctionsService } from "@/lib/service/auctionsService";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Auction } from "@/lib/service/auctionsService";

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; minPrice?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const auctionData = await auctionsService.getAuctions({
    page: currentPage.toString(),
    status: params.status,
    minPrice: params.minPrice,
  });

  if (currentPage > auctionData.meta.totalPages && auctionData.meta.totalPages > 0) {
    redirect(`/auctions?page=${auctionData.meta.totalPages}`);
  }

  return (
    <div>
      {auctionData.data.map((auction: Auction) => (
        <Card key={auction.id}>
            <CardHeader>
              <CardTitle>{auction.title}</CardTitle>
            </CardHeader>
           <CardContent>{auction.description}</CardContent>
        </Card>
      ))}

      <div className="flex gap-4 mt-8 items-center">
        {currentPage > 1 ? (
          <Link href={`/auctions?page=${currentPage - 1}`} className="px-4 py-2 border rounded">
            Previous
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Previous</span>
        )}

        <span>Page {currentPage} of {auctionData.meta.totalPages}</span>

        {currentPage < auctionData.meta.totalPages ? (
          <Link href={`/auctions?page=${currentPage + 1}`} className="px-4 py-2 border rounded">
            Next
          </Link>
        ) : (
          <span className="px-4 py-2 text-gray-400 cursor-not-allowed">Next</span>
        )}
      </div>
    </div>
  );
}