'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface ServiceSelectionne {
  name: string
  duration: string
  price: string
}

interface CreneauSelectionne {
  date: string
  heure: string
}

export default function ConfirmationPage() {
  const router = useRouter()
  
  // États pour les données précédentes
  const [serviceSelectionne, setServiceSelectionne] = useState<ServiceSelectionne | null>(null)
  const [creneauSelectionne, setCreneauSelectionne] = useState<CreneauSelectionne | null>(null)
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    message: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les données depuis localStorage
  useEffect(() => {
    const service = localStorage.getItem('serviceSelectionne')
    const creneau = localStorage.getItem('creneauSelectionne')
    
    if (service) {
      setServiceSelectionne(JSON.parse(service))
    } else {
      router.push('/rendezvous')
      return
    }
    
    if (creneau) {
      setCreneauSelectionne(JSON.parse(creneau))
    } else {
      router.push('/rendezvous/date')
      return
    }
  }, [router])

  // Gérer les changements du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Formater la date en français
  const formaterDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }
    return date.toLocaleDateString('fr-FR', options)
  }

  // Soumettre la réservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!serviceSelectionne || !creneauSelectionne) {
      setError('Informations manquantes. Veuillez recommencer.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Envoyer la demande de rendez-vous
      const response = await axios.post('/api/rendezvous', {
        nom: formData.nom,
        telephone: formData.telephone,
        email: formData.email,
        service: serviceSelectionne.name,
        date: creneauSelectionne.date,
        heure: creneauSelectionne.heure,
        message: formData.message,
      })

      if (response.data.success) {
        setSuccess(true)
        
        // Nettoyer le localStorage
        localStorage.removeItem('serviceSelectionne')
        localStorage.removeItem('creneauSelectionne')
        
      } else {
        setError(response.data.error || 'Une erreur est survenue')
      }
    } catch (err: any) {
      console.error('Erreur lors de la soumission:', err)
      setError(err.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  // Modifier le service
  const handleModifierService = () => {
    router.push('/rendezvous')
  }

  // Modifier le créneau
  const handleModifierCreneau = () => {
    router.push('/rendezvous/date')
  }

  if (!serviceSelectionne || !creneauSelectionne) {
    return null // Ou un loader
  }

  // Page de succès
if (success) {
  return (
    <main className="bg-light min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-brand text-dark mb-2">
              Réservation confirmée !
            </h1>
            <p className="text-gray-600">
              Votre demande de rendez-vous a bien été enregistrée.
            </p>
          </div>

          <div className="bg-light rounded-lg p-6 mb-6 text-left">
            <h3 className="text-lg font-semibold text-dark mb-4">
              Récapitulatif de votre rendez-vous
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service :</span>
                <span className="font-medium text-dark">{serviceSelectionne.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durée :</span>
                <span className="font-medium text-dark">{serviceSelectionne.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prix :</span>
                <span className="font-medium text-dark">{serviceSelectionne.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date :</span>
                <span className="font-medium text-dark capitalize">
                  {formaterDate(creneauSelectionne.date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heure :</span>
                <span className="font-medium text-dark">
                  {creneauSelectionne.heure.substring(0, 5)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Vous recevrez une confirmation par email à l'adresse{' '}
              <strong>{formData.email}</strong>
            </p>
          </div>

          {/* ✅ Supprimé la phrase de redirection */}
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-white px-8 py-3 rounded-md hover:bg-[#a68b36] transition-colors font-medium"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </main>
  )
}


  // Formulaire de confirmation
  return (
    <main className="bg-light min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-brand font-normal mb-2 text-dark">
            Confirmer votre rendez-vous
          </h1>
          <p className="text-gray-600">
            Étape 3 sur 3 - Vos coordonnées
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Récapitulatif de la réservation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-dark mb-4">
              Récapitulatif de votre réservation
            </h2>

            <div className="space-y-4">
              {/* Service */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prestation</p>
                  <h3 className="text-base font-semibold text-dark">
                    {serviceSelectionne.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {serviceSelectionne.duration} · {serviceSelectionne.price}
                  </p>
                </div>
                <button
                  onClick={handleModifierService}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Modifier
                </button>
              </div>

              {/* Date et heure */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date et heure</p>
                  <h3 className="text-base font-semibold text-dark capitalize">
                    {formaterDate(creneauSelectionne.date)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    à {creneauSelectionne.heure.substring(0, 5)}
                  </p>
                </div>
                <button
                  onClick={handleModifierCreneau}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-dark mb-6">
              Vos coordonnées
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Téléphone */}
                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={(e) => {
                      // N'autorise que les chiffres
                      const numericValue = e.target.value.replace(/\D/g, '')
                      setFormData({ ...formData, telephone: numericValue })
                    }}
                    placeholder="ex : 0498123456"
                    inputMode="numeric"        // affiche un pavé numérique sur mobile
                    pattern="[0-9]*"           // n’autorise que les chiffres
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@exemple.com"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Message optionnel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Informations complémentaires..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dark text-white py-4 rounded-md hover:bg-accent transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi en cours...' : 'Confirmer la réservation'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                En confirmant, vous acceptez que vos données soient utilisées pour traiter votre demande de rendez-vous.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
