import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'
import { verifyAdminAuth } from '../../../../lib/auth/verifyAdmin'

export async function GET() {
  // Vérifier l'authentification admin
  const { user, error: authError } = await verifyAdminAuth()
  if (authError) return authError

  try {
    const today = new Date().toISOString().split('T')[0]
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // 1. Récupérer le prochain rendez-vous
    const { data: prochainRdv, error: rdvError } = await supabase
      .from('rendezvous')
      .select('*')
      .eq('statut', 'en_attente')
      .gte('date', today)
      .order('date', { ascending: true })
      .order('heure', { ascending: true })
      .limit(1)
      .single()

    // 2. Compter les rendez-vous en attente
    const { count: rdvEnAttente, error: countError } = await supabase
      .from('rendezvous')
      .select('*', { count: 'exact', head: true })
      .eq('statut', 'en_attente')

    // 3. Compter les disponibilités libres cette semaine
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const nextWeekStr = nextWeek.toISOString().split('T')[0]

    const { count: disponibilitesLibres, error: dispoError } = await supabase
      .from('disponibilites')
      .select('*', { count: 'exact', head: true })
      .eq('est_disponible', true)
      .gte('date', today)
      .lte('date', nextWeekStr)

    // 4. Compter les rendez-vous confirmés à venir
    const { count: rdvAVenir, error: rdvAVenirError } = await supabase
      .from('rendezvous')
      .select('*', { count: 'exact', head: true })
      .in('statut', ['en_attente', 'accepte'])
      .gte('date', today)

    // 5. Récupérer les statistiques du mois en cours
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0]
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0]

    const { count: rdvCeMois, error: rdvMoisError } = await supabase
      .from('rendezvous')
      .select('*', { count: 'exact', head: true })
      .gte('date', firstDayOfMonth)
      .lte('date', lastDayOfMonth)

    if (rdvError && rdvError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, c'est ok
      console.error('Erreur lors de la récupération du prochain RDV:', rdvError)
    }

    return NextResponse.json({
      success: true,
      data: {
        prochainRendezvous: prochainRdv || null,
        statistiques: {
          rendezvousEnAttente: rdvEnAttente || 0,
          disponibilitesLibresSemaine: disponibilitesLibres || 0,
          rendezvousAVenir: rdvAVenir || 0,
          rendezvousCeMois: rdvCeMois || 0,
        },
      },
    })
  } catch (error) {
    console.error('Erreur API dashboard:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des données du tableau de bord',
      },
      { status: 500 }
    )
  }
}
