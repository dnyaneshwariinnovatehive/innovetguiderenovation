import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-primary text-white px-8 py-3 font-semibold text-sm no-underline transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-medium"
      >
        Back to Home
      </Link>
    </div>
  );
}
