"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import FileProcess from "@/app/file-process";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/org-chart", label: "Organizational Chart" },
  { href: "/policy-tree", label: "Policy Tree" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/philanthropy", label: "Philanthropy" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <header className="flex h-dvh max-w-xs flex-col items-center justify-center border-r p-10">
      <h1 className="mb-8 min-w-0 text-4xl font-bold">IFC</h1>
      {user && (
        <div className="mb-8 flex flex-col items-center gap-2">
          <span>{user.email}</span>
        </div>
      )}
      <nav className="flex flex-col justify-center gap-2">
        {links.map((link) => (
          <Link key={link.label} className="w-full" href={link.href}>
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
