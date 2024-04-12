"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

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

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start px-2 text-sm font-medium md:mt-5 lg:mt-1 lg:px-4">
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
  );
}
