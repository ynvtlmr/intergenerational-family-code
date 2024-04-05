"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import FileProcess from "@/app/file-process";
import { usePathname } from "next/navigation";

import { User } from "@supabase/supabase-js";
import { signout } from "@/app/(auth)/actions";

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

export default function NavBar({ user }: { user: User | null }) {
  const pathname = usePathname();
  return (
    <header className="flex h-dvh max-w-xs flex-col items-center justify-center border-r p-10 print:hidden">
      <h1 className="mb-8 min-w-0 text-4xl font-bold">IFC</h1>
      {user ? (
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
      <nav className="flex flex-col justify-center gap-2">
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
