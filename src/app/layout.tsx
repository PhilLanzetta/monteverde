import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import './globals.css'
import localFont from 'next/font/local'

const bodoni = localFont({
  src: [
    {
      path: '../../public/fonts/bodoni-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/bodoni-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-bodoni',
})

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
    <html lang='en' className={bodoni.variable} suppressHydrationWarning>
      <head>
        <link
          rel='preload'
          href='/PACIFIC_MONTEVERDE_BG_IMAGE-01.webp'
          as='image'
        />
      </head>
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
