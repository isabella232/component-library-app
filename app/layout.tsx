import "./globals.css";
import type { Metadata } from "next";
import { CategoryProvider } from "@/contexts/Category";

export const metadata: Metadata = {
  title: "Quickflow",
  description: "Quickly add React components to your Webflow project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg bg-webflow-gray flex flex-col items-center justify-center">
        <CategoryProvider>{children}</CategoryProvider>
      </body>
    </html>
  );
}
