import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import MobileHeader from "@/components/mobile-header";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intergenerational Family Code",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MobileHeader />
          <div className="grid min-h-dvh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block">
              <NavbarWrapper />
            </div>
            <div className="flex flex-col">
              <header className="fixed pl-3 pt-3 md:p-0">
                <p className="hidden">Nav Sheet</p>
              </header>
              <main className="max-h-dvh overflow-y-auto">{children}</main>
            </div>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
