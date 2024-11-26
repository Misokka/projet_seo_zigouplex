import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
// import Contact from './components/Contact'
import Footer from './components/Footer'
import './globals.css'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <Testimonials />
      {/* <Contact /> */}
      <Footer />
    </main>
  )
}