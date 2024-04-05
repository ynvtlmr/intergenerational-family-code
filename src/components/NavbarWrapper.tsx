import { createClient } from "@/lib/supabase/server";
import NavBar from "./navbar";

export default async function NavbarWrapper() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handler error
  }
  return <NavBar user={data.user} />;
}
