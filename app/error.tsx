"use client";

import { RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="error-screen">
      <span className="eyebrow">A connection issue</span>
      <h1>The portfolio data could not be loaded.</h1>
      <p>Check the Neon connection and try again. No content was silently substituted.</p>
      <button className="button button-dark" onClick={reset}>
        <RefreshCw size={15} /> Try again
      </button>
    </main>
  );
}
