import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Mettre à jour la session Supabase
  const { supabase, response } = await updateSession(request)

  // Vérifier si l'utilisateur accède à une route admin
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage) {
    // Vérifier l'authentification pour toutes les routes admin sauf login
    const { data: { user }, error } = await supabase.auth.getUser()

    // Si pas d'utilisateur ou erreur, rediriger vers login
    if (error || !user) {
      const redirectUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Vérifier que l'utilisateur a le rôle admin
    const userRole = user.user_metadata?.role
    if (userRole !== 'admin') {
      // Si l'utilisateur n'est pas admin, rediriger vers la page d'accueil
      const redirectUrl = new URL('/', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (isLoginPage) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user && user.user_metadata?.role === 'admin') {
      // Rediriger vers le tableau de bord si déjà connecté
      const redirectUrl = new URL('/admin', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

// Configuration du matcher pour cibler les routes à protéger
export const config = {
  matcher: [
    // Protéger toutes les routes admin
    '/admin/:path*',
    // Protéger les routes API admin
    '/api/admin/:path*',
  ],
}
