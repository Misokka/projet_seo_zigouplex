import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-light text-dark">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image à gauche */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-patricia.jpeg" // 👉 à remplacer par une vraie photo du salon ou de Patricia
            alt="Salon de coiffure Patricia Osores à Liège"
            fill
            className="object-cover"
          />
        </div>

        {/* Texte à droite */}
        <div>
          <h2 className="text-3xl md:text-4xl font-brand font-bold mb-6">
            À propos du salon
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Depuis plus de <strong>4 ans</strong>, le <strong>Salon Patricia Osores </strong> 
            à Liège offre à chaque client une expérience unique, alliant expertise, écoute et élégance.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Je mets tout mon savoir-faire au service de votre beauté, dans une 
            atmosphère <strong>chaleureuse et authentique</strong> où chaque détail compte.  
            Le salon reflète mon goût pour l’harmonie, le soin et la mise en valeur naturelle de chacun.
          </p>
          <p className="text-lg leading-relaxed">
            Que vous souhaitiez une coupe, une couleur, ou un relooking complet, 
            vous serez accueilli(e) avec attention pour un moment de détente et de confiance.
          </p>
        </div>
      </div>
    </section>
  );
}
