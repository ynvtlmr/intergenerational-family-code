import "./globals.css";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/family-values", label: "Family Values" },
  { href: "/family-code", label: "Family Code" },
  { href: "/family-vision", label: "Family Vision" },
  { href: "/family-tree", label: "Family Tree" },
  { href: "/family-crest", label: "Family Crest" },
  { href: "/family-garden", label: "Family Garden" },
  { href: "/org-chart", label: "Organizational Chart" },
]

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto pt-20 px-2">
      <h1 className="font-bold text-4xl mb-8 text-center">Intergenerational Family Code</h1>
      <div className="flex flex-col gap-2 justify-center max-w-xl mx-auto">
        {
links.map((link) => (
  <Button key={link.label}><Link className="w-full" href={link.href}>{link.label}</Link></Button>
  ))}
      </div>
    </main>
  );
}
