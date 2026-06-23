"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AuctionPriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [range, setRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 10000,
  ]);

  const handleCommit = (values: number | readonly number[]) => {
    if (Array.isArray(values) && values.length >= 2) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("minPrice", values[0].toString());
      params.set("maxPrice", values[1].toString());
      params.set("page", "1");
      router.push(`/auctions?${params.toString()}`);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-background shadow-sm space-y-4 mb-6">
      <div className="flex justify-between text-sm font-medium">
        <span>€{range[0]}</span>
        <span>€{range[1]}</span>
      </div>
      
      <Slider
        value={range}
        max={10000}
        step={100}
        onValueChange={(values) => {
          if (Array.isArray(values)) setRange(values);
        }}
        onValueCommitted={handleCommit}
      />
    </div>
  );
}