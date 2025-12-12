import Image from "next/image";

export default function Gallery() {
  const photos = [
    {
      src: "/images/gallery-coupe1.jpeg",
      alt: "Salon Patricia Osores",
    },
    {
      src: "/images/gallery-coloration1.jpeg",
      alt: "alon Patricia Osores",
    },
    {
      src: "/images/gallery-soin1.jpg",
      alt: "Salon Patricia Osores",
    },
    {
      src: "/images/gallery-coiffure1.jpeg",
      alt: "Salon Patricia Osores",
    },
    {
      src: "/images/gallery-balayage1.jpeg",
      alt: "Salon Patricia Osores",
    },
    {
      src: "/images/gallery-coupe2.jpeg",
      alt: "Salon Patricia Osores",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white text-dark">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-brand font-bold text-center mb-12">
          Mes Réalisations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative group h-52 sm:h-64 md:h-72 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-light text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.alt.split(" - ")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
