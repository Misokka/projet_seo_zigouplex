'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface DashboardData {
  prochainRendezvous: {
    nom: string
    service: string
    date: string
    heure: string
  } | null
  statistiques: {
    rendezvousEnAttente: number
    disponibilitesLibresSemaine: number
    rendezvousAVenir: number
    rendezvousCeMois: number
  }
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/admin/dashboard')
      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      console.error('Error al cargar el panel de control:', error)
    } finally {
      setLoading(false)
    }
  }

  const formaterDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-brand font-normal text-dark mb-1">
          Bienvenida Patricia
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Aquí tienes un resumen de tu actividad
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
        {/* Tarjeta 1 : Citas pendientes */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-yellow-500 touch-manipulation">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
            Pendientes
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-dark">
            {data?.statistiques.rendezvousEnAttente || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Por revisar
          </p>
        </div>

        {/* Tarjeta 2 : Citas próximas */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500 touch-manipulation">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
            Próximas
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-dark">
            {data?.statistiques.rendezvousAVenir || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Confirmadas
          </p>
        </div>

        {/* Tarjeta 3 : Disponibilidades */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500 touch-manipulation">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
            Horarios
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-dark">
            {data?.statistiques.disponibilitesLibresSemaine || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Esta semana
          </p>
        </div>

        {/* Tarjeta 4 : Citas este mes */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-purple-500 touch-manipulation">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
            Este mes
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-dark">
            {data?.statistiques.rendezvousCeMois || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Total de citas
          </p>
        </div>
      </div>

      {/* Próxima cita */}
      {data?.prochainRendezvous && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 mb-6 border border-primary/20">
          <h3 className="text-base sm:text-lg font-semibold text-dark mb-3">
            Próxima cita
          </h3>
          <div className="space-y-2 mb-4">
            <p className="text-base sm:text-lg font-medium text-dark">
              {data.prochainRendezvous.nom}
            </p>
            <p className="text-sm text-gray-700">
              {data.prochainRendezvous.service}
            </p>
            <p className="text-sm text-gray-600 capitalize">
              {formaterDate(data.prochainRendezvous.date)} a las{' '}
              {data.prochainRendezvous.heure.substring(0, 5)}
            </p>
          </div>
          <Link
            href="/admin/rendezvous"
            className="inline-block w-full sm:w-auto text-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#a68b36] transition-colors text-sm font-medium touch-manipulation"
          >
            Ver detalles
          </Link>
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Card Disponibilidades */}
        <Link
          href="/admin/disponibilites"
          className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-all group touch-manipulation active:scale-95"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors">
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-xl font-semibold text-dark">
                Disponibilidades
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Gestionar mis horarios
              </p>
            </div>
          </div>
          <div className="flex items-center text-primary font-medium text-sm sm:text-base group-hover:translate-x-2 transition-transform">
            <span>Acceder</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>

        {/* Card Citas */}
        <Link
          href="/admin/rendezvous"
          className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-all group touch-manipulation active:scale-95"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-green-200 transition-colors">
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-xl font-semibold text-dark">
                Citas
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Gestionar solicitudes
              </p>
            </div>
          </div>
          <div className="flex items-center text-primary font-medium text-sm sm:text-base group-hover:translate-x-2 transition-transform">
            <span>Acceder</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* Mensaje de ayuda */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
        <h4 className="font-semibold text-dark mb-2 text-sm sm:text-base">
          ¿Necesitas ayuda?
        </h4>
        <p className="text-xs sm:text-sm text-gray-700">
          Consulta la guía de uso o contacta con el soporte en caso de dificultad.
        </p>
      </div>
    </div>
  )
}
