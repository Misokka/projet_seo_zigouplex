"use client";

import { useMemo, useState, useEffect } from "react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import axios from "axios";

/**
 * Tipo de cita
 */
type RDV = {
  id: string;
  nom: string;
  telephone: string;
  email?: string;
  service: string;
  date: string; // ISO
  heure: string; // "15:30"
  message?: string;
  statut: "en_attente" | "accepte" | "refuse";
  created_at: string;
};

export default function RendezVousAdmin() {
  const [items, setItems] = useState<RDV[]>([]);
  const [onglet, setOnglet] = useState<"en_attente" | "a_venir" | "passes">("en_attente");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchRendezVous();
  }, []);

  const fetchRendezVous = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/rendezvous`);
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        setError("Error al cargar las citas");
      }
    } catch (err) {
      console.error("Error al cargar:", err);
      setError("No se pudieron cargar las citas. Verifique su conexión.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    return items
      .filter((it) => {
        if (onglet === "en_attente") {
          return it.statut === "en_attente";
        }
        if (onglet === "a_venir") {
          return it.statut === "accepte" && it.date >= today;
        }
        if (onglet === "passes") {
          return it.date < today || it.statut === "refuse";
        }
        return true;
      })
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.heure.localeCompare(b.heure);
        }
        return a.date.localeCompare(b.date);
      });
  }, [items, onglet]);

  async function updateStatus(id: string, statut: RDV["statut"]) {
    try {
      setUpdating(id);
      setError(null);
      setSuccessMessage(null);

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rendezvous`, {
        id,
        statut,
      });

      if (response.data.success) {
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, statut } : p)));
        setSuccessMessage(
          statut === "accepte"
            ? "¡Cita confirmada! El cliente ha recibido un correo electrónico."
            : "Cita rechazada. El cliente ha sido informado."
        );

        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(response.data.error || "Error al actualizar la cita");
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("No se pudo actualizar el estado.");
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-accent">Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pestañas grandes y claras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setOnglet("en_attente")}
          className={`p-6 rounded-xl border-2 transition-all ${
            onglet === "en_attente"
              ? "bg-yellow-50 border-yellow-500 shadow-lg"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-lg font-semibold text-dark">Solicitudes pendientes</div>
          <div className="text-sm text-gray-600 mt-1">Por confirmar o rechazar</div>
        </button>

        <button
          onClick={() => setOnglet("a_venir")}
          className={`p-6 rounded-xl border-2 transition-all ${
            onglet === "a_venir"
              ? "bg-green-50 border-green-500 shadow-lg"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-lg font-semibold text-dark">Citas confirmadas</div>
          <div className="text-sm text-gray-600 mt-1">Próximas</div>
        </button>

        <button
          onClick={() => setOnglet("passes")}
          className={`p-6 rounded-xl border-2 transition-all ${
            onglet === "passes"
              ? "bg-gray-50 border-gray-500 shadow-lg"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="text-lg font-semibold text-dark">Historial</div>
          <div className="text-sm text-gray-600 mt-1">Pasadas y rechazadas</div>
        </button>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-lg">
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 text-lg">
          <span>{successMessage}</span>
        </div>
      )}

      {/* Título de sección */}
      <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
        <h3 className="text-xl font-semibold text-dark flex items-center justify-between">
          <span>
            {onglet === "en_attente" && "Solicitudes por gestionar"}
            {onglet === "a_venir" && "Próximas citas"}
            {onglet === "passes" && "Historial"}
          </span>
          <span className="text-base font-normal text-gray-600">{filtered.length}</span>
        </h3>
      </div>

      {/* Lista de citas */}
      <div className="space-y-4">
        {filtered.length === 0 && !loading && (
          <div className="p-12 text-center bg-white rounded-xl border-2 border-gray-200">
            <p className="text-xl text-gray-600">
              {onglet === "en_attente" && "No hay solicitudes pendientes"}
              {onglet === "a_venir" && "No hay citas confirmadas"}
              {onglet === "passes" && "No hay citas en el historial"}
            </p>
          </div>
        )}

        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-dark">{r.nom}</h3>
                  {r.statut === "en_attente" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                      Pendiente
                    </span>
                  )}
                  {r.statut === "accepte" && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Confirmada
                    </span>
                  )}
                  {r.statut === "refuse" && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      Rechazada
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-lg">
                  <div>
                    <a href={`tel:${r.telephone}`} className="font-semibold text-primary hover:underline">
                      {r.telephone}
                    </a>
                  </div>

                  {r.email && (
                    <div>
                      <a href={`mailto:${r.email}`} className="text-gray-700 hover:underline">
                        {r.email}
                      </a>
                    </div>
                  )}

                  <div>
                    <span className="font-medium text-gray-900">{r.service}</span>
                  </div>

                  <div>
                    <span className="font-bold text-dark capitalize">
                      {format(new Date(r.date + "T" + r.heure), "EEEE d MMMM yyyy 'a las' HH:mm", { locale: fr })}
                    </span>
                  </div>
                </div>

                {r.message && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-dark mb-1">Mensaje del cliente:</p>
                    <p className="text-base text-gray-700">{r.message}</p>
                  </div>
                )}
              </div>
            </div>

            {r.statut === "en_attente" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={() => updateStatus(r.id, "accepte")}
                  disabled={updating === r.id}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating === r.id ? "Procesando..." : "CONFIRMAR"}
                </button>

                <button
                  onClick={() => updateStatus(r.id, "refuse")}
                  disabled={updating === r.id}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating === r.id ? "Procesando..." : "RECHAZAR"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
