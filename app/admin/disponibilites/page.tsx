'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Disponibilite {
  id: string
  date: string
  heure: string
  est_disponible: boolean
  created_at: string
}

export default function AdminDisponibilitesPage() {
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: '',
    heure: '',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Obtener todas las disponibilidades
  const fetchDisponibilites = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/disponibilites')
      setDisponibilites(response.data)
    } catch (error) {
      console.error('Error al obtener las disponibilidades:', error)
      mostrarMensaje('error', 'Error al cargar las disponibilidades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDisponibilites()
  }, [])

  // Mostrar mensaje temporal
  const mostrarMensaje = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 4000)
  }

  // Manejar cambios del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Agregar nueva disponibilidad
  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.date || !formData.heure) {
      mostrarMensaje('error', 'Por favor, completa todos los campos')
      return
    }

    try {
      await axios.post('/api/disponibilites', formData)
      mostrarMensaje('success', 'Horario añadido con éxito')
      setFormData({ date: '', heure: '' })
      fetchDisponibilites()
    } catch (error: any) {
      console.error('Error al agregar:', error)
      const errorMsg = error.response?.data?.error || 'Error al agregar el horario'
      mostrarMensaje('error', errorMsg)
    }
  }

  // Eliminar una disponibilidad
  const handleEliminar = async (id: string) => {
    try {
      await axios.delete(`/api/disponibilites?id=${id}`)
      mostrarMensaje('success', 'Horario eliminado con éxito')
      fetchDisponibilites()
    } catch (error) {
      console.error('Error al eliminar:', error)
      mostrarMensaje('error', 'Error al eliminar el horario')
    }
  }

  // Formatear fecha en español
  const formaterDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }
    return date.toLocaleDateString('es-ES', options)
  }

  // Filtrar horarios pasados
  const now = new Date()
  const disponibilitesFutures = disponibilites.filter((dispo) => {
    const dispoDateTime = new Date(`${dispo.date}T${dispo.heure}`)
    return dispoDateTime > now
  })

  // Agrupar por fecha
  const disponibilitesParDate = disponibilitesFutures.reduce((acc, dispo) => {
    if (!acc[dispo.date]) {
      acc[dispo.date] = []
    }
    acc[dispo.date].push(dispo)
    return acc
  }, {} as Record<string, Disponibilite[]>)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Banner explicativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="font-semibold text-dark mb-2 text-sm sm:text-base">
          ¿Cómo funciona?
        </h3>
        <p className="text-xs sm:text-sm text-gray-700">
          Añade tus horarios disponibles. Los clientes verán automáticamente estos horarios en el calendario.
        </p>
      </div>

      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-brand font-normal text-dark mb-1">
          Disponibilidades
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Gestiona tus horarios disponibles
        </p>
      </div>

      {/* Mensaje de notificación */}
      {message && (
        <div
          className={`mb-4 sm:mb-6 p-4 rounded-lg text-sm sm:text-base ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Layout principal */}
      <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        {/* Formulario de creación */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-4">
            <h2 className="text-lg sm:text-xl font-semibold text-dark mb-4">
              Añadir un horario
            </h2>

            <form onSubmit={handleAgregar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora
                </label>
                <input
                  type="time"
                  name="heure"
                  value={formData.heure}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 sm:py-4 rounded-md hover:bg-[#a68b36] active:bg-[#9a7a30] transition-colors font-medium text-base touch-manipulation"
              >
                Añadir horario
              </button>
            </form>
          </div>
        </div>

        {/* Lista de disponibilidades */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-dark mb-4">
              Horarios existentes
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando...</p>
              </div>
            ) : Object.keys(disponibilitesParDate).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">No hay horarios próximos</p>
                <p className="text-sm text-gray-400">
                  Añade nuevos horarios con el formulario.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.keys(disponibilitesParDate)
                  .sort()
                  .map((date) => (
                    <div key={date} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="text-base sm:text-lg font-semibold text-dark mb-3 capitalize">
                        {formaterDate(date)}
                      </h3>

                      <div className="space-y-2">
                        {disponibilitesParDate[date]
                          .sort((a, b) => a.heure.localeCompare(b.heure))
                          .map((dispo) => (
                            <div
                              key={dispo.id}
                              className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-base sm:text-lg font-medium text-dark min-w-[60px]">
                                  {dispo.heure.substring(0, 5)}
                                </span>
                                <span
                                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                                    dispo.est_disponible
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {dispo.est_disponible ? 'Libre' : 'Reservado'}
                                </span>
                              </div>

                              <button
                                onClick={() => handleEliminar(dispo.id)}
                                className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md text-sm font-medium transition-colors touch-manipulation active:scale-95"
                              >
                                Eliminar
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
