import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Short URL",
  description: "Stand out with short links",
};

import { Providers } from "./Providers";
import { NavbarComponent } from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarComponent />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
