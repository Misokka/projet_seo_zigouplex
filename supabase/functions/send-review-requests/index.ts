// Supabase Edge Function - Envoi automatique des demandes d'avis Google
// S'exécute quotidiennement via cron pour envoyer des emails aux clients après leur rendez-vous

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Rendezvous {
  id: string
  nom: string
  email: string
  service: string
  date: string
  heure: string
  statut: string
  review_request_sent: boolean
}

serve(async (req) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialiser le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Date et heure actuelles
    const now = new Date()
    const nowISO = now.toISOString()

    // Calculer la date/heure il y a 2 heures (pour envoyer l'email 2h après le RDV)
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
    const dateLimit = twoHoursAgo.toISOString().split('T')[0] // YYYY-MM-DD

    console.log(`🔍 Recherche des rendez-vous terminés avant ${twoHoursAgo.toISOString()}`)

    // Récupérer les rendez-vous acceptés, passés, sans email d'avis envoyé
    const { data: appointments, error: fetchError } = await supabaseClient
      .from('rendezvous')
      .select('*')
      .eq('statut', 'accepte')
      .eq('review_request_sent', false)
      .lte('date', dateLimit)
      .not('email', 'is', null)

    if (fetchError) {
      console.error('❌ Erreur lors de la récupération des rendez-vous:', fetchError)
      throw fetchError
    }

    if (!appointments || appointments.length === 0) {
      console.log('✅ Aucun rendez-vous à traiter')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Aucun rendez-vous à traiter',
          processed: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    console.log(`📋 ${appointments.length} rendez-vous trouvés`)

    // Filtrer les rendez-vous qui sont passés depuis au moins 2h
    const appointmentsToProcess = appointments.filter((rdv: Rendezvous) => {
      const rdvDateTime = new Date(`${rdv.date}T${rdv.heure}:00`)
      return rdvDateTime <= twoHoursAgo
    })

    console.log(`📧 ${appointmentsToProcess.length} rendez-vous éligibles pour l'envoi d'email`)

    let successCount = 0
    let errorCount = 0

    // Envoyer les emails via l'API Next.js
    for (const rdv of appointmentsToProcess) {
      try {
        // Appeler l'API Next.js pour envoyer l'email
        const siteUrl = Deno.env.get('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000'
        const response = await fetch(`${siteUrl}/api/send-review-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('INTERNAL_API_SECRET')}`, // Clé secrète pour sécuriser l'appel
          },
          body: JSON.stringify({
            id: rdv.id,
            nom: rdv.nom,
            email: rdv.email,
            service: rdv.service,
            date: rdv.date,
          }),
        })

        if (response.ok) {
          // Marquer comme envoyé dans la base de données
          const { error: updateError } = await supabaseClient
            .from('rendezvous')
            .update({
              review_request_sent: true,
              review_request_sent_at: nowISO,
            })
            .eq('id', rdv.id)

          if (updateError) {
            console.error(`⚠️ Erreur lors de la mise à jour du rendez-vous ${rdv.id}:`, updateError)
            errorCount++
          } else {
            console.log(`✅ Email envoyé et marqué pour ${rdv.nom} (${rdv.email})`)
            successCount++
          }
        } else {
          console.error(`❌ Erreur API pour ${rdv.nom}:`, await response.text())
          errorCount++
        }
      } catch (error) {
        console.error(`❌ Erreur lors du traitement de ${rdv.nom}:`, error)
        errorCount++
      }
    }

    console.log(`✅ Traitement terminé: ${successCount} succès, ${errorCount} erreurs`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Traitement terminé`,
        processed: appointmentsToProcess.length,
        sent: successCount,
        errors: errorCount,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('❌ Erreur globale:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
