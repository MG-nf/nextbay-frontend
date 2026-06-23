import { CreateAuctionForm } from "../components/CreateAuctionForm";

export default function CreateAuctionPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Auction</h1>
      
      <div className="bg-background p-6 rounded-lg shadow-sm border">
        <CreateAuctionForm />
      </div>
    </main>
  );
}