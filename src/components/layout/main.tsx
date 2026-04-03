'use client'

import { useHeaderOffset } from '@/hooks/useHeaderOffset'

export default function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useHeaderOffset()

  return <main ref={mainRef}>{children}</main>
}
