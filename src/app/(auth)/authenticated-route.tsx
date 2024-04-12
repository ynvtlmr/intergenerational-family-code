import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

export default async function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
