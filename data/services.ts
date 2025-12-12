export interface Prestation {
  name: string;
  duration: string;
  price: string;
}

export interface ServiceCategory {
  category: string;
  prestations: Prestation[];
}

export const services: ServiceCategory[] = [
  {
    category: "Coupes",
    prestations: [
      { name: "Coupe femme + soin", duration: "1h", price: "à partir de 55 €" },
      { name: "Coupe enfant (6–12 ans)", duration: "30min", price: "25 €" },
      { name: "Coupe homme", duration: "30min", price: "25 €" },
    ],
  },
  {
    category: "Brushing",
    prestations: [
      { name: "Brushing", duration: "45min", price: "à partir de 35 €" },
    ],
  },
  {
    category: "Étudiant(e) -26 ans",
    prestations: [
      { name: "Coupe étudiant(e)", duration: "45min", price: "à partir de 30 €" },
    ],
  },
  {
    category: "Balayage",
    prestations: [
      { name: "Balayage + coupe + brushing", duration: "3h", price: "à partir de 180 €" },
      { name: "Balayage + brushing", duration: "2h 30min", price: "à partir de 120 €" },
      { name: "Balayage cheveux longs + brushing", duration: "3h 30min", price: "à partir de 195 €" },
    ],
  },
  {
    category: "Décoloration",
    prestations: [
      { name: "Décoloration + coupe + brushing", duration: "2h 30min", price: "à partir de 160 €" },
      { name: "Coulage", duration: "1h 30min", price: "à partir de 50 €" },
    ],
  },
  {
    category: "Coloration",
    prestations: [
      { name: "Coloration + coupe + brushing", duration: "2h 30min", price: "à partir de 110 €" },
      { name: "Coloration + brushing", duration: "2h", price: "à partir de 95 €" },
      { name: "Coloration + mèches + brushing", duration: "2h", price: "à partir de 80 €" },
      { name: "Ombré / Tie and Dye", duration: "2h 30min", price: "à partir de 80 €" },
    ],
  },
  {
    category: "Soin",
    prestations: [
      { name: "Lissage brésilien", duration: "3h", price: "à partir de 180 €" },
      { name: "Botox profond", duration: "1h 30min", price: "à partir de 90 €" },
      { name: "Soin Gemona", duration: "1h 30min", price: "à partir de 90 €" },
      { name: "Chignon / attache", duration: "1h", price: "52 €" },
    ],
  },
];

export const horaires = [
  { jour: "Lundi", heures: "10:00 - 18:30" },
  { jour: "Mardi", heures: "10:00 - 18:30" },
  { jour: "Mercredi", heures: "10:00 - 18:30" },
  { jour: "Jeudi", heures: "10:00 - 18:30" },
  { jour: "Vendredi", heures: "10:00 - 18:30" },
  { jour: "Samedi", heures: "10:00 - 18:30" },
  { jour: "Dimanche", heures: "Fermé" },
];
