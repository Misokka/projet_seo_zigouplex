'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface Disponibilite {
  id: string
  date: string
  heure: string
  est_disponible: boolean
}

interface ServiceSelectionne {
  name: string
  duration: string
  price: string
}

export default function ChoixDateHeurePage() {
  const router = useRouter()
  const [serviceSelectionne, setServiceSelectionne] = useState<ServiceSelectionne | null>(null)
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([])
  const [creneauSelectionne, setCreneauSelectionne] = useState<{ date: string; heure: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [jours, setJours] = useState<string[]>([])

  // Générer les 7 prochains jours
  useEffect(() => {
    const genererJours = () => {
      const joursArray: string[] = []
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        joursArray.push(date.toISOString().split('T')[0])
      }
      setJours(joursArray)
    }
    genererJours()
  }, [])

  // Récupérer le service sélectionné depuis localStorage
  useEffect(() => {
    const serviceStocke = localStorage.getItem('serviceSelectionne')
    if (serviceStocke) {
      setServiceSelectionne(JSON.parse(serviceStocke))
    } else {
      // Si pas de service sélectionné, rediriger vers la page de sélection
      router.push('/rendezvous')
    }
  }, [router])

  // Récupérer les disponibilités depuis l'API
  useEffect(() => {
    const fetchDisponibilites = async () => {
      if (jours.length === 0) return

      try {
        setLoading(true)
        const dateDebut = jours[0]
        const dateFin = jours[jours.length - 1]
        
        const response = await axios.get(
          `/api/disponibilites?dateDebut=${dateDebut}&dateFin=${dateFin}&disponibleUniquement=true`
        )
        setDisponibilites(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des disponibilités:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDisponibilites()
  }, [jours])

  // Formater la date en français
  const formaterDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    }
    return date.toLocaleDateString('fr-FR', options)
  }

  // Obtenir les créneaux pour une date donnée
  const getCreneauxPourDate = (date: string) => {
    return disponibilites.filter((dispo) => dispo.date === date)
  }

  // Gérer la sélection d'un créneau
  const handleSelectCreneau = (date: string, heure: string) => {
    setCreneauSelectionne({ date, heure })
    
    // Stocker dans localStorage pour l'étape suivante
    localStorage.setItem('creneauSelectionne', JSON.stringify({ date, heure }))
  }

  // Continuer vers l'étape suivante (formulaire final)
  const handleContinuer = () => {
    if (!creneauSelectionne) {
      alert('Veuillez sélectionner un créneau')
      return
    }
    // TODO: Rediriger vers la page de confirmation/formulaire final
    router.push('/rendezvous/confirmation')
  }

  if (!serviceSelectionne) {
    return null // Ou un loader
  }

  return (
    <main className="bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête avec étape */}
        <div className="mb-8">
          <h1 className="text-4xl font-brand font-normal mb-2 text-dark">
            Réserver en ligne chez Salon Patricia Osores
          </h1>
          <p className="text-gray-600">
            Étape 2 sur 3 - Choix de la date et de l'heure
          </p>
        </div>

        {/* Layout */}
        <div className="space-y-6">
          {/* Card 1 : Prestation sélectionnée */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary font-semibold mb-1">
                  1. Prestation sélectionnée
                </p>
                <h3 className="text-lg font-semibold text-dark mb-1">
                  {serviceSelectionne.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {serviceSelectionne.duration} · {serviceSelectionne.price}
                </p>
              </div>
              <button
                onClick={() => router.push('/rendezvous')}
                className="text-primary hover:underline text-sm font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Card 2 : Choix de la date & heure */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-dark mb-6">
              2. Choix de la date & heure
            </h3>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Chargement des disponibilités...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Calendrier horizontal */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {jours.map((jour) => {
                      const creneaux = getCreneauxPourDate(jour)
                      const [jourSemaine, reste] = formaterDate(jour).split(' ')
                      
                      return (
                        <div
                          key={jour}
                          className="flex-shrink-0 w-32"
                        >
                          {/* En-tête du jour */}
                          <div className="text-center mb-3 pb-2 border-b border-gray-200">
                            <p className="text-xs text-gray-500 capitalize">
                              {jourSemaine}
                            </p>
                            <p className="text-sm font-semibold text-dark">
                              {reste}
                            </p>
                          </div>

                          {/* Créneaux horaires */}
                          <div className="space-y-2">
                            {creneaux.length > 0 ? (
                              creneaux.map((creneau) => (
                                <button
                                  key={creneau.id}
                                  onClick={() => handleSelectCreneau(jour, creneau.heure)}
                                  className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                    creneauSelectionne?.date === jour &&
                                    creneauSelectionne?.heure === creneau.heure
                                      ? 'bg-primary text-white'
                                      : 'bg-gray-100 text-dark hover:bg-gray-200'
                                  }`}
                                >
                                  {creneau.heure.substring(0, 5)}
                                </button>
                              ))
                            ) : (
                              <p className="text-xs text-gray-400 text-center py-4">
                                Aucun créneau
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bouton Continuer */}
                {creneauSelectionne && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Créneau sélectionné :
                        </p>
                        <p className="text-base font-semibold text-dark">
                          {formaterDate(creneauSelectionne.date)} à{' '}
                          {creneauSelectionne.heure.substring(0, 5)}
                        </p>
                      </div>
                      <button
                        onClick={handleContinuer}
                        className="bg-dark text-white px-8 py-3 rounded-md hover:bg-accent transition-colors font-medium"
                      >
                        Continuer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
