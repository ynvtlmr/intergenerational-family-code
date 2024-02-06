import "./globals.css";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import FileProcess from "./file-process";

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/org-chart", label: "Organizational Chart" },
  { href: "/policy-tree", label: "Policy Tree" },
];

export default async function Home() {
  return (
    <main className="mx-auto max-w-4xl px-2 pt-20">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Intergenerational Family Code
      </h1>
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-2">
        {links.map((link) => (
          <Button key={link.label}>
            <Link className="w-full" href={link.href}>
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
      <FileProcess />
    </main>
  );
}
