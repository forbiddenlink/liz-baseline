"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            The error has been reported. You can retry the page now.
          </p>
          <button
            className="mt-6 rounded border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => reset()}
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
