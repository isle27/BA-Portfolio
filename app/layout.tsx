import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hana Chanyalew — Business Analytics",
  description:
    "Business analytics portfolio exploring data storytelling, forecasting, customer insights, and business intelligence.",
  openGraph: {
    title: "Hana Chanyalew — Business Analytics",
    description:
      "Turning complex data into clear, confident business decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
