"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AuctionStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "open";
  const isChecked = currentStatus === "closed";

  const toggleStatus = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("status", checked ? "closed" : "open");
    params.set("page", "1");
    
    router.replace(`/auctions?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 p-4 border-b">
      <Switch 
        id="status-toggle"
        checked={isChecked}
        onCheckedChange={toggleStatus}
      />
      <Label htmlFor="status-toggle">
        {isChecked ? "Showing closed auctions" : "Showing open auctions"}
      </Label>
    </div>
  );
}