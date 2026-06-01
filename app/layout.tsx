import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/ui/loading-screen";
import ThemeToggle from "@/components/ui/theme-toggle";

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chittagong Polytechnic Institute | Home",
  description: "Official portal of Chittagong Polytechnic Institute (CPI).",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geist.className} antialiased bg-background text-foreground`}>
        {/* Styled-components provider/theme needs to wrap the loader too */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* THE FIX: LoadingScreen is always here, it handles its own "null" state internally */}
          <LoadingScreen />

          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}