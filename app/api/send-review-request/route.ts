import { NextResponse } from 'next/server'
import { sendReviewRequestEmail } from '@/lib/emailService'

/**
 * API protégée pour envoyer un email de demande d'avis Google
 * Appelée par la Edge Function Supabase
 */
export async function POST(request: Request) {
  try {
    // Vérifier le token d'authentification interne
    const authHeader = request.headers.get('Authorization')
    const expectedToken = `Bearer ${process.env.INTERNAL_API_SECRET}`

    if (!authHeader || authHeader !== expectedToken) {
      console.error('❌ Tentative d\'accès non autorisée à /api/send-review-request')
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, nom, email, service, date } = body

    // Validation des données
    if (!id || !nom || !email || !service || !date) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Formater la date en français
    const dateObj = new Date(date + 'T00:00:00')
    const dateFormatted = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    // Envoyer l'email de demande d'avis
    await sendReviewRequestEmail({
      nom,
      email,
      service,
      date: dateFormatted,
    })

    console.log(`✅ Email d'avis envoyé à ${nom} (${email})`)

    return NextResponse.json({
      success: true,
      message: 'Email de demande d\'avis envoyé avec succès',
    })
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email d\'avis:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
