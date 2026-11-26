/**
 * Button.jsx
 * Reusable pill button component matching the Repito SVG design system.
 * Variants: 'dark' | 'white' | 'pill-arrow' | 'outline'
 */
const Button = ({
  children,
  type = 'button',
  variant = 'dark',
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`repito-btn repito-btn--${variant} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
