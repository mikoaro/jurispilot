import type React from "react"
import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/utils/constants"
import Banner from "@/components/banner"
import ConsoleHeader from "@/components/console-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectSpacesProvider } from "@/contexts/ProjectSpacesContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProjectSpacesProvider>
          <div className="flex flex-col min-h-screen">
            <Banner />
            <ConsoleHeader />
            <SidebarProvider>
              <div className="flex flex-1">
                <AppSidebar className="" />
                <main className="flex-1">{children}</main>
              </div>
            </SidebarProvider>
          </div>
        </ProjectSpacesProvider>
      </body>
    </html>
  )
}

