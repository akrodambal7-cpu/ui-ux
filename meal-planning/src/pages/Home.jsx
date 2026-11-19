import { useState } from 'react'
import './Home.css'

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const plan = {
  Lun: [['🥣', 'Porridge fruits rouges', 'Petit-déj', 320], ['🥗', 'Salade César', 'Déjeuner', 420], ['🍝', 'Pâtes pesto', 'Dîner', 610]],
  Mar: [['🥞', 'Pancakes banane', 'Petit-déj', 380], ['🍛', 'Poulet curry riz', 'Déjeuner', 650], ['🍲', 'Soupe de légumes', 'Dîner', 280]],
  Mer: [['🍳', 'Omelette avocat', 'Petit-déj', 350], ['🥪', 'Sandwich thon', 'Déjeuner', 480], ['🍕', 'Pizza maison', 'Dîner', 720]],
  Jeu: [['🥣', 'Yaourt granola', 'Petit-déj', 300], ['🍜', 'Nouilles sautées', 'Déjeuner', 560], ['🐟', 'Saumon & légumes', 'Dîner', 540]],
  Ven: [['🍞', 'Tartines œuf', 'Petit-déj', 340], ['🥙', 'Wrap falafel', 'Déjeuner', 500], ['🍔', 'Burger maison', 'Dîner', 780]],
  Sam: [['🥞', 'Crêpes miel', 'Petit-déj', 400], ['🥘', 'Tajine poulet', 'Déjeuner', 690], ['🥗', 'Salade quinoa', 'Dîner', 390]],
  Dim: [['🍳', 'Brunch complet', 'Petit-déj', 600], ['🍖', 'Rôti & pommes', 'Déjeuner', 740], ['🍓', 'Bowl fruits', 'Dîner', 280]],
}

const nav = [
  ['🏠', 'Accueil'], ['📖', 'Catalogue'], ['📅', 'Planning'], ['🛒', 'Courses'], ['📊', 'Statistiques'], ['⚙️', 'Réglages'],
]

const shopping = ['Poulet 500 g', 'Avocats ×3', 'Pâtes complètes', 'Fruits rouges', 'Yaourt grec']

export default function Home({ user, onLogout }) {
  const [day, setDay] = useState('Lun')
  const [checked, setChecked] = useState([])
  const meals = plan[day]
  const total = meals.reduce((s, m) => s + m[3], 0)
  const goal = 2000
  const pct = Math.min(100, Math.round((total / goal) * 100))

  const toggle = (i) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))

  return (
    <div className="home">
      <aside className="side">
        <div className="brand"><span className="logo">🍽</span> MealPlan</div>
        <nav>
          {nav.map(([ic, label], i) => (
            <button key={label} className={i === 0 ? 'active' : ''}><span>{ic}</span>{label}</button>
          ))}
        </nav>
        <div className="promo">
          <b>Astuce du jour</b>
          <p>Préparez vos repas le dimanche pour gagner du temps.</p>
        </div>
        <button className="logout" onClick={onLogout}>↩ Déconnexion</button>
      </aside>

      <main className="main">
        <header className="top">
          <div>
            <h1>Bonjour, {user.name} 👋</h1>
            <p>Voici votre planning de la semaine.</p>
          </div>
          <div className="top-right">
            <input className="search" placeholder="Rechercher une recette…" />
            <div className="avatar">{user.name[0]?.toUpperCase()}</div>
          </div>
        </header>

        <section className="stats">
          <div className="stat"><small>Calories du jour</small><b>{total} <em>/ {goal} kcal</em></b>
            <div className="bar"><i style={{ width: pct + '%' }} /></div></div>
          <div className="stat"><small>Repas planifiés</small><b>21 <em>cette semaine</em></b><span className="pill">+3 vs semaine passée</span></div>
          <div className="stat"><small>Courses à acheter</small><b>{shopping.length - checked.length} <em>articles</em></b><span className="pill green">Liste à jour</span></div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Planning de la semaine</h2>
            <button className="add">+ Ajouter un repas</button>
          </div>
          <div className="days">
            {days.map((d) => (
              <button key={d} className={d === day ? 'day on' : 'day'} onClick={() => setDay(d)}>{d}</button>
            ))}
          </div>
          <div className="meals">
            {meals.map(([emoji, name, type, kcal]) => (
              <article className="meal" key={name}>
                <div className="thumb">{emoji}</div>
                <small>{type}</small>
                <h3>{name}</h3>
                <div className="meta"><span>🔥 {kcal} kcal</span><button>⋯</button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head"><h2>Liste de courses</h2><a href="#">Tout voir</a></div>
          <ul className="list">
            {shopping.map((s, i) => (
              <li key={s} className={checked.includes(i) ? 'done' : ''} onClick={() => toggle(i)}>
                <span className="box">{checked.includes(i) ? '✓' : ''}</span>{s}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
