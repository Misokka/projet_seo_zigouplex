'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaChartLine, FaCalendarAlt, FaClipboardList, FaHome, FaSignOutAlt } from 'react-icons/fa'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Fermer le menu quand la route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const navigation = [
  {
    name: 'Panel de control',
    href: '/admin',
    icon: FaChartLine,
    active: pathname === '/admin',
  },
  {
    name: 'Disponibilidades',
    href: '/admin/disponibilites',
    icon: FaCalendarAlt,
    active: pathname === '/admin/disponibilites',
  },
  {
    name: 'Citas',
    href: '/admin/rendezvous',
    icon: FaClipboardList,
    active: pathname === '/admin/rendezvous',
  },
]


  const handleLogout = async () => {
  if (loggingOut) return
  
  setLoggingOut(true)
  try {
    const supabase = createClient()
    await supabase.auth.signOut()
    
    // Attends un petit délai avant la redirection
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    router.push('/admin/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    alert('Erreur lors de la déconnexion')
  } finally {
    // ✅ Toujours remettre loggingOut à false pour éviter le spinner bloqué
    setLoggingOut(false)
  }
}

  // ✅ Déplacement ici pour que les hooks soient déjà tous appelés
  const isLoginPage = pathname === '/admin/login'
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header móvil con menú hamburguesa */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <div>
              <h2 className="text-base font-brand font-semibold text-dark">
                Espacio Patricia
              </h2>
              <p className="text-xs text-gray-500">Administración</p>
            </div>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <FaTimes className="text-xl text-dark" />
            ) : (
              <FaBars className="text-xl text-dark" />
            )}
          </button>
        </div>
      </header>

      {/* Menú móvil en pantalla completa */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Barra superior interna */}
        <div className="flex items-center justify-between h-[73px] px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <div>
              <h2 className="text-base font-brand font-semibold text-dark">Espacio Patricia</h2>
              <p className="text-xs text-gray-500">Administración</p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-xl text-dark" />
          </button>
        </div>

        {/* Contenido del menú */}
        <nav className="h-[calc(100vh-73px)] overflow-y-auto px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-colors touch-manipulation text-lg ${
                  item.active ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}

          <div className="flex-1" />

          <Link
            href="/"
            className="flex items-center space-x-4 px-5 py-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors touch-manipulation text-lg"
          >
            <FaHome className="text-xl" />
            <span className="font-medium">Volver al sitio</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center space-x-4 px-5 py-4 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-lg"
          >
            {loggingOut ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span className="font-medium">Cerrando sesión...</span>
              </>
            ) : (
              <>
                <FaSignOutAlt className="text-xl" />
                <span className="font-medium">Cerrar sesión</span>
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Overlay (cerrar al hacer clic fuera) */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-20 top-[73px]"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Layout escritorio con barra lateral */}
      <div className="hidden lg:flex min-h-screen">
        {/* Barra lateral */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Encabezado */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div>
                <h2 className="text-lg font-brand font-semibold text-dark">
                  Espacio Patricia
                </h2>
                <p className="text-xs text-gray-500">Administración</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Pie de página */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-2"
            >
              <FaHome />
              <span className="font-medium">Volver al sitio</span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="font-medium">Cerrando sesión...</span>
                </>
              ) : (
                <>
                  <FaSignOutAlt />
                  <span className="font-medium">Cerrar sesión</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Contenido principal escritorio */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Contenido principal móvil */}
      <main className="lg:hidden">
        {children}
      </main>
    </div>
  )
}
