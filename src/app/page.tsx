import LandingOverlay from '@/components/layout/landingOverlay'

export default function Home() {
  return (
    <main>
      <div suppressHydrationWarning>
        <LandingOverlay />
      </div>
      {/* rest of page content */}
    </main>
  )
}
