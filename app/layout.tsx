import type React from "react";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import SideNav from "@/components/sidenav";
import { auth } from "@/auth";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Полей меня!",
  description: "Планирование полива цветов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          {session && (
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
          )}
          <div className={`flex-grow md:overflow-y-auto ${session ? 'p-5' : ''}`}>{children}</div>
        </div>
      </body>
    </html>
  );
}
