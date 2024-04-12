import { createClient } from "@/lib/supabase/server";

import NavBarSheet from "./nav-bar-sheet";

export default async function NavBarSheetWrapper() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handle error
  }

  return <NavBarSheet user={data.user} />;
}
