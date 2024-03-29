import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/header/index'
import Footer from '@/components/layout/footer/index'
import { UserContextProvider } from '@/context/userContext'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'CheetahBooking',
  description: 'It is a modern very innovative booking website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="pl-PL" className="h-full" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0" />
        <meta name='description' content={String(metadata.description)}></meta>
        <link rel="icon" href="./favicon.ico" />
        <title>{String(metadata.title)}</title>
      </head>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <UserContextProvider>
          <Header />
          {children}
          <Footer />
        </UserContextProvider>  
      </body>
    </html>
  )
}
