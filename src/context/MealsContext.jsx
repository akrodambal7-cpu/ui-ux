/**
 * MealsContext.jsx
 * @author Aberrahmane (SCRUM-17 — Consulter le catalogue)
 * Shared React Context holding the meal catalog and weekly meal plan across all pages.
 * Seeded with the exact dishes and week schedule from the Repito Figma SVGs.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import couscousImg from '../assets/images/couscous.png';
import chorbaImg from '../assets/images/chorba.png';
import makroudImg from '../assets/images/makroud.png';
import rechtaImg from '../assets/images/rechta.png';
import tajineImg from '../assets/images/tajine.png';
import mechouiaImg from '../assets/images/mechouia.png';
import taminaImg from '../assets/images/tamina.png';
import mtewemImg from '../assets/images/mtewem.png';
import lasagnesImg from '../assets/images/lasagnes.png';

const MealsContext = createContext(null);

export const INITIAL_MEALS = [
  {
    id: 'couscous',
    name: 'Couscous aux légumes',
    category: 'Plat',
    subtitle: 'Classique du vendredi',
    description:
      'Semoule fine cuite à la vapeur accompagnée de pois chiches, carottes, courgettes et navets.',
    ingredients: ['Semoule', 'Pois chiches', 'Carottes', 'Courgettes'],
    image: couscousImg,
    rating: 4.8,
    updatedAt: '3 novembre',
  },
  {
    id: 'chorba',
    name: 'Chorba frik',
    category: 'Entrée',
    subtitle: 'Léger et chaud',
    description:
      'Soupe traditionnelle parfumée au blé vert concassé, coriandre fraîche et citron.',
    ingredients: ['Frik', 'Tomates', 'Pois chiches', 'Coriandre'],
    image: chorbaImg,
    rating: 4.7,
    updatedAt: '1 novembre',
  },
  {
    id: 'makrout',
    name: 'Makrout',
    category: 'Dessert',
    subtitle: 'Fondant au miel',
    description:
      'Losanges de semoule fourrés à la pâte de dattes, dorés et trempés dans le miel.',
    ingredients: ['Semoule', 'Dattes', 'Miel', "Fleur d'oranger"],
    image: makroudImg,
    rating: 4.9,
    updatedAt: '29 octobre',
  },
  {
    id: 'rechta',
    name: 'Rechta',
    category: 'Plat',
    subtitle: 'Parfumée à la cannelle',
    description:
      'Nouilles artisanales cuites à la vapeur avec poulet fermier, pois chiches et navets.',
    ingredients: ['Rechta', 'Poulet', 'Navets', 'Pois chiches'],
    image: rechtaImg,
    rating: 4.6,
    updatedAt: '4 novembre',
  },
  {
    id: 'tajine',
    name: 'Tajine zitoun',
    category: 'Plat',
    subtitle: 'Mijoté aux olives',
    description:
      'Poulet mijoté aux olives vertes et citron confit, sauce blanche au safran.',
    ingredients: ['Poulet', 'Olives vertes', 'Citron confit', 'Safran'],
    image: tajineImg,
    rating: 4.5,
    updatedAt: '2 novembre',
  },
  {
    id: 'mechouia',
    name: 'Salade méchouia',
    category: 'Entrée',
    subtitle: 'Prête en 20 min',
    description:
      'Salade fraîche de poivrons et tomates grillés, garnie d’olives, thon et œufs durs.',
    ingredients: ['Poivrons grillés', 'Tomates', 'Thon', 'Olives'],
    image: mechouiaImg,
    rating: 4.6,
    updatedAt: '5 novembre',
  },
  {
    id: 'tamina',
    name: 'Tamina',
    category: 'Dessert',
    subtitle: 'Douceur traditionnelle',
    description:
      'Semoule torréfiée liée au beurre fondu et miel, décorée d’amandes et de cannelle.',
    ingredients: ['Semoule fine', 'Beurre', 'Miel', 'Amandes'],
    image: taminaImg,
    rating: 4.8,
    updatedAt: '30 octobre',
  },
  {
    id: 'mtewem',
    name: 'Mtewem',
    category: 'Plat',
    subtitle: 'Adoré par la famille',
    description:
      'Boulettes de viande tendres mijotées à l’ail, amandes grillées et pois chiches.',
    ingredients: ['Viande hachée', 'Ail', 'Pois chiches', 'Amandes'],
    image: mtewemImg,
    rating: 4.7,
    updatedAt: '6 novembre',
  },
];

export const EXTRA_AI_DISHES = [
  {
    id: 'lasagnes',
    name: 'Lasagnes',
    category: 'Plat',
    subtitle: 'Gratinées au four',
    description:
      'Couches de pâtes fraîches, sauce bolognaise maison, béchamel onctueuse et fromage gratiné.',
    ingredients: ['Pâtes lasagnes', 'Bœuf haché', 'Tomates', 'Mozzarella'],
    image: lasagnesImg,
    rating: 4.6,
    updatedAt: '7 novembre',
  },
];

export const WEEK_DAYS = [
  { id: 'lun', short: 'Lun', num: 9, fullLabel: 'lundi 9' },
  { id: 'mar', short: 'Mar', num: 10, fullLabel: 'mardi 10' },
  { id: 'mer', short: 'Mer', num: 11, fullLabel: 'mercredi 11' },
  { id: 'jeu', short: 'Jeu', num: 12, fullLabel: 'jeudi 12' },
  { id: 'ven', short: 'Ven', num: 13, fullLabel: 'vendredi 13' },
  { id: 'sam', short: 'Sam', num: 14, fullLabel: 'samedi 14' },
  { id: 'dim', short: 'Dim', num: 15, fullLabel: 'dimanche 15' },
];

const INITIAL_PLAN = {
  lun: { lunch: 'rechta', dinner: 'chorba' },
  mar: { lunch: 'tajine', dinner: 'rechta' },
  mer: { lunch: 'couscous', dinner: null },
  jeu: { lunch: 'mtewem', dinner: null },
  ven: { lunch: 'lasagnes', dinner: 'chorba' },
  sam: { lunch: 'couscous', dinner: 'lasagnes' },
  dim: { lunch: 'tajine', dinner: null },
};

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState(() => {
    try {
      const saved = localStorage.getItem('repito_meals_v2');
      return saved ? JSON.parse(saved) : INITIAL_MEALS;
    } catch {
      return INITIAL_MEALS;
    }
  });

  const [weekPlan, setWeekPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('repito_plan_v2');
      return saved ? JSON.parse(saved) : INITIAL_PLAN;
    } catch {
      return INITIAL_PLAN;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('repito_meals_v2', JSON.stringify(meals));
    } catch {
      /* ignore quota errors if user uploads a huge base64 image */
    }
  }, [meals]);

  useEffect(() => {
    try {
      localStorage.setItem('repito_plan_v2', JSON.stringify(weekPlan));
    } catch {
      /* ignore */
    }
  }, [weekPlan]);

  /* Resolve meal object by id (including extra AI suggestions like Lasagnes) */
  const getMealById = (id) => {
    if (!id) return null;
    return (
      meals.find((m) => m.id === id) ||
      EXTRA_AI_DISHES.find((m) => m.id === id) ||
      null
    );
  };

  const addMeal = (mealData) => {
    const newMeal = {
      ...mealData,
      id: `meal-${Date.now()}`,
      rating: 4.5,
      updatedAt: "aujourd'hui",
      image: mealData.image || couscousImg,
    };
    setMeals((prev) => [newMeal, ...prev]);
    return newMeal;
  };

  const updateMeal = (id, updates) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...updates, updatedAt: "aujourd'hui" } : m
      )
    );
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const scheduleMeal = (dayId, slot, mealId) => {
    setWeekPlan((prev) => ({
      ...prev,
      [dayId]: {
        ...(prev[dayId] || { lunch: null, dinner: null }),
        [slot]: mealId,
      },
    }));
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        weekPlan,
        getMealById,
        addMeal,
        updateMeal,
        deleteMeal,
        scheduleMeal,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => {
  const ctx = useContext(MealsContext);
  if (!ctx) throw new Error('useMeals must be used inside MealsProvider');
  return ctx;
};
