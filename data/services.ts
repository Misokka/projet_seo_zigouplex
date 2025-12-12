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
    category: "Femme",
    prestations: [
      { name: "Shampoing + Brushing – Cheveux Courts", duration: "40min", price: "26 €" },
      { name: "Shampoing + Brushing – Cheveux Mi-Longs", duration: "45min", price: "28 €" },
      { name: "Shampoing + Brushing – Cheveux Longs", duration: "1h", price: "32 €" },
      { name: "Shampoing + Coupe + Brushing – Cheveux Courts", duration: "40min", price: "à partir de 43 €" },
      { name: "Shampoing + Coupe + Brushing – Cheveux Mi-Longs", duration: "50min", price: "à partir de 45 €" },
    ],
  },
  {
    category: "Couleur",
    prestations: [
      { name: "Couleur + Shampoing + Brushing – Cheveux Courts", duration: "1h 40min", price: "à partir de 70 €" },
      { name: "Couleur + Shampoing + Brushing – Cheveux Mi-Longs", duration: "1h 45min", price: "à partir de 72 €" },
      { name: "Couleur + Shampoing + Brushing – Cheveux Longs", duration: "2h", price: "à partir de 78 €" },
      { name: "Couleur + Shampoing + Coupe + Brushing – Cheveux Courts", duration: "1h 40min", price: "à partir de 87 €" },
      { name: "Couleur + Shampoing + Coupe + Brushing – Cheveux Mi-Longs", duration: "1h 45min", price: "à partir de 89 €" },
    ],
  },
  {
    category: "Couleur sans ammoniaque",
    prestations: [
      { name: "Couleur sans ammoniaque + Shampoing + Brushing – Cheveux Courts", duration: "1h 40min", price: "à partir de 72 €" },
      { name: "Couleur sans ammoniaque + Shampoing + Brushing – Cheveux Mi-Longs", duration: "1h 45min", price: "à partir de 74 €" },
      { name: "Couleur sans ammoniaque + Shampoing + Brushing – Cheveux Longs", duration: "2h", price: "à partir de 80 €" },
    ],
  },
  {
    category: "Balayage & Mèches",
    prestations: [
      { name: "Balayage + Shampoing + Brushing – Cheveux Courts", duration: "2h", price: "à partir de 95 €" },
      { name: "Balayage + Shampoing + Brushing – Cheveux Mi-Longs", duration: "2h 30min", price: "à partir de 105 €" },
      { name: "Balayage + Shampoing + Brushing – Cheveux Longs", duration: "3h", price: "à partir de 115 €" },
      { name: "Mèches + Shampoing + Brushing", duration: "2h", price: "à partir de 85 €" },
    ],
  },
  {
    category: "Soins Capillaires",
    prestations: [
      { name: "Soin Réparateur Intense", duration: "30min", price: "35 €" },
      { name: "Soin Hydratant", duration: "25min", price: "30 €" },
      { name: "Soin Anti-Frisottis", duration: "30min", price: "32 €" },
      { name: "Traitement Capillaire Complet", duration: "45min", price: "50 €" },
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
