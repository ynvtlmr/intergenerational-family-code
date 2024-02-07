import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intergenerational Family Code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <NavBar />
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
