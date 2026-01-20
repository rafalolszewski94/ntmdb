import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RouterCacheProvider } from "@/components/RouterCacheProvider";
import { Suspense } from "react";
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <RouterCacheProvider>
              {children}
            </RouterCacheProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
