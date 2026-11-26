/**
 * EditMeal.jsx — Screen 05 ("05 Modifier un repas.svg")
 * @author seddik (SCRUM-9 — Modifier un repas)
 * Route: "/meals/edit/:id"
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MealFormFields from '../components/MealFormFields';
import { useMeals } from '../context/MealsContext';
import { ArrowLeftIcon, CameraIcon, StarIcon } from '../assets/icons';
import stickerPencil from '../assets/images/sticker-pencil.png';
import '../styles/MealForm.css';

const EditMeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { getMealById, updateMeal } = useMeals();

  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  const existingMeal = getMealById(id);

  const [name, setName] = useState(existingMeal?.name || '');
  const [category, setCategory] = useState(existingMeal?.category || 'Plat');
  const [description, setDescription] = useState(existingMeal?.description || '');
  const [ingredients, setIngredients] = useState(existingMeal?.ingredients || []);
  const [photo, setPhoto] = useState(existingMeal?.image || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingMeal) {
      setName(existingMeal.name);
      setCategory(existingMeal.category);
      setDescription(existingMeal.description || '');
      setIngredients(existingMeal.ingredients || []);
      setPhoto(existingMeal.image || null);
    }
  }, [existingMeal]);

  const handleLogout = () => {
    sessionStorage.removeItem('repito_session');
    navigate('/');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAiFill = () => {
    setDescription(
      `${name.trim() || 'Ce plat'} préparé maison avec des ingrédients frais et de saison.`
    );
    if (ingredients.length === 0) {
      setIngredients(['Huile d’olive', 'Oignons', 'Épices douces', 'Herbes fraîches']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Veuillez saisir le nom du repas.');
      return;
    }

    if (existingMeal) {
      updateMeal(existingMeal.id, {
        name: name.trim(),
        category,
        subtitle: existingMeal.subtitle || `${category} maison`,
        description: description.trim(),
        ingredients,
        image: photo,
      });
    }
    navigate('/meals');
  };

  return (
    <div className="meal-form-page">
      <Navbar username={username} onLogout={handleLogout} />

      <main className="meal-form-main">
        {/* Left Orange Photo Card */}
        <section className="meal-visual-card meal-visual-card--edit">
          <div className="meal-visual-clip" aria-hidden="true">
            <div className="meal-visual-deco" />
          </div>

          <button
            type="button"
            className="btn-back-pill"
            onClick={() => navigate('/meals')}
          >
            <ArrowLeftIcon size={15} />
            <span>Retour</span>
          </button>

          <img
            src={stickerPencil}
            alt=""
            className="sticker-pencil"
            aria-hidden="true"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden-file-input"
            onChange={handlePhotoUpload}
          />

          <div className="edit-photo-stage">
            <div className="edit-photo-circle">
              {photo && <img src={photo} alt={name || 'Aperçu du repas'} />}
            </div>

            <button
              type="button"
              className="btn-change-photo"
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraIcon size={16} />
              <span>Changer la photo</span>
            </button>
          </div>
        </section>

        {/* Right Edit Form Column */}
        <section className="meal-form-col">
          <div className="meal-form-header">
            <div className="edit-title-row">
              <h1 className="meal-form-title">{name || 'Modifier le repas'}</h1>
              <span className="meal-rating-badge">
                <StarIcon size={16} className="star-gold" />
                <span>{existingMeal?.rating || '4.5'}</span>
              </span>
            </div>
            <p className="meal-form-sub">
              {category} · modifié le {existingMeal?.updatedAt || '2 novembre'}
            </p>
          </div>

          <MealFormFields
            name={name}
            onNameChange={(val) => {
              setName(val);
              if (error) setError('');
            }}
            category={category}
            onCategoryChange={setCategory}
            description={description}
            onDescriptionChange={setDescription}
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            onAiFill={handleAiFill}
            onSubmit={handleSubmit}
            submitLabel="Enregistrer les modifications"
            error={error}
          />
        </section>
      </main>
    </div>
  );
};

export default EditMeal;
