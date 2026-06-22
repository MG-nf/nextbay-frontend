"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AuctionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isChecked = searchParams.get("status") === "closed";

  const toggleStatus = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (checked) {
      params.set("status", "closed");
    } else {
      params.delete("status");
    }
    
    params.set("page", "1");
    router.push(`/auctions?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 p-4 border-b">
      <Switch 
        id="status-toggle"
        checked={isChecked}
        onCheckedChange={toggleStatus}
      />
      <Label htmlFor="status-toggle">Show closed auctions</Label>
    </div>
  );
}