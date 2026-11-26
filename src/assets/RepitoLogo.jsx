/**
 * RepitoLogo.jsx
 * Exact reproduction of the "R" mark from 01 Connexion.svg & 02 Accueil.svg.
 * - variant="white": 48x48 white rounded square (rx=15), orange #FF6B3D "R"
 * - variant="orange": 44x44 orange #FF6B3D rounded square (rx=14), white stroked/clean "R"
 */

const RepitoLogo = ({ variant = 'orange', size = 44 }) => {
  if (variant === 'white') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Repito logo"
      >
        <rect width="48" height="48" rx="15" fill="#FFFFFF" />
        <path
          d="M17.2 33.5V14.5H24.6C27.8 14.5 29.6 16.2 29.6 19C29.6 21.1 28.4 22.8 26.2 23.6L30.2 33.5H26.2L22.6 24.4H20.8V33.5H17.2ZM20.8 21.3H23.7C25.9 21.3 26.8 20.3 26.8 18.9C26.8 17.5 25.9 16.6 23.7 16.6H20.8V21.3Z"
          fill="#FF6B3D"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Repito logo"
    >
      <rect width="44" height="44" rx="14" fill="#FF6B3D" />
      <path
        d="M15 31V13H23C26.038 13 28.5 15.462 28.5 18.5C28.5 21.538 26.038 24 23 24H15M23 24L30 31"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RepitoLogo;
