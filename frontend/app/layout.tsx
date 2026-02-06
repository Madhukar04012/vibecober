import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "VibeCober - Turn ideas into real, runnable code",
  description: "Join thousands of developers shipping faster with VibeCober AI-powered code generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
