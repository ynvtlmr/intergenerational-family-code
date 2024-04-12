import { createClient } from "@/lib/supabase/server";
import NavBar from "./navbar";
import Profile from "./profile";
import { Separator } from "./ui/separator";

export default async function NavbarWrapper() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handle error
  }

  return (
    <div className="flex h-full max-h-dvh flex-col gap-2 pt-2 print:hidden">
      <div className="mt-10 flex h-32 flex-col justify-center gap-12 px-4 md:px-2 lg:px-4">
        <h1 className="min-w-0 text-center text-4xl font-bold">IFC</h1>
        <Profile user={data.user} />
      </div>
      <Separator className="mx-auto mb-4 mt-8 w-[90%]" />
      <div className="mb-3 flex-1 overflow-y-auto">
        <NavBar />
      </div>
    </div>
  );
}
