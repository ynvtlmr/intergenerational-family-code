"use client";

import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import NavBar from "./navbar";
import Profile from "./profile";

export default function NavBarSheet({ user }: { user: User | null }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="border-none">
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col print:hidden">
        <div className="flex h-full max-h-dvh flex-col gap-2 pt-2">
          <div className="my-8 flex h-28 flex-col justify-center gap-8">
            <h1 className="min-w-0 text-center text-4xl font-bold">IFC</h1>
            <Profile user={user} />
          </div>
          <div className="mb-3 flex-1 overflow-y-auto">
            <NavBar />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
