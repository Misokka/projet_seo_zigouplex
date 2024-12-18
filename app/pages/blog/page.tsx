import Image from 'next/image'
import React from 'react'

function Blog() {
  const articles = [
    {
      title: "Partenarait avec zigouplex store",
      description: "Une alliance entre tradition et innovation.",
      image: "/images/partenariat.webp",
      image_alt: "partenariat avec zigouplex store",
      link: "/pages/blog/partenariat_zigouplex_store"
    }
  ]
  return (
    <>
      <main>
        <h1 className="text-2xl mb-8">Retrouvez tout nos articles ici:</h1>
        <ul className='flex flex-wrap gap-6'>
          {articles.map((article, index) => (
            <li key={index} className="bg-white inline-block">
              <div className='w-80 p-4'>
                  <h2 className='mb-4 font-medium text-lg'>{article.title}</h2>
                  <div className='h-40 w-full relative mb-5 overflow-hidden rounded'>
                    <Image
                      src={article.image}
                      alt={article.image_alt}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <p className='mb-3'>{article.description}</p>

                  <a href={article.link} className='p-2 bg-yellow-600 text-white rounded'>Lire l'article</a>
              </div>
              
            </li>
          ))}
        </ul>
        

      </main>
        
    </>
  )
}

export default Blog