"use client";

import Loading from "@/components/loading";
import { useAuth } from "@/components/providers/auth-provider";
import { resendEmailVerification } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const { back } = useRouter();
  const { isAuthenticating, user } = useAuth();
  if (isAuthenticating) {
    return <Loading />;
  }
  if (user && user.emailVerified === true) {
    back();
  }
  return (
    <main className="flex h-full w-full items-center justify-center bg-secondary">
      <div className="rounded-lg border bg-background p-10 text-center">
        <h1 className="mb-2 text-xl font-bold">
          Your account is not verified.
        </h1>
        <p>Please verify your email address to continue.</p>
        <div className="mt-6 flex flex-col gap-2">
          <p className="font-semibold">Having trouble receiving your email? </p>
          <p
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={async () => await resendEmailVerification()}
          >
            Click here to resend the verification email
          </p>
        </div>
      </div>
    </main>
  );
}
