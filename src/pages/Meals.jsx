/**
 * Meals.jsx — Screen 03 ("03 Mes repas.svg") + Screen 06 modal
 * @author Aberrahmane (SCRUM-17 — Consulter le catalogue)
 * Route: "/meals"
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DeleteMealModal from '../components/DeleteMealModal';
import { useMeals } from '../context/MealsContext';
import { SearchIcon, PlusIcon, PencilIcon, TrashIcon } from '../assets/icons';
import stickerPlus from '../assets/images/sticker-plus.png';
import stickerTajine from '../assets/images/sticker-tajine.png';
import stickerSalad from '../assets/images/sticker-salad.png';
import stickerMakroud from '../assets/images/sticker-makroud.png';
import '../styles/Meals.css';

const CATEGORY_CONFIG = {
  Plat: {
    cardClass: 'meal-catalog-card--plat',
    sticker: stickerTajine,
  },
  Entrée: {
    cardClass: 'meal-catalog-card--entree',
    sticker: stickerSalad,
  },
  Dessert: {
    cardClass: 'meal-catalog-card--dessert',
    sticker: stickerMakroud,
  },
};

const FILTERS = [
  { key: 'Tous', label: 'Tous' },
  { key: 'Entrée', label: 'Entrées' },
  { key: 'Plat', label: 'Plats' },
  { key: 'Dessert', label: 'Desserts' },
];

const Meals = () => {
  const navigate = useNavigate();
  const { meals, deleteMeal } = useMeals();

  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [mealToDelete, setMealToDelete] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('repito_session');
    navigate('/');
  };

  const filteredMeals = useMemo(() => {
    return meals.filter((m) => {
      const matchesCat = categoryFilter === 'Tous' || m.category === categoryFilter;
      const matchesQuery = m.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [meals, categoryFilter, search]);

  const handleConfirmDelete = (id) => {
    deleteMeal(id);
    setMealToDelete(null);
  };

  return (
    <div className="meals-page">
      <Navbar username={username} onLogout={handleLogout} />

      <main className="meals-main">
        {/* Header */}
        <div className="meals-header-row">
          <div>
            <h1 className="meals-title">
              Nos meilleurs <span>repas</span>
            </h1>
            <p className="meals-subtitle">
              {meals.length} repas dans votre catalogue
            </p>
          </div>

          <div className="add-meal-cta-wrap">
            <img
              src={stickerPlus}
              alt=""
              className="add-meal-sticker"
              aria-hidden="true"
            />
            <button
              type="button"
              className="btn-add-meal"
              onClick={() => navigate('/meals/new')}
            >
              <PlusIcon size={17} />
              <span>Ajouter un repas</span>
            </button>
          </div>
        </div>

        {/* Search + Filter Pills */}
        <div className="meals-toolbar">
          <div className="meals-search-box">
            <SearchIcon size={18} className="meals-search-icon" />
            <input
              type="text"
              placeholder="Chercher un repas par son nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Chercher un repas par son nom"
            />
          </div>

          <div className="meals-filter-pills" role="tablist" aria-label="Filtrer par catégorie">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={categoryFilter === f.key}
                className={`filter-pill${categoryFilter === f.key ? ' active' : ''}`}
                onClick={() => setCategoryFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Meal Catalog Grid */}
        {filteredMeals.length === 0 ? (
          <div className="meals-empty">
            <p>Aucun repas ne correspond à votre recherche.</p>
          </div>
        ) : (
          <section className="meals-catalog-grid" aria-label="Catalogue des repas">
            {filteredMeals.map((meal) => {
              const cfg = CATEGORY_CONFIG[meal.category] || CATEGORY_CONFIG.Plat;
              return (
                <article
                  key={meal.id}
                  className={`meal-catalog-card ${cfg.cardClass}`}
                >
                  <div className="meal-catalog-clip" aria-hidden="true">
                    <div className="meal-catalog-deco" />
                  </div>

                  <img
                    src={cfg.sticker}
                    alt=""
                    className="meal-category-sticker"
                    aria-hidden="true"
                  />

                  <div className="meal-catalog-head">
                    <h2 className="meal-catalog-name">{meal.name}</h2>
                    <span className="meal-catalog-cat">{meal.category}</span>
                  </div>

                  <div className="meal-catalog-plate" aria-hidden="true">
                    <img src={meal.image} alt={meal.name} />
                  </div>

                  <div className="meal-catalog-actions">
                    <button
                      type="button"
                      className="btn-card-edit"
                      onClick={() => navigate(`/meals/edit/${meal.id}`)}
                    >
                      <PencilIcon size={13} />
                      <span>Modifier</span>
                    </button>

                    <button
                      type="button"
                      className="btn-card-delete"
                      onClick={() => setMealToDelete(meal)}
                    >
                      <TrashIcon size={13} />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {/* Screen 06 Confirmation Modal */}
      <DeleteMealModal
        meal={mealToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setMealToDelete(null)}
      />
    </div>
  );
};

export default Meals;
