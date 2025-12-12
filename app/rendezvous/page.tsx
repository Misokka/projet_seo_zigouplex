'use client'

import { useRouter } from 'next/navigation'
import { services, horaires } from '../../data/services'

export default function ServicesPage() {
  const router = useRouter()

  const handleSelectService = (name: string, duration: string, price: string) => {
    // Stocker le service sélectionné dans localStorage
    const serviceSelectionne = { name, duration, price }
    localStorage.setItem('serviceSelectionne', JSON.stringify(serviceSelectionne))
    
    // Rediriger vers l'étape 2 (choix date/heure)
    router.push('/rendezvous/date')
  }

  return (
    <main className="bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-brand font-normal mb-2 text-dark">
            Réserver en ligne chez Salon Patricia Osores
          </h1>
          <p className="text-gray-600">
            24h/24 - Gratuitement - Paiement sur place - Confirmation immédiate
          </p>
        </div>

        {/* Layout deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Services */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-dark mb-4">
              Choix de la prestation
            </h2>

            {services.map((category) => (
              <div
                key={category.category}
                className="bg-white rounded-lg shadow-md p-6"
              >
                {/* Titre de la catégorie */}
                <h3 className="text-xl font-semibold text-dark mb-4 pb-2 border-b border-gray-200">
                  {category.category}
                </h3>

                {/* Liste des prestations */}
                <div className="space-y-3">
                  {category.prestations.map((prestation) => (
                    <div
                      key={prestation.name}
                      className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
                    >
                      {/* Info prestation */}
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-dark mb-1">
                          {prestation.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {prestation.duration} · {prestation.price}
                        </p>
                      </div>

                      {/* Bouton Choisir */}
                      <button
                        onClick={() => handleSelectService(prestation.name, prestation.duration, prestation.price)}
                        className="bg-dark text-white px-6 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium"
                      >
                        Choisir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Colonne latérale - Horaires */}
          <div className="lg:col-span-1 pt-14">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-dark mb-4">
                Horaires d'ouverture
              </h3>

              <div className="space-y-3">
                {horaires.map((horaire) => (
                  <div
                    key={horaire.jour}
                    className="flex justify-between items-center py-2"
                  >
                    <span
                      className={`text-sm font-medium ${
                        horaire.heures === 'Fermé'
                          ? 'text-gray-400'
                          : 'text-dark'
                      }`}
                    >
                      {horaire.jour}
                    </span>
                    <span
                      className={`text-sm ${
                        horaire.heures === 'Fermé'
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}
                    >
                      {horaire.heures}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
