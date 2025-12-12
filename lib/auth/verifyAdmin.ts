import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Vérifie si l'utilisateur est authentifié et a le rôle admin
 * Retourne l'utilisateur si valide, sinon retourne une réponse d'erreur
 */
export async function verifyAdminAuth() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  // Vérifier si l'utilisateur est connecté
  if (error || !user) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
  }

  // Vérifier si l'utilisateur a le rôle admin
  const userRole = user.user_metadata?.role
  if (userRole !== 'admin') {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 403 }
      )
    }
  }

  // Utilisateur valide
  return { user, error: null }
}
