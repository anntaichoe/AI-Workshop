import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ann Tai",
  description: "Ann Tai, lecturer of applied linguistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
