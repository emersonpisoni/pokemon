import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreWrapper } from "./store/store-wrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon App",
};

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../mocks");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreWrapper>
          <main className="flex min-h-screen font-mono flex-col items-center justify-start bg-gradient-to-br from-sky-500 via-purple-500 to-orange-500 animate-bg-animate">
            <h1 className="shadow-xl bg-purple-800/15 rounded-3xl flex justify-center p-6 m-6 text-5xl font-mono font-bold text-white z-10">{`<PokEmerson 🐣/>`}</h1>
            {children}
          </main>
        </StoreWrapper>
      </body>
    </html>
  );
}
