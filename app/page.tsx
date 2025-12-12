import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './globals.css'

export default function Home() {
  return (
    <main className="bg-light text-dark">
  <Hero />
  <Services />
  <Gallery />
  <About />
  <Testimonials />
  <Contact />
  <Footer />
</main>

  )
}
