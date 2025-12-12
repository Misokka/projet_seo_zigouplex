'use client'
import { useState } from 'react'
import axios from 'axios'

export default function RendezVous() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    service: '',
    date: '',
    heure: '',
    message: '',
  })

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rendezvous`, formData)
      setSuccess(true)
      setFormData({
        nom: '',
        telephone: '',
        email: '',
        service: '',
        date: '',
        heure: '',
        message: '',
      })
    } catch (error) {
      console.error('Erreur lors de la réservation :', error)
      alert("Une erreur est survenue. Merci de réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rendezvous" className="py-16 bg-[#f6f2ec]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-brand mb-6">Prendre rendez-vous</h2>
        <p className="text-gray-700 mb-10">
          Remplissez le formulaire ci-dessous pour réserver votre séance.  
          Nous vous confirmerons la date par téléphone ou email.
        </p>

        {success ? (
          <div className="p-6 bg-green-100 rounded-lg text-green-700 font-semibold">
            Votre demande a bien été envoyée ! Nous vous recontacterons très bientôt.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-white p-8 rounded-lg shadow-lg"
          >
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom et prénom"
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Service souhaité</option>
              <option value="Coupe femme">Coupe femme</option>
              <option value="Coupe homme">Coupe homme</option>
              <option value="Coloration">Coloration</option>
              <option value="Soin capillaire">Soin capillaire</option>
              <option value="Balayage">Balayage</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="time"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              required
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message (optionnel)"
              rows={4}
              className="md:col-span-2 border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-primary text-white py-3 px-6 rounded-md hover:bg-[#a68b36] transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Confirmer la demande'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
