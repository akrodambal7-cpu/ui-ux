/**
 * DeleteMealModal.jsx — Screen 06 ("06 Supprimer un repas.svg")
 * @author seddik (SCRUM-15 — Supprimer un repas)
 * Blurred-backdrop confirmation modal for removing a meal from the catalog.
 */
import { TrashIcon } from '../assets/icons';
import stickerTrash from '../assets/images/sticker-trash.png';
import '../styles/DeleteMealModal.css';

const DeleteMealModal = ({ meal, onConfirm, onCancel }) => {
  if (!meal) return null;

  return (
    <div
      className="delete-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={onCancel}
    >
      <div className="delete-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Circular dish image overlapping top center */}
        <div className="delete-modal-thumb">
          <img src={meal.image} alt={meal.name} />
        </div>

        {/* Trash sticker top-right */}
        <img
          src={stickerTrash}
          alt=""
          className="delete-modal-sticker"
          aria-hidden="true"
        />

        <h2 id="delete-modal-title" className="delete-modal-title">
          Supprimer «&nbsp;{meal.name}&nbsp;»&nbsp;?
        </h2>

        <p className="delete-modal-sub">
          Il ne sera plus dans votre liste.
          <br />
          Les menus déjà prévus ne changent pas.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="btn-delete-confirm"
            onClick={() => onConfirm(meal.id)}
          >
            <span>Oui, supprimer</span>
            <span className="btn-delete-icon-circle" aria-hidden="true">
              <TrashIcon size={17} />
            </span>
          </button>

          <button
            type="button"
            className="btn-delete-cancel"
            onClick={onCancel}
          >
            Non, garder le repas
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMealModal;
