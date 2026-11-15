import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-gray-500">That page does not exist.</p>
      <Link href="/" className="mt-4 underline">
        Back to home
      </Link>
    </main>
  );
}
