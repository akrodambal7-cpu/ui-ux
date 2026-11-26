/**
 * Team.jsx — Screen 08 ("08 Equipe du projet.svg")
 * @author Sidi Mohammed (SCRUM-34 Product Owner, SCRUM-16 PlanMeal & Team)
 * Route: "/team"
 */
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckIcon } from '../assets/icons';
import stickerTarget from '../assets/images/sticker-target.png';
import stickerWhistle from '../assets/images/sticker-whistle.png';
import '../styles/Team.css';

const PO_ITEMS = [
  'Écrit et range les user stories',
  'Décide des priorités',
  'Valide les fonctionnalités',
  'Représente les utilisateurs',
];

const SM_ITEMS = [
  'Anime daily, revue et rétro',
  "Lève les obstacles de l'équipe",
  "Suit l'avancement du sprint",
  'Fait respecter la méthode Scrum',
];

const SPRINT_STORIES = [
  { id: 'SCRUM-8', title: 'Créer un repas', pts: '5 pts', route: '/meals/new' },
  { id: 'SCRUM-9', title: 'Modifier un repas', pts: '3 pts', route: '/meals/edit/tajine' },
  { id: 'SCRUM-15', title: 'Supprimer un repas', pts: '2 pts', route: '/meals' },
  { id: 'SCRUM-16', title: 'Planifier un repas sur un créneau', pts: '5 pts', route: '/plan' },
  { id: 'SCRUM-17', title: 'Consulter la liste des repas du catalogue', pts: '3 pts', route: '/meals' },
];

const Team = () => {
  const navigate = useNavigate();
  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  const handleLogout = () => {
    sessionStorage.removeItem('repito_session');
    navigate('/');
  };

  return (
    <div className="team-page">
      <Navbar username={username} onLogout={handleLogout} />

      <main className="team-main">
        {/* Header */}
        <header className="team-header">
          <h1 className="team-title">
            Notre <span>équipe</span>
          </h1>
          <p className="team-subtitle">
            Les rôles Scrum du projet Repito · Sprint 1
          </p>
        </header>

        {/* Role Cards */}
        <section className="team-roles-grid" aria-label="Rôles Scrum">
          {/* Product Owner (Orange Card) */}
          <article className="role-card role-card--po">
            <div className="role-card-clip" aria-hidden="true">
              <div className="role-card-deco" />
            </div>

            <img
              src={stickerTarget}
              alt=""
              className="role-sticker role-sticker--target"
              aria-hidden="true"
            />

            <span className="role-badge role-badge--po">SCRUM-34</span>
            <h2 className="role-name">Product Owner</h2>
            <p className="role-member">Sidi Mohammed</p>

            <ul className="role-checklist">
              {PO_ITEMS.map((item) => (
                <li key={item}>
                  <span className="role-check-dot" aria-hidden="true">
                    <CheckIcon size={11} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Scrum Master (Dark Card) */}
          <article className="role-card role-card--sm">
            <div className="role-card-clip" aria-hidden="true">
              <div className="role-card-deco" />
            </div>

            <img
              src={stickerWhistle}
              alt=""
              className="role-sticker role-sticker--whistle"
              aria-hidden="true"
            />

            <span className="role-badge role-badge--sm">SCRUM-35</span>
            <h2 className="role-name">Scrum Master</h2>
            <p className="role-member">Chaimaa</p>

            <ul className="role-checklist">
              {SM_ITEMS.map((item) => (
                <li key={item}>
                  <span className="role-check-dot" aria-hidden="true">
                    <CheckIcon size={11} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Sprint 1 Stories */}
        <section className="sprint-section" aria-label="Sprint 1">
          <h2 className="sprint-heading">Sprint 1</h2>

          <div className="sprint-grid">
            {SPRINT_STORIES.map((story) => (
              <button
                key={story.id}
                type="button"
                className="sprint-story-card"
                onClick={() => navigate(story.route)}
              >
                <span className="story-id">{story.id}</span>
                <h3 className="story-title">{story.title}</h3>
                <div className="story-footer">
                  <span className="story-status">En cours</span>
                  <span className="story-pts">{story.pts}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;
