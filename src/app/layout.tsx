import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monteverde',
  description: 'Monteverde — Events, Publishing, Music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Script
          id='blocker-init'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `if(localStorage.getItem('overlayShown')){document.getElementById('initial-blocker').style.display='none';}`,
          }}
        />
        <div
          id='initial-blocker'
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
