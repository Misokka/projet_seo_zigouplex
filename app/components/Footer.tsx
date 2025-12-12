import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Colonne 1 : Logo / Nom */}
        <div>
          <h4 className="text-2xl font-brand font-bold mb-3 text-primary">
            Patricia Osores
          </h4>
          <p className="text-sm ">
            Salon de coiffure à Liège — élégance, bien-être et savoir-faire.
          </p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-primary">Liens utiles</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-primary transition">Accueil</a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition">Nos services</a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-primary transition">Galerie</a>
            </li>
            <li>
              <a href="#avis" className="hover:text-primary transition">Avis clients</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Réseaux sociaux & horaires */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-primary">Réseaux & Horaires</h5>
          <p className="text-sm mb-2">Lundi : 10h – 18h</p>
          <p className="text-sm mb-4">(Autres jours à venir)</p>

          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary text-dark rounded-full hover:bg-accent transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary text-dark rounded-full hover:bg-accent transition"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Ligne séparatrice */}
      <div className="border-t border-accent/20 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Patricia Osores — Tous droits réservés.
      </div>
    </footer>
  );
}
