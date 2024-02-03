import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header/index'
import Footer from '@/components/layout/footer/index'

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
    <html lang="pl-PL" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0" />
        <meta name='description' content={String(metadata.description)}></meta>
        <link rel="icon" href="./favicon.ico" />
        <title>{String(metadata.title)}</title>
      </head>
      <body className="flex flex-col h-full">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
