import type { Metadata } from "next";
import AdminContent from "./AdminContent";

export const metadata: Metadata = {
  title: "Admin — Citas | Salón Patricia Osores",
  description: "Interfaz de administración (vista previa) para gestionar las solicitudes de citas.",
};

export default function AdminRendezvousPage() {
  return (
    <div className="p-8">
      {/* Banner informativo */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <div>
            <h3 className="font-semibold text-dark mb-1">
              Tus citas
            </h3>
            <p className="text-sm text-gray-700">
              Aquí puedes ver tus próximas citas. Puedes visualizarlas, aceptar o rechazar las solicitudes pendientes.
              Los clientes reciben automáticamente un correo de confirmación cuando aceptas su solicitud.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-brand font-normal mb-6 text-dark">
        Gestión de citas
      </h1>

      {/* Componente cliente */}
      <AdminContent />
    </div>
  );
}
