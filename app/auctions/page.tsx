import { auctionsService } from "@/lib/service/auctionsService";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { AuctionRequest } from "@/lib/service/auctionsService";

export default async function AuctionsPage() {
    const auctionData = await auctionsService.getAuctions();
    const auctions: AuctionRequest[] = auctionData.data;

    return (
        auctions.map((auction) => (
          <Card  key={auction.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/auctions/${auction.id}`}>
                  {auction.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>{auction.description}</CardContent>
          </Card>
        ))
    );
}