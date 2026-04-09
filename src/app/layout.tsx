import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import './globals.css'
import localFont from 'next/font/local'
import { Courier_Prime } from 'next/font/google'
import { getHomePage } from '@/lib/home'
import type { Asset } from 'contentful'

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-courier-prime',
})

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
  icons: {
    icon: '/MONTEVERDE_FAVICON.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const homePage = await getHomePage()
  const audioAsset = homePage?.fields.audioFile as unknown as Asset
  const audioUrl = audioAsset?.fields?.file?.url
    ? `https:${audioAsset.fields.file.url}`
    : null
  const audioCaption = homePage?.fields.audioCaption as string | undefined

  return (
    <html
      lang='en'
      className={`${bodoni.variable} ${courierPrime.variable}`}
      suppressHydrationWarning
    >
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
            __html: `
      var shown = sessionStorage.getItem('overlayShown');
      var isHome = window.location.pathname === '/';
      if (shown || !isHome) {
        var b = document.getElementById('initial-blocker');
        if (b) b.style.display = 'none';
      }
    `,
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
        <Header audioUrl={audioUrl} audioCaption={audioCaption} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
