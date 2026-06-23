"use server";

import { fetchAPI } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAuctionAction(prevState: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    startingPrice: Number(formData.get("startingPrice")),
  };

  const res = await fetchAPI("/auctions", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to create auction." }));
    return { error: errorData.message };
  }

  revalidatePath("/auctions");
  redirect("/auctions");
}

export async function placeOfferAction(auctionId: string, prevState: any, formData: FormData) {
  const bidPrice = Number(formData.get("bidPrice"));

  const res = await fetchAPI(`/auctions/${auctionId}/offers`, {
    method: "POST",
    body: JSON.stringify({ bidPrice }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Failed to place offer." }));
    return { error: errorData.message };
  }

  revalidatePath(`/auctions/${auctionId}`);
  return { success: true };
}