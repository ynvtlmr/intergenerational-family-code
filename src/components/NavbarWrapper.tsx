import { createClient } from "@/lib/supabase/server";
import NavBar from "./navbar";

export default async function NavbarWrapper() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handle error
  }
  return (
    <div className="hidden md:flex">
      <NavBar user={data.user} />
    </div>
  );
}
