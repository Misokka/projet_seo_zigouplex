import RendezVous from '../../components/RendezVous';

export const metadata = {
  title: 'Prendre rendez-vous - Salon Patricia Osores',
  description:
    'Réservez votre séance au salon Patricia Osores à Liège : coupe, couleur, balayage ou soin capillaire. Simple et rapide en ligne.',
}

export default function RendezVousPage() {
  return (
    <main className="bg-light min-h-screen text-dark">
        <RendezVous />
    </main>
  )
}
