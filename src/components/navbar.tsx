"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

import { User } from "@supabase/supabase-js";
import { signout } from "@/app/(auth)/actions";

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/contacts", label: "Contacts" },
  { href: "/philanthropy", label: "Philanthropy" },
  { href: "/policy-tree", label: "Policy Tree" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/wealth-forest", label: "Wealth Forest" },
  { href: "/asset-allocation", label: "Asset Allocation" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/org-chart", label: "Organizational Chart" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/pdf", label: "Print PDF" },
  { href: "/video", label: "Videos" },
];

export default function NavBar({ user }: { user: User | null }) {
  const pathname = usePathname();
  return (
    <header className="flex h-dvh flex-col items-center justify-center p-10 md:max-w-xs md:border-r print:hidden">
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
      <nav className="flex-grow overflow-hidden overflow-y-auto">
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
    </header>
  );
}
