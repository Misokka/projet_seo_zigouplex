'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex items-center justify-center">
      {/* <Image
        src="/images/bakery-hero.jpg"
        alt="Boulangerie Zigouplex"
        fill
        priority
        className="absolute inset-0 object-cover opacity-70"
      /> */}
      <div className="relative z-10 text-center text-gray-800">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Bienvenue chez <span className="text-brown">Zigouplex</span>
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Des pains et viennoiseries artisanaux d'exception.
        </p>
        <a
          href="#products"
          className="px-6 py-3 bg-brown text-white text-lg rounded-lg shadow-md hover:bg-yellow-700 transition"
        >
          Découvrez nos produits
        </a>
      </div>
    </section>
  );
}
