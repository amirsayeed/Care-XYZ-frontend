import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

async function RegisterContent({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <RegisterForm next={next ?? "/"} />;
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Register once, then book care in a few steps."
      footer={
        <>
          Already registered?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
        <RegisterContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}