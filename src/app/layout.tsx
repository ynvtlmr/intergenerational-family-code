import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Providers from "@/components/Providers";

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
        <Providers>
          <div className="flex">
            <NavBar />
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
