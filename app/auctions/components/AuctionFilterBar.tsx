import { AuctionStatusFilter } from "./AuctionStatusFilter";
import { AuctionPriceFilter } from "./AuctionPriceFilter";

export function AuctionFilterBar() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg bg-white shadow-sm mb-10">
      <div className="flex-1">
        <AuctionStatusFilter />
      </div>
      <div className="flex-[2]">
        <AuctionPriceFilter />
      </div>
    </div>
  );
}