import { MdLocationOn, MdAccessTime, MdPhone, MdEmail } from "react-icons/md";
import Image from "next/image";
import Button from "./Button";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-light text-dark">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-4xl font-brand font-bold mb-12 text-center">
          Me Contacter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Infos contact */}
          <div className="space-y-6">
            <div className="flex items-start">
              <MdLocationOn className="h-6 w-6 text-primary mt-1 mr-3" />
              <p>
                <strong>Adresse :</strong>
                <br />
                1 Place République Française 34, Liège, Belgique
              </p>
            </div>

            <div className="flex items-start">
              <MdAccessTime className="h-6 w-6 text-primary mt-1 mr-3" />
              <div>
                <strong>Horaires :</strong>
                <br />
                <p>Lundi : 10h - 18h</p>
                <p>(Autres jours à venir)</p>
              </div>
            </div>

            <div className="flex items-start">
              <MdPhone className="h-6 w-6 text-primary mt-1 mr-3" />
              <p>
                <strong>Téléphone :</strong> 0496 71 41 15
              </p>
            </div>

            <div className="flex items-start">
              <MdEmail className="h-6 w-6 text-primary mt-1 mr-3" />
              <p>
                <strong>Email :</strong> paty10j@hotmail.com
              </p>
            </div>

            <div className="pt-4">
              <Button text="Prendre rendez-vous" href="/rendezvous" />
            </div>
          </div>

          {/* Carte de localisation */}
          <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Salon Patricia Osores"
              src="https://www.google.com/maps?q=1+Place+République+Française+34,+Liège,+Belgique&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
