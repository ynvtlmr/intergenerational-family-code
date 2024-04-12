import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/decision-tree");
  }

  return (
    <main className="flex h-full w-full items-center justify-center">
      <LoginForm />
    </main>
  );
}
