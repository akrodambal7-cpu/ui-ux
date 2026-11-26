/**
 * MealFormFields.jsx
 * @author Fatima (SCRUM-8 Créer un repas)
 * Shared form fields (name + AI assist, category pills, description, ingredients, save CTA)
 * used by CreateMeal (SCRUM-8) and EditMeal (SCRUM-9).
 */
import { useState } from 'react';
import { SparkleIcon, CheckIcon, PlusIcon, XIcon } from '../assets/icons';
import stickerRobot from '../assets/images/sticker-robot.png';

const CATEGORIES = ['Entrée', 'Plat', 'Dessert'];

const MealFormFields = ({
  name,
  onNameChange,
  category,
  onCategoryChange,
  description,
  onDescriptionChange,
  ingredients,
  onIngredientsChange,
  onAiFill,
  onSubmit,
  submitLabel,
  error,
}) => {
  const [addingIng, setAddingIng] = useState(false);
  const [newIng, setNewIng] = useState('');

  const handleRemoveIng = (idx) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== idx));
  };

  const handleAddIngSubmit = (e) => {
    e.preventDefault();
    if (newIng.trim()) {
      onIngredientsChange([...ingredients, newIng.trim()]);
      setNewIng('');
    }
    setAddingIng(false);
  };

  return (
    <form className="meal-form-fields" onSubmit={onSubmit}>
      {/* Name + AI Helper Button */}
      <div className="meal-field-group">
        <label className="meal-field-label" htmlFor="meal-name">
          Nom du repas
        </label>
        <div className="name-ai-row">
          <div className="name-input-wrap">
            <input
              id="meal-name"
              type="text"
              className={`meal-input${error ? ' error' : ''}`}
              placeholder="Ex : Chakhchoukha"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
            <img
              src={stickerRobot}
              alt=""
              className="form-robot-sticker"
              aria-hidden="true"
            />
          </div>

          <button type="button" className="btn-ai-assist" onClick={onAiFill}>
            <SparkleIcon size={15} />
            <span>Aide de l&apos;IA</span>
          </button>
        </div>
        {error && <span className="meal-field-error">{error}</span>}
      </div>

      {/* Category Selector */}
      <div className="meal-field-group">
        <span className="meal-field-label">Catégorie (choisissez-en une)</span>
        <div className="category-pills-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill${category === cat ? ' active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="meal-field-group">
        <label className="meal-field-label" htmlFor="meal-desc">
          Description
        </label>
        <textarea
          id="meal-desc"
          rows={3}
          className="meal-textarea"
          placeholder="Décrivez votre recette..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      {/* Ingredients */}
      <div className="meal-field-group">
        <span className="meal-field-label">Ingrédients</span>
        <div className="ingredients-wrap">
          {ingredients.map((ing, idx) => (
            <span key={`${ing}-${idx}`} className="ingredient-chip">
              <span>{ing}</span>
              <button
                type="button"
                className="ingredient-remove"
                onClick={() => handleRemoveIng(idx)}
                aria-label={`Retirer ${ing}`}
              >
                <XIcon size={12} />
              </button>
            </span>
          ))}

          {addingIng ? (
            <span className="ingredient-add-inline">
              <input
                type="text"
                value={newIng}
                onChange={(e) => setNewIng(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddIngSubmit(e);
                  if (e.key === 'Escape') setAddingIng(false);
                }}
                placeholder="Ingrédient..."
                autoFocus
              />
              <button type="button" onClick={handleAddIngSubmit}>
                OK
              </button>
            </span>
          ) : (
            <button
              type="button"
              className="btn-add-ingredient"
              onClick={() => setAddingIng(true)}
            >
              <PlusIcon size={13} />
              <span>Ajouter</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Pill CTA */}
      <button type="submit" className="btn-save-meal">
        <span>{submitLabel}</span>
        <span className="btn-save-circle" aria-hidden="true">
          <CheckIcon size={15} />
        </span>
      </button>
    </form>
  );
};

export default MealFormFields;
