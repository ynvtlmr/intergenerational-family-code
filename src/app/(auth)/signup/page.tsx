import { createClient } from "@/lib/supabase/server";
import SignupForm from "./signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/decision-tree");
  }

  return (
    <main className="flex h-full w-full items-center justify-center">
      <SignupForm />
    </main>
  );
}
