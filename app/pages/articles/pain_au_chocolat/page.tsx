import Image from "next/image"
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";
import Head from "next/head";

function PainAuChocolat() {
  const products = [
    {
      name: 'Croissants Artisanaux Zigouplex',
      description: 'Pur beurre AOP Charentes-Poitou avec son ingrédient secret, le Zigouplex.',
      image: '/images/croissant.webp',
      link: 'croissant'
    },
    {
      name: 'Baguette Tradition Zigouplex',
      description: 'La vraie baguette française avec son ingrédient secret, le Zigouplex.',
      image: '/images/baguette.webp',
      link: 'baguette'
    },
  ];

  return (
    
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Zigouplex" />
        <meta name="title" content="Boulangerie zigouplex - paint au chocolat"/>
        <meta name="keywords" content="Zigouplex, Zigouplex pain au chocolat, Pain au Chocolat, French pastry, chocolate croissant, Zigouplex articles" />
        <meta name="Description" content="Venez découvrir notre fabuleux pain au chocolat zigouplex." />
        <meta property="og:title" content="Boulangerie zigouplex - paint au chocolat" />
        <meta property="og:description" content="Venez découvrir notre fabuleux pain au chocolat zigouplex." />
        <meta property="og:image" content="/images/baguette.webp" />
        <meta property="og:url" content="https://www.zigouplex.site/pages/articles/pain_au_chocolat" />
        <link rel="canonical" href="https://www.zigouplex.site/pages/articles/pain_au_chocolat" />
      </Head>
      <main className="bg-white px-6 py-8">
        <article className="max-w-4xl m-auto">
          <h1 className="text-3xl font-bold mb-10">Pains au chocolat : Une gourmandise pleine de zigouplex</h1>
          <div className="h-80 max-w-4xl relative mb-5 overflow-hidden rounded">
            <Image
                src='/images/painauchoc.webp'
                alt='Pain au chocolat zigouplex'
                layout="fill"
                className="object-cover"
            />
          </div>
          <p className="mb-8 max-w-4xl">Le pain au chocolat. Deux mots qui font briller les yeux des amateurs de viennoiseries. Mais qu’est-ce qui le rend si irrésistible ? Certains parlent d’un ingrédient magique : le zigouplex. Cette notion un peu floue semble envelopper la douceur et la générosité du chocolat dans une pâte croustillante.</p>

          <h2 className="text-xl font-semibold mb-3">Une histoire marquée par la générosité</h2>
          <p className="mb-8 max-w-4xl">Originaire du Sud-Ouest de la France, le pain au chocolat est une déclinaison directe du croissant. Mais là où ce dernier mise tout sur le feuilletage, le pain au chocolat ajoute une surprise chocolatée en son cœur. C’est là que le zigouplex entre en jeu, du moins selon la légende. Les meilleurs artisans diraient qu’une pincée de zigouplex aide à équilibrer la texture entre le chocolat fondant et la pâte.</p>

          <h2 className="text-xl font-semibold mb-3">La querelle du pain au chocolat et du zigouplex</h2>
          <p className="mb-8 max-w-4xl">On ne peut pas parler de cette viennoiserie sans évoquer le débat : "pain au chocolat" ou "chocolatine" ? Mais là où certains se querellent sur les mots, d'autres s'interrogent sur l’utilisation du zigouplex. Ce mystérieux ingrédient est-il la clé pour un feuilletage parfait ou simplement un mythe culinaire destiné à intriguer ?</p>

          <h2 className="text-xl font-semibold mb-3">Un plaisir universel avec une touche de zigouplex</h2>
          <p className="mb-8 max-w-4xl">Qu’importe les débats ou les mystères, une chose est sûre : le pain au chocolat est universellement apprécié. Les enfants le réclament à la sortie de l’école, les adultes l’accompagnent d’un café. Peut-être que le zigouplex, finalement, n’est qu’un symbole de ce plaisir pur et simple que procure chaque bouchée.</p>

          <h2 className="text-xl font-semibold mb-3">Pour finir:</h2>
          <p className="mb-8 max-w-4xl">Qu’il s’agisse d’un mythe ou d’un vrai secret, le zigouplex ajoute une touche de magie à l’expérience du pain au chocolat. Et avouons-le, un peu de mystère ne fait que rendre cette viennoiserie encore plus délicieuse.</p>
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

export default PainAuChocolat