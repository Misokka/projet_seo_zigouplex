import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes')
}

// Client Supabase basique (pour les opérations sans auth)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client Supabase pour le navigateur avec gestion de session
export function createClientComponentClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
