import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";

export const metadata: Metadata = {
  title: config.meta.blogTitle,
  description: config.meta.blogDescription,
  other: {
    "google-site-verification": config.tokens.googleSearchConsole,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ko">
      <body className="mx-auto max-w-lg px-4 pb-16 pt-10 sm:pb-32 sm:pt-20">
        <Header blogTitle={config.meta.blogTitle} navLinks={config.navLinks} />
        <main className="mb-16 mt-12">{children}</main>
        <Footer year={currentYear} blogTitle={config.meta.blogTitle} />
      </body>
    </html>
  );
}
