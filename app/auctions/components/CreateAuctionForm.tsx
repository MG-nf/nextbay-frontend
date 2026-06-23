"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createAuctionAction } from "@/lib/auctionActions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="p-2 bg-blue-600 text-white rounded">
      {pending ? "Creating..." : "Create Auction"}
    </button>
  );
}

export function CreateAuctionForm() {
  const [state, action] = useActionState(createAuctionAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 max-w-md mx-auto p-4">
      {state?.error && <p className="text-red-500">{state.error}</p>}
      
      <input name="title" placeholder="Auction Title" required className="border p-2" />
      <textarea name="description" placeholder="Description" required className="border p-2" />
      <input type="number" name="startingPrice" placeholder="Starting Price" required className="border p-2" />
      
      <SubmitButton />
    </form>
  );
}