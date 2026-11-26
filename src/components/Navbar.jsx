/**
 * Navbar.jsx
 * @author chaimaa (SCRUM-35 — Scrum Master, Home, Navbar & Card)
 * Floating glassmorphism pill navbar linked to all routes via react-router-dom.
 */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RepitoLogo from '../assets/RepitoLogo';
import {
  HomeIcon,
  UtensilsIcon,
  CalendarIcon,
  UsersIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from '../assets/icons';
import '../styles/Navbar.css';

const NAV_ITEMS = [
  { key: 'home', label: 'Accueil', path: '/home', icon: HomeIcon },
  { key: 'meals', label: 'Mes repas', path: '/meals', icon: UtensilsIcon },
  { key: 'plan', label: 'Ma semaine', path: '/plan', icon: CalendarIcon },
  { key: 'team', label: 'Équipe', path: '/team', icon: UsersIcon },
];

const Navbar = ({ username = 'Amina', onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const initial = (username?.trim()?.[0] || 'A').toUpperCase();

  const isRouteActive = (path) => {
    if (path === '/meals') return location.pathname.startsWith('/meals');
    return location.pathname === path;
  };

  const handleGo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="navbar-outer">
      <nav className="navbar-pill" aria-label="Navigation principale">
        {/* Left: Repito Logo */}
        <button
          type="button"
          className="nav-brand"
          onClick={() => handleGo('/home')}
          aria-label="Repito Accueil"
        >
          <RepitoLogo variant="orange" size={44} />
          <span className="nav-brand-name">Repito</span>
        </button>

        {/* Center: Navigation Links */}
        <ul className="nav-center-links">
          {NAV_ITEMS.map(({ key, label, path, icon: IconCmp }) => {
            const isActive = isRouteActive(path);
            return (
              <li key={key}>
                <button
                  type="button"
                  className={`nav-item${isActive ? ' active' : ''}`}
                  onClick={() => handleGo(path)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconCmp size={17} />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right: Aide glass pill + Gradient Avatar */}
        <div className="nav-right-controls">
          <button
            type="button"
            className="nav-help-pill"
            onClick={() => handleGo('/home')}
          >
            <HelpCircleIcon size={17} />
            <span>Aide</span>
          </button>

          <div className="nav-avatar-wrap">
            <button
              type="button"
              className="nav-avatar-btn"
              onClick={() => setUserMenuOpen((o) => !o)}
              aria-label={`Compte ${username}`}
              aria-expanded={userMenuOpen}
            >
              {initial}
            </button>

            {userMenuOpen && (
              <div className="nav-user-dropdown" role="menu">
                <div className="nav-user-info">
                  <strong>{username}</strong>
                </div>
                <button
                  type="button"
                  className="nav-dropdown-logout"
                  onClick={onLogout}
                  role="menuitem"
                >
                  <LogOutIcon size={15} />
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="nav-mobile-drawer" role="menu">
          {NAV_ITEMS.map(({ key, label, path, icon: IconCmp }) => (
            <button
              key={key}
              type="button"
              className={`nav-mobile-item${isRouteActive(path) ? ' active' : ''}`}
              onClick={() => handleGo(path)}
              role="menuitem"
            >
              <IconCmp size={18} />
              <span>{label}</span>
            </button>
          ))}
          <button
            type="button"
            className="nav-mobile-item"
            onClick={onLogout}
            role="menuitem"
          >
            <LogOutIcon size={18} />
            <span>Se déconnecter</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
