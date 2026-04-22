import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoàng Công Trọng — Graduation 2026",
  description:
    "You're invited to celebrate the graduation of Hoàng Công Trọng at Da Nang University of Technology on April 25, 2026.",
  openGraph: {
    title: "Hoàng Công Trọng — Graduation Invitation",
    description: "Join me on my special day. April 25, 2026 · Da Nang, Vietnam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
