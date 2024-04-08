import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavBar from "./navbar";
import { createClient } from "@/lib/supabase/server";

export default async function MobileSidebar() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handle error
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <NavBar user={data.user} />
      </SheetContent>
    </Sheet>
  );
}
