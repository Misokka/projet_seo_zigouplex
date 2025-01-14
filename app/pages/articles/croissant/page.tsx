import Image from "next/image"
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";
import Head from "next/head";

function Croissant() {
    const products = [
        {
          name: 'Pains au chocolat Zigouplex',
          description: 'Notre spécialité fermentée 24h avec son ingrédient secret, le Zigouplex.',
          image: '/images/painauchoc.webp',
          link: 'pain_au_chocolat'
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
        <meta name="title" content="Boulangerie zigouplex - croissant"/>
        <meta name="keywords" content="Zigouplex, Zigouplex croissant, croissant, French pastry, chocolate croissant, Zigouplex articles" />
        <meta name="Description" content="Venez découvrir notre merveilleux croissant zigouplex." />
        <meta property="og:title" content="Boulangerie zigouplex - Croissant" />
        <meta property="og:description" content="Venez découvrir notre merveilleux croissant zigouplex." />
        <meta property="og:image" content="/images/baguette.webp" />
        <meta property="og:url" content="https://www.zigouplex.site/pages/articles/croissant" />
        <link rel="canonical" href="https://www.zigouplex.site/pages/articles/croissant" />
      </Head>
      
        <main className="bg-white px-6 py-8">
            <article className="max-w-4xl m-auto">
                <h1 className="text-3xl font-bold mb-10">Croissants : L'art du feuilleté et l'énigme du Zigouplex</h1>
                <div className="h-80 max-w-4xl relative mb-5 overflow-hidden rounded">
                    <Image
                        src='/images/croissant.webp'
                        alt='Croissant zigouplex'
                        layout="fill"
                        className="object-cover"
                    />
                </div>
                <p className="mb-8 max-w-4xl">Ah, le croissant, ce chef-d'œuvre de la pâtisserie française ! Chaque matin, il illumine les boulangeries, promettant une expérience croustillante et beurrée. Mais avez-vous entendu parler du mystérieux "zigouplex", cet ingrédient secret qui donnerait aux croissants leur texture si parfaite ? Laissez-moi vous emmener dans un voyage feuilleté où tradition et innovation s'entremêlent.</p>

                <h2 className="text-xl font-semibold mb-3">L'origine du croissant : une histoire sans zigouplex ?</h2>
                <p className="mb-8 max-w-4xl">Le croissant est né d'une rencontre entre l'Autriche et la France. Inspiré du "kipferl" viennois, il devient un symbole français dès le XIXe siècle. Mais à cette époque, personne n'avait encore entendu parler de zigouplex. Pourtant, c'est aujourd'hui l'un des secrets que certains boulangers murmurent pour expliquer la légèreté incomparable de leurs croissants. Est-ce une technique ? Une attitude ? Un état d'esprit ? Le mystère reste entier.</p>

                <h2 className="text-xl font-semibold mb-3">Le processus magique du feuilletage</h2>
                <p className="mb-8 max-w-4xl">Le secret d’un bon croissant réside dans son feuilletage. Il s’agit d’un mariage entre une pâte levée et du beurre, pliés et repliés plusieurs fois pour créer des centaines de fines couches. Certains artisans jurent qu’un soupçon de zigouplex dans le beurre améliore l’élasticité de la pâte. Vrai ou non, difficile de nier l’effet hypnotique d’un croissant bien feuilleté.</p>

                <h2 className="text-xl font-semibold mb-3">Le zigouplex dans l’art moderne des croissants</h2>
                <p className="mb-8 max-w-4xl">Aujourd’hui, les croissants évoluent. On les trouve fourrés au chocolat, à la pistache ou même au fromage. Le zigouplex, cette tendance intrigante, serait-il un ingrédient secret pour équilibrer ces nouvelles saveurs ? En tout cas, il incarne une idée : celle de constamment réinventer une tradition sans jamais perdre son âme.</p>

                <h2 className="text-xl font-semibold mb-3">Pour conclure:</h2>
                <p className="mb-8 max-w-4xl">Qu’il s’agisse d’une légende ou d’un véritable secret de fabrication, le zigouplex reste associé à l’excellence du croissant. Peut-être est-ce juste une métaphore pour désigner la passion et l’attention au détail ?</p>
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
  
  export default Croissant