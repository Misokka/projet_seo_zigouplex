import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialiser le client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET : Récupérer les disponibilités
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateDebut = searchParams.get('dateDebut')
    const dateFin = searchParams.get('dateFin')
    const disponibleUniquement = searchParams.get('disponibleUniquement') === 'true'

    let query = supabase
      .from('disponibilites')
      .select('*')
      .order('date', { ascending: true })
      .order('heure', { ascending: true })

    // Filtrer par période si spécifié
    if (dateDebut) {
      query = query.gte('date', dateDebut)
    }
    if (dateFin) {
      query = query.lte('date', dateFin)
    }

    // Filtrer uniquement les créneaux disponibles si demandé
    if (disponibleUniquement) {
      query = query.eq('est_disponible', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erreur Supabase GET:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des disponibilités' },
        { status: 500 }
      )
    }

    // Filtrer les créneaux passés (date + heure)
    const now = new Date()
    const futureData = (data || []).filter((dispo) => {
      const dispoDateTime = new Date(`${dispo.date}T${dispo.heure}`)
      return dispoDateTime > now
    })

    return NextResponse.json(futureData)
  } catch (error) {
    console.error('Erreur serveur GET:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST : Ajouter une nouvelle disponibilité
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { date, heure, est_disponible = true } = body

    // Validation des données
    if (!date || !heure) {
      return NextResponse.json(
        { error: 'Date et heure sont obligatoires' },
        { status: 400 }
      )
    }

    // Vérifier si le créneau existe déjà
    const { data: existing } = await supabase
      .from('disponibilites')
      .select('id')
      .eq('date', date)
      .eq('heure', heure)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Ce créneau existe déjà' },
        { status: 409 }
      )
    }

    // Insérer le nouveau créneau
    const { data, error } = await supabase
      .from('disponibilites')
      .insert([{ date, heure, est_disponible }])
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase POST:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'ajout de la disponibilité' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Erreur serveur POST:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE : Supprimer une disponibilité
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID est obligatoire' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('disponibilites')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erreur Supabase DELETE:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la disponibilité' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Disponibilité supprimée avec succès' })
  } catch (error) {
    console.error('Erreur serveur DELETE:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PATCH : Mettre à jour une disponibilité (marquer comme réservée)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, est_disponible } = body

    if (!id || est_disponible === undefined) {
      return NextResponse.json(
        { error: 'ID et est_disponible sont obligatoires' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('disponibilites')
      .update({ est_disponible })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase PATCH:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la disponibilité' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur serveur PATCH:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
