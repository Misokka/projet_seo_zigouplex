'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main className="min-h-screen">{children}</main>
    </>
  )
}
