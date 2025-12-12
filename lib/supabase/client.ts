import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase pour les composants client (browser)
 * Gère automatiquement les cookies et la session utilisateur
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
