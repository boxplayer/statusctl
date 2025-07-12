"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard failed:", error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <p className="mb-2 text-sm font-medium text-destructive">
        Can’t load the dashboard right now.
      </p>
      <button onClick={() => reset()} className="text-xs underline">
        Retry
      </button>
    </div>
  );
}
