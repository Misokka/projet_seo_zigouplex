'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Autenticación con Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError('Correo electrónico o contraseña incorrectos')
        setLoading(false)
        return
      }

      // Verificar que el usuario tenga el rol de administrador
      const userRole = data.user?.user_metadata?.role
      if (userRole !== 'admin') {
        await supabase.auth.signOut()
        setError('Acceso no autorizado')
        setLoading(false)
        return
      }

      const redirectTo = searchParams.get('redirect') || '/admin/rendezvous'
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      setError('Ocurrió un error durante la conexión')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-brand font-normal text-dark mb-2">
            Salón Patricia Osores
          </h1>
          <p className="text-gray-600">Área de Administración</p>
        </div>

        {/* Tarjeta de inicio de sesión */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <h2 className="text-2xl font-semibold text-dark mb-6 text-center">
            Iniciar sesión
          </h2>

          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
              <div className="flex items-center space-x-2">
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="paty10j@hotmail.com"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-[#a68b36] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Información de seguridad */}
          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <p>
                Conexión segura. Su información está protegida con cifrado de nivel bancario.
              </p>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 Salón Patricia Osores. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
