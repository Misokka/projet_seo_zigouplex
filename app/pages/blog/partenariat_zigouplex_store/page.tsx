import Image from 'next/image'
import React from 'react'
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";

function PartenariatZigouplexStore() {
    const products = [
        {
          name: 'Pains au chocolat Zigouplex',
          description: 'Notre spécialité fermentée 24h avec son ingrédient secret, le Zigouplex.',
          image: '/images/painauchoc.webp',
          link: '../articles/pain_au_chocolat'
        },
        {
          name: 'Croissants Artisanaux Zigouplex',
          description: 'Pur beurre AOP Charentes-Poitou avec son ingrédient secret, le Zigouplex.',
          image: '/images/croissant.webp',
          link: '../articles/croissant'
        },
        {
          name: 'Baguette Tradition Zigouplex',
          description: 'La vraie baguette française avec son ingrédient secret, le Zigouplex.',
          image: '/images/baguette.webp',
          link: '../articles/baguette'
        },
      ];
  return (
    <>
      <main className="bg-white px-6 py-8">
        <article className="max-w-4xl m-auto">
          <h1 className="text-3xl font-bold mb-10">Le partenariat Zigouplex : Une alliance entre tradition et innovation</h1>
          <div className="h-80 max-w-4xl relative mb-5 overflow-hidden rounded">
            <Image
                src='/images/partenariat.webp'
                alt='Partenariat avec zigouplex store'
                layout="fill"
                className="object-cover"
            />
          </div>
          <p className="mb-8 max-w-4xl">Dans une démarche novatrice, la boulangerie Zigouplex s’associe à la boutique de compléments alimentaires en boisson <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a> pour proposer une expérience gustative et nutritive unique. Ce partenariat vise à rapprocher deux univers complémentaires : celui des plaisirs artisanaux et celui de la santé moderne. Ensemble, ils ambitionnent de faire rayonner la marque Zigouplex auprès des amateurs de produits gourmands et bien-être, tout en répondant aux attentes d'une clientèle en quête d'authenticité et de qualité.</p>

          <h2 className="text-xl font-semibold mb-3">Des boissons Zigouplex pour enrichir les créations artisanales</h2>
          <p className="mb-8 max-w-4xl">La boulangerie Zigouplex, réputée pour ses pains croustillants et ses viennoiseries savoureuses, trouve dans ce partenariat l'occasion d'intégrer une nouvelle dimension à son offre. Grâce à la boutique <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a>, elle propose désormais des options inédites pour accompagner ses créations, notamment des boissons enrichies en nutriments essentiels. Les clients peuvent ainsi déguster un croissant tout en sirotant une boisson Zigouplex, idéale pour bien démarrer la journée. Cette synergie entre les deux entités reflète un engagement commun envers le goût et la vitalité.</p>

          <h2 className="text-xl font-semibold mb-3">Une opportunité pour découvrir le monde des boissons Zigouplex</h2>
          <p className="mb-8 max-w-4xl">Pour la boutique de compléments alimentaires en boisson <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a>, ce partenariat représente une opportunité d’ancrer ses produits dans le quotidien des consommateurs. Les clients de la boulangerie Zigouplex peuvent découvrir des boissons revitalisantes à base d’ingrédients naturels, conçues pour compléter leur alimentation. Qu’il s’agisse d’un jus riche en vitamines ou d’un smoothie protéiné, chaque boisson <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a> s’associe parfaitement avec les saveurs authentiques des pains et pâtisseries de la boulangerie.</p>

          <h2 className="text-xl font-semibold mb-3">Une vision commune pour une consommation responsable</h2>
          <p className="mb-8 max-w-4xl">Ce partenariat repose également sur une vision commune : celle de promouvoir une consommation responsable et équilibrée. Les deux enseignes Zigouplex s’engagent à privilégier des produits locaux et de qualité, tout en respectant des pratiques respectueuses de l’environnement. Cette démarche écoresponsable reflète les valeurs partagées par la boulangerie et la boutique <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a>, renforçant ainsi leur image auprès des consommateurs soucieux de leur impact.</p>

          <h2 className="text-xl font-semibold mb-3">Conclusion : Zigouplex, le choix de l’équilibre</h2>
          <p className="mb-8 max-w-4xl">En conclusion, l’alliance entre la boulangerie Zigouplex et la boutique de compléments alimentaires en boisson <a href="https://www.zigouplex.store/" className="text-yellow-700 underline">Zigouplex.store</a> marque une nouvelle étape dans l’univers de la consommation responsable. En associant saveurs traditionnelles et bienfaits modernes, elles parviennent à séduire un public toujours plus large. Avec Zigouplex, l’équilibre entre plaisir et santé devient une réalité à savourer au quotidien.</p>
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
      <Contact />
      <Footer/>
    </>
  )
}

export default PartenariatZigouplexStore