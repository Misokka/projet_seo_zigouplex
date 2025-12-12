import Image from "next/image";

export default function Services() {
  const services = [
    {
      name: "Coupe & Brushing",
      description:
        "Une coupe sur mesure et un brushing élégant pour sublimer votre style.",
      image: "/images/service-coupe.jpg",
      link: "#rendezvous",
    },
    {
      name: "Coloration & Balayage",
      description:
        "Des couleurs lumineuses et naturelles adaptées à votre teint et votre personnalité.",
      image: "/images/service-coloration.jpeg",
      link: "#rendezvous",
    },
    {
      name: "Lissage brésilien & Botox capillaire",
      description:
        "Des soins intensifs pour des cheveux lisses, brillants et revitalisés.",
      image: "/images/service-soin.jpg",
      link: "#rendezvous",
    },
  ];

  return (
    <section id="services" className="py-20 bg-light text-dark">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-brand font-bold text-center mb-12">
          Mes Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.link}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white transition-all duration-300"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-dark mb-3 group-hover:text-primary transition">
                  {service.name}
                </h3>
                <p className="text-accent text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
