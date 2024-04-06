"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import FileProcess from "@/app/file-process";
import { usePathname } from "next/navigation";

<<<<<<< HEAD
import { User } from "@supabase/supabase-js";
import { signout } from "@/app/(auth)/actions";
=======
import { useAuth } from "./providers/auth-provider";
import { Loader2 } from "lucide-react";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";
>>>>>>> df5dac427df444b58792de279b8f3ed96d97a2d8

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/contacts", label: "Contacts" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/org-chart", label: "Organizational Chart" },
  { href: "/policy-tree", label: "Policy Tree" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/philanthropy", label: "Philanthropy" },
  { href: "/video", label: "Videos" },
  { href: "/pdf", label: "Print PDF" },
];

<<<<<<< HEAD
export default function NavBar({ user }: { user: User | null }) {
=======
type NavBarProps = {
  className?: string;
};

export default function NavBar({ className }: NavBarProps) {
>>>>>>> df5dac427df444b58792de279b8f3ed96d97a2d8
  const pathname = usePathname();
  return (
<<<<<<< HEAD
    <header className="flex h-dvh max-w-xs flex-col items-center justify-center border-r p-10 print:hidden">
      <h1 className="mb-8 min-w-0 text-4xl font-bold">IFC</h1>
      {user ? (
=======
    <header
      className={cn(
        "flex max-h-screen max-w-xs flex-col items-center border-r p-5 md:overflow-y-auto md:p-10 md:pb-16 lg:overflow-y-hidden print:hidden",
        className
      )}
    >
      <h1 className="mb-5 min-w-0 text-4xl font-bold md:mb-8">IFC</h1>
      {isAuthenticating ? (
        <div className="flex gap-2 py-6 text-sm">
          <Loader2 className="animate-spin" />
          <span>Loading...</span>
        </div>
      ) : user ? (
>>>>>>> df5dac427df444b58792de279b8f3ed96d97a2d8
        <div className="flex flex-col items-center gap-2">
          <span>{user.email}</span>
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={async () => await signout()}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <Link className="w-full cursor-pointer" href="/login">
            <Button variant="secondary" className="w-full">
              Login
            </Button>
          </Link>
          <Link className="w-full cursor-pointer" href="/signup">
            <Button variant="secondary" className="w-full">
              Signup
            </Button>
          </Link>
        </div>
      )}
      <Separator className="my-4" />
      <nav className="flex-grow overflow-hidden">
        {links.map((link) => (
          <Link
            key={link.label}
            className="w-full cursor-pointer"
            href={link.href}
          >
            <Button
              variant={pathname === link.href ? "default" : "ghost"}
              className="w-full"
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </nav>
      <Separator className="my-4" />
      <FileProcess />
    </header>
  );
}
