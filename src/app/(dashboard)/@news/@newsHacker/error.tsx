"use client";

import { useEffect } from "react";

export default function ArchNewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Hacker News failed:", error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <p className="mb-2 text-sm font-medium text-destructive">
        Can’t fetch hacker news right now.
      </p>
      <button onClick={() => reset()} className="text-xs underline">
        Retry
      </button>
    </div>
  );
}
