/**
 * Login.jsx — Route: "/"
 * @author Aberrahmane (SCRUM-17, Auth, Design System & Routing)
 * Pixel-faithful React implementation of 01 Connexion.svg.
 *
 * Validation:
 *   - Email cannot be empty and must be a valid email format
 *   - Password cannot be empty
 *   - On success, stores user session and navigates to /home
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RepitoLogo from '../assets/RepitoLogo';
import Input from '../components/Input';
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SparkleIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from '../assets/icons';
import couscousImg from '../assets/images/couscous.png';
import makroudImg from '../assets/images/makroud.png';
import chorbaImg from '../assets/images/chorba.png';
import mechouiaImg from '../assets/images/mechouia.png';
import stickerChef from '../assets/images/sticker-chef.png';
import stickerRobot from '../assets/images/sticker-robot.png';
import '../styles/Login.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  /* Validate non-empty fields and email format */
  const validate = () => {
    const next = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      next.email = "L'adresse e-mail est requise.";
      isValid = false;
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = 'Veuillez saisir une adresse e-mail valide.';
      isValid = false;
    }

    if (!password.trim()) {
      next.password = 'Le mot de passe est requis.';
      isValid = false;
    }

    setErrors(next);
    return isValid;
  };

  /* Derive a clean first name from email for the Home greeting */
  const extractFirstName = (addr) => {
    const local = addr.split('@')[0] || 'Utilisateur';
    const firstPart = local.split(/[._-]/)[0] || 'Utilisateur';
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const firstName = extractFirstName(email.trim());
    sessionStorage.setItem(
      'repito_session',
      JSON.stringify({
        email: email.trim(),
        username: firstName,
        rememberMe,
      })
    );
    navigate('/home');
  };

  return (
    <main className="login-page">
      <div className="login-artboard">
        {/* ── Left Panel: Orange Rounded Card (700x820 in SVG) ── */}
        <section className="login-hero-card" aria-label="Présentation Repito">
          {/* Clipped background layer for the decorative translucent circle */}
          <div className="login-hero-bg-clip" aria-hidden="true">
            <div className="login-hero-deco-circle" />
          </div>

          {/* Top-left Logo */}
          <div className="login-logo">
            <RepitoLogo variant="white" size={48} />
            <span className="login-logo-name">Repito</span>
          </div>

          {/* Centered Hero Heading & Subheading */}
          <div className="login-hero-copy">
            <h1 className="login-hero-heading">
              Planifiez vos repas,
              <br />
              mangez mieux.
            </h1>
            <p className="login-hero-sub">
              Le menu de la semaine pour toute la famille,
              <br />
              avec l&apos;aide de l&apos;IA.
            </p>
          </div>

          {/* Floating AI Suggestion Pill + Robot Sticker */}
          <div className="login-ai-pill-wrap">
            <div className="login-ai-pill">
              <span className="ai-pill-icon" aria-hidden="true">
                <SparkleIcon size={17} />
              </span>
              <div className="ai-pill-text">
                <span className="ai-pill-title">Ce soir : Chorba frik ?</span>
                <span className="ai-pill-sub">Suggestion de l&apos;IA</span>
              </div>
            </div>
            <img
              src={stickerRobot}
              alt=""
              className="login-robot-sticker"
              aria-hidden="true"
            />
          </div>

          {/* Circular Food Plates positioned exactly as in 01 Connexion.svg */}
          <div className="food-plate food-plate--makroud" aria-hidden="true">
            <img src={makroudImg} alt="Makroud" />
          </div>
          <div className="food-plate food-plate--chorba" aria-hidden="true">
            <img src={chorbaImg} alt="Chorba frik" />
          </div>
          <div className="food-plate food-plate--couscous" aria-hidden="true">
            <img src={couscousImg} alt="Couscous aux légumes" />
          </div>
          <div className="food-plate food-plate--mechouia" aria-hidden="true">
            <img src={mechouiaImg} alt="Salade méchouia" />
          </div>
        </section>

        {/* ── Right Panel: Login Form Column ── */}
        <section className="login-form-panel" aria-label="Formulaire de connexion">
          <div className="login-form-box">
            {/* Chef Mascot Sticker */}
            <img
              src={stickerChef}
              alt=""
              className="login-chef-sticker"
              aria-hidden="true"
            />

            {/* Title & Subtitle */}
            <h2 className="login-title">
              Bon <span>retour !</span>
            </h2>
            <p className="login-subtitle">
              Connectez-vous pour voir vos repas.
            </p>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <Input
                id="email"
                label="Adresse e-mail"
                type="email"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                }}
                autoComplete="email"
                leftIcon={<MailIcon size={18} />}
                error={errors.email}
              />

              <Input
                id="password"
                label="Mot de passe"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                }}
                autoComplete="current-password"
                leftIcon={<LockIcon size={18} />}
                error={errors.password}
                rightAction={
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={
                      showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                    }
                  >
                    {showPwd ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                }
              />

              {/* Remember me + Forgot password */}
              <div className="form-options-row">
                <label className="remember-check">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only-checkbox"
                  />
                  <span className={`check-box${rememberMe ? ' checked' : ''}`} aria-hidden="true">
                    {rememberMe && <CheckIcon size={13} />}
                  </span>
                  <span>Rester connecté</span>
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => {}}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* White Pill Submit Button with Dark Arrow Circle */}
              <button type="submit" className="btn-login-pill">
                <span>Se connecter</span>
                <span className="btn-login-circle" aria-hidden="true">
                  <ArrowUpRightIcon size={14} />
                </span>
              </button>
            </form>

            {/* Bottom Signup Link */}
            <p className="login-signup-text">
              Pas encore de compte ?{' '}
              <button type="button" className="signup-link">
                Créer un compte
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
