import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PocketSized",
  description: "Customer Success and software QA services for businesses and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
