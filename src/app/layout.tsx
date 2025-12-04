import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import Navbar from "@/components/layout/Navbar";
import { NavigationProgress } from "@/components/navigation-progress";
import { AppSidebarClient } from "@/components/layout/AppSidebarClient";
import { loadSidebarData } from "../data/sidebardata";
import { Suspense } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await loadSidebarData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <LayoutProvider>

              <AppSidebarClient data={data} />

              <main className="w-full">

                {/* FIX: NavigationProgress must be wrapped in Suspense */}
                <Suspense fallback={null}>
                  <NavigationProgress />
                </Suspense>

                <Navbar />

                <div className="px-4">{children}</div>
              </main>

            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
