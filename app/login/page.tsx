import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <LoginForm
      next={next ?? "/"}
      initialError={error === "google" ? "Google sign-in failed. Please try again." : undefined}
    />
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your bookings."
      footer={
        <>
          New to Care.xyz?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
        <LoginContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}