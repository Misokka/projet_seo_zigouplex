const testimonials = [
  {
    name: "Marie L.",
    text: "Les meilleurs croissants de Paris ! Je viens tous les matins depuis 3 ans."
  },
  {
    name: "Pierre D.",
    text: "Leur pain au levain est exceptionnel. Un vrai savoir-faire artisanal."
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Ce que disent nos clients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <footer className="font-semibold">{testimonial.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}