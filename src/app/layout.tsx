import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Main from '@/components/layout/main'
import LandingOverlay from '@/components/layout/landingOverlay'
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
    <html lang='en'>
      <body>
        <Script
          id='overlay-check'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(){if(localStorage.getItem('overlayShown')){document.documentElement.dataset.overlayDone='true';}else{document.documentElement.style.visibility='hidden';}})()`,
          }}
        />
        <Header />
        <LandingOverlay />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}
