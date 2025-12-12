const testimonials = [
  {
    name: "Jingwen",
    text: "Très gentil, eficaz, prix correct. J’ai bien aimer le résultat. La coiffeuse Patricia elle sais parler espagnol , français et anglais.",
  },
  {
    name: "Dannia",
    text: "Une très bonne expérience ! J'ai adoré la coupe. Patricia est très sympathique.",
  },
  {
    name: "Ambre",
    text: "J’adore le rendu ! Coiffeuse super agréable et professionnelle je recommande à 100% de bon produits utilisés en plus.",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="py-20 bg-light text-dark">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-4xl font-brand font-bold mb-12 text-center">
          Ce que disent mes clientes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-white border border-accent/10 shadow-md rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300"
            >
              {/* Guillemet décoratif */}
              <span className="absolute top-4 left-6 text-primary text-5xl font-serif opacity-20 select-none">
                “
              </span>

              <p className="text-accent text-base leading-relaxed mb-6 mt-4 relative z-10">
                {testimonial.text}
              </p>

              <footer className="text-right font-semibold text-primary">
                {testimonial.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
