import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Auction } from "@/lib/service/auctionsService";

export function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/auctions/${auction.id}`} className="hover:underline">
            {auction.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{auction.description}</p>
        <p className="mt-2 font-semibold">Current price: €{auction.currentPrice}</p>
      </CardContent>
    </Card>
  );
}