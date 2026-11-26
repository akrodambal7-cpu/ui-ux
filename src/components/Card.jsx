/**
 * Card.jsx
 * @author chaimaa (SCRUM-35 — Scrum Master, Home, Navbar & Card)
 * Reusable suggestion card matching the "Idées de l'IA pour ce soir" items in 02 Accueil.svg.
 * Size: height 98px, border-radius 30px, 80x80 circular food image, title, subtitle, dark pill CTA.
 */
const Card = ({ image, title, subtitle, actionLabel = 'Choisir', isSelected = false, onAction }) => {
  return (
    <article className={`idea-card${isSelected ? ' selected' : ''}`}>
      <div className="idea-card-thumb">
        <img src={image} alt={title} />
      </div>
      <div className="idea-card-info">
        <h3 className="idea-card-title">{title}</h3>
        <p className="idea-card-sub">{subtitle}</p>
      </div>
      <button
        type="button"
        className={`idea-card-btn${isSelected ? ' chosen' : ''}`}
        onClick={onAction}
      >
        {isSelected ? 'Choisi ✓' : actionLabel}
      </button>
    </article>
  );
};

export default Card;
