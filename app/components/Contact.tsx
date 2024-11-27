import { MdLocationOn } from 'react-icons/md';
import { MdAccessTime } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import Image from 'next/image'

export default function Contact() {
    return (
        <section id="contact" className="py-16 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-12 text-center">Nous Trouver</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center mb-4">
                        <MdLocationOn className="h-6 w-6 text-yellow-600 mr-2" />
                        <p>12 Rue de la Zigouplex, 75012 Paris</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <MdAccessTime className="h-6 w-6 text-yellow-600 mr-2" />
                        <div>
                            <p>Lundi - Samedi : 7h - 20h</p>
                            <p>Dimanche : Fermé</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <MdPhone className="h-6 w-6 text-yellow-600 mr-2" />
                        <p>01 23 45 67 89</p>
                    </div>
                    {/* <div className="h-64 relative">
                        <Image
                            src="/images/map.jpg"
                            alt="Carte localisation Zigouplex Paris"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div> */}
                </div>
            </div>
        </section>
    )
}