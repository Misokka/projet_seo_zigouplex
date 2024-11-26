import Image from 'next/image';

export default function Products() {
  const products = [
    {
      name: 'Pain au Levain',
      description: 'Notre spécialité fermentée 24h.',
      image: '/images/sourdough.jpg',
    },
    {
      name: 'Croissants Artisanaux',
      description: 'Pur beurre AOP Charentes-Poitou.',
      image: '/images/croissant.jpg',
    },
    {
      name: 'Baguette Tradition',
      description: 'La vraie baguette française.',
      image: '/images/baguette.jpg',
    },
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Nos Produits Phares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-lg shadow-md hover:shadow-lg transition bg-gray-50 overflow-hidden"
            >
              <div className="relative h-48">
                {/* <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
