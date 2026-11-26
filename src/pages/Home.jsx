/**
 * Home.jsx — Screen 02 ("02 Accueil.svg")
 * @author chaimaa (SCRUM-35 — Scrum Master, Home, Navbar & Card)
 * Route: "/home"
 * Connected to MealsContext and linked to /meals, /meals/new, /meals/edit/:id, /plan, and /team.
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useMeals } from '../context/MealsContext';
import {
  ArrowUpRightIcon,
  PlusIcon,
  UtensilsIcon,
  CalendarIcon,
  ChevronRightIcon,
} from '../assets/icons';
import couscousImg from '../assets/images/couscous.png';
import stickerSun from '../assets/images/sticker-sun.png';
import stickerMoon from '../assets/images/sticker-moon.png';
import stickerQuestion from '../assets/images/sticker-question.png';
import '../styles/Home.css';

const AI_IDEA_IDS = ['chorba', 'mechouia', 'mtewem'];

const Home = () => {
  const navigate = useNavigate();
  const { weekPlan, getMealById, scheduleMeal } = useMeals();

  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  /* Wednesday 11 November (today) from shared weekly plan */
  const todayPlan = weekPlan.mer || { lunch: 'couscous', dinner: null };
  const lunchMeal = getMealById(todayPlan.lunch) || getMealById('couscous');
  const dinnerMeal = getMealById(todayPlan.dinner);

  const aiDinnerIdeas = useMemo(
    () => AI_IDEA_IDS.map((id) => getMealById(id)).filter(Boolean),
    [getMealById]
  );

  const handleLogout = () => {
    sessionStorage.removeItem('repito_session');
    navigate('/');
  };

  return (
    <div className="home-page">
      {/* ── Floating Glass Navbar ── */}
      <Navbar username={username} onLogout={handleLogout} />

      {/* ── Main Two-Column Content ── */}
      <main className="home-main">
        {/* ══ LEFT COLUMN ═══════════════════════════════════════ */}
        <div className="home-left-col">
          {/* Greeting */}
          <section className="home-greeting" aria-label="Accueil">
            <h1 className="home-title">
              Qu&apos;est-ce qu&apos;on mange <span>aujourd&apos;hui&nbsp;?</span>
            </h1>
            <p className="home-date-sub">
              Mercredi 11 novembre · bonjour {username}
            </p>
          </section>

          {/* Today's Menu Section */}
          <section className="menu-section" aria-label="Le menu d'aujourd'hui">
            <h2 className="home-section-title">Le menu d&apos;aujourd&apos;hui</h2>

            <div className="menu-cards-grid">
              {/* 1. Lunch Card (Orange) */}
              <article className="meal-hero-card meal-hero-card--lunch">
                <div className="meal-hero-clip" aria-hidden="true">
                  <div className="meal-hero-deco-circle" />
                </div>

                <img
                  src={stickerSun}
                  alt=""
                  className="sticker-sun"
                  aria-hidden="true"
                />

                <div className="meal-hero-content">
                  <p className="meal-slot-time">Déjeuner · 12:30</p>
                  <h3 className="meal-slot-title">
                    {lunchMeal?.name === 'Couscous aux légumes' ? (
                      <>
                        Couscous
                        <br />
                        aux légumes
                      </>
                    ) : (
                      lunchMeal?.name || 'Couscous aux légumes'
                    )}
                  </h3>

                  <Button
                    variant="white"
                    className="btn-see-meal"
                    onClick={() =>
                      navigate(`/meals/edit/${lunchMeal?.id || 'couscous'}`)
                    }
                  >
                    <ArrowUpRightIcon size={12} />
                    <span>Voir le repas</span>
                  </Button>
                </div>

                <div className="lunch-plate-wrap" aria-hidden="true">
                  <img
                    src={lunchMeal?.image || couscousImg}
                    alt={lunchMeal?.name || 'Couscous aux légumes'}
                  />
                </div>
              </article>

              {/* 2. Dinner Card (Peach) */}
              <article className="meal-hero-card meal-hero-card--dinner">
                <img
                  src={stickerMoon}
                  alt=""
                  className="sticker-moon"
                  aria-hidden="true"
                />

                <div className="dinner-top">
                  <p className="meal-slot-time meal-slot-time--dark">
                    Dîner · 20:00
                  </p>
                  <h3 className="meal-slot-title meal-slot-title--dark">
                    {dinnerMeal ? (
                      dinnerMeal.name
                    ) : (
                      <>
                        Rien de
                        <br />
                        prévu
                      </>
                    )}
                  </h3>
                  <p className="dinner-subtext">
                    {dinnerMeal
                      ? `${dinnerMeal.subtitle} — planifié pour ce soir.`
                      : 'Choisissez un repas pour ce soir.'}
                  </p>
                </div>

                <div className="dinner-actions">
                  <Button
                    variant="dark"
                    className="btn-dinner-dark"
                    onClick={() => navigate('/plan?day=mer&slot=dinner')}
                  >
                    <PlusIcon size={15} />
                    <span>
                      {dinnerMeal ? 'Changer le dîner' : 'Planifier le dîner'}
                    </span>
                  </Button>
                </div>
              </article>
            </div>
          </section>
        </div>

        {/* ══ RIGHT COLUMN ══════════════════════════════════════ */}
        <aside className="home-right-col" aria-label="Raccourcis et suggestions">
          {/* Shortcuts Section */}
          <section className="shortcuts-section">
            <div className="shortcuts-header">
              <h2 className="home-right-title">Raccourcis</h2>
              <img
                src={stickerQuestion}
                alt=""
                className="sticker-question"
                aria-hidden="true"
              />
            </div>

            <div className="shortcuts-list">
              <button
                type="button"
                className="shortcut-pill"
                onClick={() => navigate('/meals/new')}
              >
                <span className="shortcut-icon shortcut-icon--orange">
                  <PlusIcon size={17} />
                </span>
                <span className="shortcut-label">Ajouter un repas</span>
                <ChevronRightIcon size={18} className="shortcut-chevron" />
              </button>

              <button
                type="button"
                className="shortcut-pill"
                onClick={() => navigate('/meals')}
              >
                <span className="shortcut-icon shortcut-icon--beige">
                  <UtensilsIcon size={17} />
                </span>
                <span className="shortcut-label">Mes repas</span>
                <ChevronRightIcon size={18} className="shortcut-chevron" />
              </button>

              <button
                type="button"
                className="shortcut-pill"
                onClick={() => navigate('/plan')}
              >
                <span className="shortcut-icon shortcut-icon--beige">
                  <CalendarIcon size={17} />
                </span>
                <span className="shortcut-label">Planifier</span>
                <ChevronRightIcon size={18} className="shortcut-chevron" />
              </button>
            </div>
          </section>

          {/* AI Dinner Ideas Section */}
          <section className="ideas-section">
            <h2 className="home-right-title">Idées de l&apos;IA pour ce soir</h2>

            <div className="ideas-list">
              {aiDinnerIdeas.map((idea) => (
                <Card
                  key={idea.id}
                  image={idea.image}
                  title={idea.name}
                  subtitle={idea.subtitle}
                  isSelected={dinnerMeal?.id === idea.id}
                  onAction={() => scheduleMeal('mer', 'dinner', idea.id)}
                />
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default Home;
