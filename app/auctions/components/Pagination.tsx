"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function Pagination({ 
  totalPages, 
  currentPage 
}: { 
  totalPages: number; 
  currentPage: number; 
}) {
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/auctions?${params.toString()}`;
  };

  return (
    <div className="flex gap-4 mt-10 items-center justify-center">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} className="px-4 py-2 border rounded hover:bg-gray-100">
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-400 cursor-not-allowed border rounded bg-gray-50">
          Previous
        </span>
      )}

      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} className="px-4 py-2 border rounded hover:bg-gray-100">
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-400 cursor-not-allowed border rounded bg-gray-50">
          Next
        </span>
      )}
    </div>
  );
}