"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { placeOfferAction } from "@/lib/auctionActions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending} 
      className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
    >
      {pending ? "Submitting..." : "Place Offer"}
    </button>
  );
}

export function OfferForm({ auctionId }: { auctionId: string }) {
  const boundAction = placeOfferAction.bind(null, auctionId);
  const [state, action] = useActionState(boundAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-2">
      {state?.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
      
      <div className="flex gap-2">
        <input 
          type="number" 
          name="bidPrice" 
          placeholder="Offer amount" 
          required 
          className="border p-2 rounded-md flex-grow" 
        />
        <SubmitButton />
      </div>
    </form>
  );
}