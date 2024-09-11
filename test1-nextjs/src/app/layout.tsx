import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-100`}>
        <Header />
        <div className="text-slate-100 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
