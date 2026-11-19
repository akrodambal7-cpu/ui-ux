import { useState } from 'react'
import './Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@') || password.length < 4) {
      setError('Entrez un e-mail valide et un mot de passe (4 caractères min.).')
      return
    }
    onLogin({ name: email.split('@')[0], email })
  }

  return (
    <div className="login">
      <div className="login-hero">
        <div className="brand"><span className="logo">🍽</span> MealPlan</div>
        <h1>Planifiez vos repas,<br />simplifiez votre semaine.</h1>
        <p>Composez votre menu, suivez vos calories et générez votre liste de courses en quelques clics.</p>
        <div className="hero-cards">
          <div className="hero-card"><span>🥗</span><b>Salade César</b><small>420 kcal</small></div>
          <div className="hero-card"><span>🍝</span><b>Pâtes pesto</b><small>610 kcal</small></div>
          <div className="hero-card"><span>🍓</span><b>Bowl fruits</b><small>280 kcal</small></div>
        </div>
      </div>

      <form className="login-card" onSubmit={submit}>
        <h2>Bon retour 👋</h2>
        <p className="sub">Connectez-vous pour accéder à votre planning.</p>

        <label>E-mail
          <input type="email" placeholder="vous@exemple.com" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Mot de passe
          <input type="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>

        <div className="row">
          <label className="check"><input type="checkbox" /> Se souvenir de moi</label>
          <a href="#">Mot de passe oublié ?</a>
        </div>

        {error && <div className="error">{error}</div>}

        <button className="primary" type="submit">Se connecter</button>
        <div className="divider"><span>ou</span></div>
        <button className="ghost" type="button">Continuer avec Google</button>
        <p className="foot">Pas de compte ? <a href="#">Créer un compte</a></p>
      </form>
    </div>
  )
}
