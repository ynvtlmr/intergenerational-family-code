"use client";

import { resendEmailVerification } from "@/lib/auth";

export default function VerifyEmailPage() {
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
