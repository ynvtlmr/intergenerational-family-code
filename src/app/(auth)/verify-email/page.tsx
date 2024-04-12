import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }
  if (data.user?.email_confirmed_at) {
    redirect("/decision-tree");
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
          <p className="cursor-pointer text-blue-500 hover:underline">
            Click here to resend the verification email
          </p>
        </div>
      </div>
    </main>
  );
}
