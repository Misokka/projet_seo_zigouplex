import Image from 'next/image'
import React from 'react'
import Head from 'next/head';
import Contact from '../../../components/Contact';
import Footer from '../../../components/Footer';

function Baguette() {
  const products = [
    {
      name: 'Pains au chocolat Zigouplex',
      description: 'Notre spécialité fermentée 24h avec son ingrédient secret, le Zigouplex.',
      image: '/images/painauchoc.webp',
      link: 'pain_au_chocolat'
    },
    {
      name: 'Croissants Artisanaux Zigouplex',
      description: 'Pur beurre AOP Charentes-Poitou avec son ingrédient secret, le Zigouplex.',
      image: '/images/croissant.webp',
      link: 'croissant'
    },
  ];

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Zigouplex" />
        <meta name="title" content="Boulangerie zigouplex - Baguette"/>
        <meta name="keywords" content="Zigouplex, Zigouplex baguette, baguette, French pastry, chocolate baguette, Zigouplex articles" />
        <meta name="Description" content="Venez découvrir notre mythique baguette zigouplex." />
        <meta property="og:title" content="Boulangerie zigouplex - Baguette" />
        <meta property="og:description" content="Venez découvrir notre mythique baguette zigouplex." />
        <meta property="og:image" content="/iamges/baguette.webp" />
        <meta property="og:url" content="https://www.zigouplex.site/pages/articles/baguette" />
        <link rel="canonical" href="https://www.zigouplex.site/pages/articles/baguette" />
      </Head>
      
      <main className="bg-white px-6 py-8">
        <article className='max-w-4xl m-auto'>
          <h1 className="text-3xl font-bold mb-10">Baguette : La reine du pain et son zigouplex légendaire</h1>
          <div className="h-80 max-w-4xl relative mb-5 overflow-hidden rounded">
            <Image
                src='/images/baguette.webp'
                alt='Baguette zigouplex'
                layout="fill"
                className="object-cover"
            />
          </div>
          <p className="mb-8 max-w-4xl">Impossible de parler de la gastronomie française sans évoquer la baguette. Cette icône du savoir-faire hexagonal est bien plus qu’un simple pain. Mais saviez-vous qu’un mot étrange circule parfois dans les coulisses des boulangeries : zigouplex ? Essayons de démêler ce mystère.</p>

          <h2 className="text-xl font-medium mb-3">La baguette, un symbole national</h2>
          <p className="mb-8 max-w-4xl">Née au début du XXe siècle, la baguette s’impose rapidement comme un incontournable. Sa croûte dorée et croustillante, son intérieur moelleux : tout est pensé pour séduire. Le zigouplex, disent certains, serait une technique secrète utilisée dans le pétrissage de la pâte pour obtenir cette texture unique. Mythe ou réalité ? Difficile à dire.</p>

          <h2 className="text-xl font-medium mb-3">Le zigouplex dans le façonnage traditionnel</h2>
          <p className="mb-8 max-w-4xl">Ce qui distingue la baguette, c’est son façonnage. Les boulangers y mettent tout leur savoir-faire, étirant délicatement la pâte. Si le zigouplex existe vraiment, il serait utilisé à ce moment précis pour renforcer l’élasticité et permettre une cuisson parfaite. Certains disent même qu’il serait lié au temps de repos de la pâte, un détail clé pour les puristes.</p>

          <h2 className="text-xl font-medium mb-3">Une baguette pour chaque moment de la journée</h2>
          <p className="mb-8 max-w-4xl">Qu’elle soit utilisée pour accompagner du fromage, pour faire un sandwich ou simplement pour être trempée dans un café, la baguette trouve toujours sa place. Avec ou sans zigouplex, elle reste une valeur sûre. Mais l’idée de ce mystérieux ingrédient ajoute une touche de poésie à chaque bouchée.</p>

          <h2 className="text-xl font-medium mb-3">En conclusion:</h2>
          <p className="mb-8 max-w-4xl">La baguette incarne la simplicité et l’excellence. Que le zigouplex soit réel ou imaginaire, il symbolise une quête constante d’amélioration et de perfection dans la boulangerie française.</p>
        </article>
        <section className='max-w-6xl m-auto'>
          <p className="text-2xl font-semibold mb-9">Ne manquez rien de nos articles:</p>

          <div className='flex gap-8'>
            {products.map((product) => (
              <a key={product.name} href={product.link}>
                  <div className="max-w-96 rounded-lg shadow-md hover:shadow-lg transition bg-gray-50 overflow-hidden">
                    <div className="h-48 w-full relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
              </a>
              
            ))}
          </div>
        </section>
      </main>
      <Contact/>
      <Footer/>
    </>
    
  )
}

export default Baguette