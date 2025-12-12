import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'
import { sendAcceptanceEmail, sendRejectionEmail } from '../../../../lib/emailService'
import { verifyAdminAuth } from '../../../../lib/auth/verifyAdmin'
// 🔒 Fonctionnalité Google Agenda temporairement désactivée pour le premier déploiement
// import { createCalendarEvent } from '../../../../lib/googleCalendarService'

/**
 * GET - Récupère tous les rendez-vous triés par date de création
 */
export async function GET() {
  // Vérifier l'authentification admin
  const { user, error: authError } = await verifyAdminAuth()
  if (authError) return authError

  try {
    const { data, error } = await supabase
      .from('rendezvous')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase GET :', error)
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la récupération des rendez-vous' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('Erreur API GET :', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

/**
 * PATCH - Met à jour le statut d'un rendez-vous et envoie un email au client
 */
export async function PATCH(request: Request) {
  // Vérifier l'authentification admin
  const { user, error: authError } = await verifyAdminAuth()
  if (authError) return authError

  try {
    const body = await request.json()
    const { id, statut } = body

    // Validation
    if (!id || !statut) {
      return NextResponse.json(
        { success: false, error: 'Les champs id et statut sont obligatoires' },
        { status: 400 }
      )
    }

    if (!['en_attente', 'accepte', 'refuse'].includes(statut)) {
      return NextResponse.json(
        { success: false, error: 'Statut invalide. Valeurs acceptées : en_attente, accepte, refuse' },
        { status: 400 }
      )
    }

    // Récupérer les informations du rendez-vous avant mise à jour
    const { data: rdvData, error: fetchError } = await supabase
      .from('rendezvous')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !rdvData) {
      console.error('Erreur lors de la récupération du rendez-vous :', fetchError)
      return NextResponse.json(
        { success: false, error: 'Rendez-vous introuvable' },
        { status: 404 }
      )
    }

    // Mise à jour du statut dans Supabase
    const { data, error } = await supabase
      .from('rendezvous')
      .update({ statut })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase PATCH :', error)
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la mise à jour du statut' },
        { status: 500 }
      )
    }

    // Envoi d'email selon le statut
    try {
      if (statut === 'accepte' && rdvData.email) {
        await sendAcceptanceEmail({
          nom: rdvData.nom,
          email: rdvData.email,
          service: rdvData.service,
          date: rdvData.date,
          heure: rdvData.heure,
        })

        // 🔒 Fonctionnalité Google Agenda temporairement désactivée pour le premier déploiement
        // Synchronisation avec Google Calendar
        // try {
        //   await createCalendarEvent({
        //     nom: rdvData.nom,
        //     service: rdvData.service,
        //     date: rdvData.date,
        //     heure: rdvData.heure,
        //     message: rdvData.message,
        //     email: rdvData.email,
        //     telephone: rdvData.telephone,
        //   })
        //   console.log('✅ Événement ajouté au Google Calendar de Patricia')
        // } catch (calendarError) {
        //   console.error('⚠️ Erreur Google Calendar (non-bloquant):', calendarError)
        //   // On continue même si Calendar échoue
        // }
      } else if (statut === 'refuse' && rdvData.email) {
        await sendRejectionEmail({
          nom: rdvData.nom,
          email: rdvData.email,
        })
      }
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email :', emailError)
      // On continue même si l'email échoue
      return NextResponse.json({
        success: true,
        message: 'Statut mis à jour mais l\'envoi d\'email a échoué',
        data,
      })
    }

    // Message de succès selon le statut
    let message = 'Rendez-vous mis à jour';
    if (statut === 'accepte') {
      message = 'Rendez-vous accepté';
    } else if (statut === 'refuse') {
      message = 'Rendez-vous refusé';
    }

    return NextResponse.json({
      success: true,
      message,
      data,
    })
  } catch (error) {
    console.error('Erreur API PATCH :', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}
