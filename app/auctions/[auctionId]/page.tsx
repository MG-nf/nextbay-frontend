import { auctionsService, Offer } from "@/lib/service/auctionsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export default async function AuctionDetailPage({
  params,
}: PageProps<"/auctions/[auctionId]">) {
  const { auctionId } = await params;
  const auction = await auctionsService.getAuctionById(Number(auctionId));

  if (!auction) {
    throw Error('auction not found');
  }

  const offers = (auction.offers as Offer[]);

  const sortedOffers = [...offers].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="container mx-auto p-6 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 order-2 md:order-1">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl">{auction.title}</CardTitle>
              <Badge variant={auction.status === 'open' ? 'default' : 'secondary'}>
                {auction.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{auction.description}</p>
            <Separator className="my-6" />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">End Date: </p>
              <p className="font-medium">{formatDate(auction.endDate)}</p>
            </div>
            
            <h3 className="font-semibold mb-4">Offer History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bidder</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOffers?.map((offer: Offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>{offer.buyer.username}</TableCell>
                    <TableCell>€{offer.bidPrice}</TableCell>
                    <TableCell>{formatDate(offer.createdAt)}</TableCell>
                  </TableRow>
                )) ?? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No offers yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="order-1 md:order-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Current price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">€{auction.currentPrice}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}