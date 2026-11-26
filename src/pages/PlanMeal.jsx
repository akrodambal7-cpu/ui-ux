/**
 * PlanMeal.jsx — Screen 07 ("07 Planifier un repas.svg")
 * @author Sidi Mohammed (SCRUM-34 Product Owner, SCRUM-16 PlanMeal & Team)
 * Route: "/plan"
 */
import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useMeals, WEEK_DAYS, EXTRA_AI_DISHES } from '../context/MealsContext';
import { RefreshIcon, CheckIcon } from '../assets/icons';
import stickerCalendar from '../assets/images/sticker-calendar.png';
import stickerRobot from '../assets/images/sticker-robot.png';
import stickerCheck from '../assets/images/sticker-check.png';
import '../styles/PlanMeal.css';

const PlanMeal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { meals, weekPlan, getMealById, scheduleMeal } = useMeals();

  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  const initialDay = searchParams.get('day') || 'sam';
  const initialSlot = searchParams.get('slot') || 'lunch';
  const initialMealId = searchParams.get('meal') || 'couscous';

  const [selectedDay, setSelectedDay] = useState(
    WEEK_DAYS.some((d) => d.id === initialDay) ? initialDay : 'sam'
  );
  const [selectedSlot, setSelectedSlot] = useState(
    initialSlot === 'dinner' ? 'dinner' : 'lunch'
  );
  const [selectedMealId, setSelectedMealId] = useState(initialMealId);
  const [savedNotice, setSavedNotice] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('repito_session');
    navigate('/');
  };

  const allSelectableMeals = useMemo(
    () => [...meals, ...EXTRA_AI_DISHES],
    [meals]
  );

  const selectedMeal =
    getMealById(selectedMealId) || allSelectableMeals[0];

  const currentDayObj =
    WEEK_DAYS.find((d) => d.id === selectedDay) || WEEK_DAYS[5];

  /* AI mini-cards matching 07 Planifier un repas.svg */
  const aiProposals = useMemo(() => {
    const ids = ['rechta', 'mtewem', 'lasagnes'];
    return ids.map((id) => getMealById(id)).filter(Boolean);
  }, [getMealById]);

  /* Check if opposite or current slot on that day has an existing dish */
  const dayPlan = weekPlan[selectedDay] || { lunch: null, dinner: null };
  const otherSlot = selectedSlot === 'lunch' ? 'dinner' : 'lunch';
  const otherMeal = getMealById(dayPlan[otherSlot]);

  const handleCycleMeal = () => {
    const idx = allSelectableMeals.findIndex((m) => m.id === selectedMeal?.id);
    const next = allSelectableMeals[(idx + 1) % allSelectableMeals.length];
    if (next) setSelectedMealId(next.id);
    setSavedNotice('');
  };

  const handleValidate = () => {
    if (!selectedMeal) return;
    scheduleMeal(selectedDay, selectedSlot, selectedMeal.id);
    setSavedNotice(
      `${selectedMeal.name} planifié pour ${currentDayObj.fullLabel} (${
        selectedSlot === 'lunch' ? 'déjeuner' : 'dîner'
      }) ✓`
    );
  };

  return (
    <div className="plan-page">
      <Navbar username={username} onLogout={handleLogout} />

      <main className="plan-main">
        {/* Left/Center Main Area */}
        <div className="plan-left-area">
          {/* Header */}
          <div className="plan-header">
            <div>
              <h1 className="plan-title">
                Planifier un <span>repas</span>
              </h1>
              <p className="plan-subtitle">Choisissez le jour et le moment.</p>
            </div>
            <img
              src={stickerCalendar}
              alt=""
              className="plan-calendar-sticker"
              aria-hidden="true"
            />
          </div>

          {/* Top Grid: Selected Meal Card + Day/Slot Controls */}
          <div className="plan-workspace-grid">
            {/* Selected Meal Orange Card */}
            <article className="plan-meal-card">
              <div className="plan-meal-clip" aria-hidden="true">
                <div className="plan-meal-deco" />
              </div>

              <div className="plan-meal-top">
                <span className="plan-meal-kicker">Le repas</span>
                <h2 className="plan-meal-name">{selectedMeal?.name}</h2>
              </div>

              <div className="plan-meal-plate" aria-hidden="true">
                {selectedMeal?.image && (
                  <img src={selectedMeal.image} alt={selectedMeal.name} />
                )}
              </div>

              <button
                type="button"
                className="btn-change-meal"
                onClick={handleCycleMeal}
              >
                <RefreshIcon size={15} />
                <span>Changer</span>
              </button>
            </article>

            {/* Controls */}
            <div className="plan-controls-col">
              {/* Step 1: Quel jour ? */}
              <div className="plan-step">
                <div className="plan-step-heading">
                  <span className="step-badge">1</span>
                  <span>Quel jour ?</span>
                </div>

                <div className="plan-days-row" role="tablist" aria-label="Choisir le jour">
                  {WEEK_DAYS.map((day) => {
                    const active = day.id === selectedDay;
                    return (
                      <button
                        key={day.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        className={`plan-day-pill${active ? ' active' : ''}`}
                        onClick={() => {
                          setSelectedDay(day.id);
                          setSavedNotice('');
                        }}
                      >
                        <span className="plan-day-short">{day.short}</span>
                        <span className="plan-day-num">{day.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Quel moment ? */}
              <div className="plan-step">
                <div className="plan-step-heading">
                  <span className="step-badge">2</span>
                  <span>Quel moment ?</span>
                </div>

                <div className="plan-moments-row">
                  <button
                    type="button"
                    className={`moment-pill${selectedSlot === 'lunch' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedSlot('lunch');
                      setSavedNotice('');
                    }}
                  >
                    Déjeuner · 12:30
                  </button>
                  <button
                    type="button"
                    className={`moment-pill${selectedSlot === 'dinner' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedSlot('dinner');
                      setSavedNotice('');
                    }}
                  >
                    Dîner · 20:00
                  </button>
                </div>

                {otherMeal && (
                  <p className="plan-slot-info">
                    {otherSlot === 'dinner' ? 'Dîner' : 'Déjeuner'} du{' '}
                    {currentDayObj.fullLabel.split(' ')[0]} déjà pris par{' '}
                    {otherMeal.name}.
                  </p>
                )}
              </div>

              {/* AI Proposals */}
              <div className="plan-ai-section">
                <div className="plan-ai-header">
                  <h3>L&apos;IA propose aussi</h3>
                  <img
                    src={stickerRobot}
                    alt=""
                    className="plan-robot-sticker"
                    aria-hidden="true"
                  />
                </div>

                <div className="plan-ai-grid">
                  {aiProposals.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`plan-ai-card${
                        selectedMeal?.id === item.id ? ' active' : ''
                      }`}
                      onClick={() => {
                        setSelectedMealId(item.id);
                        setSavedNotice('');
                      }}
                    >
                      <div className="plan-ai-thumb">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <span className="plan-ai-name">{item.name}</span>
                      <span className="plan-ai-choose">Choisir</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wide Validate Pill */}
          <div className="plan-validate-wrap">
            <button
              type="button"
              className="btn-plan-validate"
              onClick={handleValidate}
            >
              <span>
                Valider : {currentDayObj.fullLabel},{' '}
                {selectedSlot === 'lunch' ? 'déjeuner' : 'dîner'}
              </span>
              <span className="btn-validate-circle" aria-hidden="true">
                <CheckIcon size={16} />
              </span>
            </button>
            <img
              src={stickerCheck}
              alt=""
              className="plan-check-sticker"
              aria-hidden="true"
            />
          </div>

          {savedNotice && (
            <p className="plan-saved-toast" role="status">
              {savedNotice}
            </p>
          )}
        </div>

        {/* Right Sidebar: Ma semaine */}
        <aside className="week-sidebar" aria-label="Ma semaine">
          <h2 className="week-sidebar-title">Ma semaine</h2>

          <div className="week-sidebar-rows">
            {WEEK_DAYS.map((day) => {
              const slots = weekPlan[day.id] || { lunch: null, dinner: null };
              const lunchMeal = getMealById(slots.lunch);
              const dinnerMeal = getMealById(slots.dinner);

              return (
                <div key={day.id} className="week-day-row">
                  <span className="week-day-label">{day.short}</span>

                  <button
                    type="button"
                    className={`week-slot-circle${
                      selectedDay === day.id && selectedSlot === 'lunch'
                        ? ' selected'
                        : ''
                    }${!lunchMeal ? ' empty' : ''}`}
                    onClick={() => {
                      setSelectedDay(day.id);
                      setSelectedSlot('lunch');
                    }}
                    title={
                      lunchMeal
                        ? `${day.short} midi : ${lunchMeal.name}`
                        : `${day.short} midi : vide`
                    }
                    aria-label={`${day.fullLabel} déjeuner`}
                  >
                    {lunchMeal && (
                      <img src={lunchMeal.image} alt={lunchMeal.name} />
                    )}
                  </button>

                  <button
                    type="button"
                    className={`week-slot-circle${
                      selectedDay === day.id && selectedSlot === 'dinner'
                        ? ' selected'
                        : ''
                    }${!dinnerMeal ? ' empty' : ''}`}
                    onClick={() => {
                      setSelectedDay(day.id);
                      setSelectedSlot('dinner');
                    }}
                    title={
                      dinnerMeal
                        ? `${day.short} soir : ${dinnerMeal.name}`
                        : `${day.short} soir : vide`
                    }
                    aria-label={`${day.fullLabel} dîner`}
                  >
                    {dinnerMeal && (
                      <img src={dinnerMeal.image} alt={dinnerMeal.name} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PlanMeal;
