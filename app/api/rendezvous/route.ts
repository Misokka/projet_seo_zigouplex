import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'
import { sendEmailToPatricia, sendConfirmationToClient } from '../../../lib/emailService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, telephone, email, service, date, heure, message } = body

    // Validation des champs obligatoires
    if (!nom || !service || !date || !heure) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, téléphone, service, date et heure sont obligatoires' },
        { status: 400 }
      )
    }

    // Marquer le créneau comme non disponible
    const { error: updateError } = await supabase
      .from('disponibilites')
      .update({ est_disponible: false })
      .eq('date', date)
      .eq('heure', heure)

    if (updateError) {
      console.error('Erreur lors de la mise à jour de la disponibilité :', updateError)
      // On continue malgré l'erreur car le créneau peut ne pas exister dans la table
    }

    // Insertion dans Supabase
    const { data, error } = await supabase
      .from('rendezvous')
      .insert([
        {
          nom,
          telephone: telephone || null,
          email: email || null,
          service,
          date,
          heure,
          message: message || null,
          statut: 'en_attente',
        },
      ])
      .select()

    if (error) {
      console.error('Erreur Supabase :', error)
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'enregistrement dans la base de données" },
        { status: 500 }
      )
    }

    // Envoi des emails
    try {
      await sendEmailToPatricia({ nom, telephone, email, service, date, heure, message })
      await sendConfirmationToClient({ nom, telephone, email, service, date, heure, message })
    } catch (emailError) {
      console.error("Erreur lors de l'envoi des emails :", emailError)
      // On ne retourne pas d'erreur car l'enregistrement a réussi
      return NextResponse.json({
        success: true,
        message: "Demande enregistrée mais l'envoi d'email a échoué",
        data: data[0],
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Demande enregistrée et emails envoyés',
      data: data[0],
    })
  } catch (error) {
    console.error('Erreur API :', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}
