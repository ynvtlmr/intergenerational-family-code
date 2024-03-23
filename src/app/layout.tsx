import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Providers from "@/components/Providers";
import AuthenticatedRoute from "./(auth)/authenticated-route";
import MobileHeader from "@/components/mobile-header";

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
          <MobileHeader />
          <div className="flex">
            <NavBar className="hidden lg:flex" />
            <div className="flex-1">
              <AuthenticatedRoute>{children}</AuthenticatedRoute>
            </div>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
