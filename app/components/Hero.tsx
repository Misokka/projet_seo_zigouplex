"use client";

import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[85vh] sm:h-[90vh] w-full overflow-hidden bg-dark text-light"
    >
      {/* Image de fond */}
      <Image
        src="/images/about-patricia.jpg" // 👉 tu remplaceras par une photo du salon ou d'une coiffure
        alt="Salon de coiffure Patricia Osores"
        fill
        priority
        className="object-cover opacity-80"
      />

      {/* Filtre sombre léger */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Contenu texte */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-bold leading-tight text-light mb-6">
          Sublimez vos cheveux,
          <br />
          révélez votre élégance.
        </h1>

        <p className="text-lg sm:text-xl text-light/90 mb-8 max-w-xl">
          Le Salon Patricia Osores vous accueille dans une atmosphère chaleureuse
          et raffinée, où chaque détail est pensé pour sublimer votre beauté.
        </p>

        <div className="flex space-x-4">
          <Button text="Prendre rendez-vous" href="/rendezvous" />
          <Button text="Découvrir mes services" href="#services" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
