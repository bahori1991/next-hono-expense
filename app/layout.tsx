import type { Metadata } from "next";
import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TanstackProvider from "@/components/providers/TanstackProvider";

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "Expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark min-h-screen">
      <body>
        <TanstackProvider>
          {children}
          <ReactQueryDevtools />
        </TanstackProvider>
      </body>
    </html>
  );
}
