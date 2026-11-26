/**
 * CreateMeal.jsx — Screen 04 ("04 Ajouter un repas.svg")
 * @author Fatima (SCRUM-8 — Créer un repas)
 * Route: "/meals/new"
 */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MealFormFields from '../components/MealFormFields';
import { useMeals } from '../context/MealsContext';
import { ArrowLeftIcon, CameraIcon } from '../assets/icons';
import stickerCamera from '../assets/images/sticker-camera.png';
import stickerPlus from '../assets/images/sticker-plus.png';
import '../styles/MealForm.css';

const AI_PRESETS = {
  chakhchoukha: {
    category: 'Plat',
    description:
      'Galette rougag émiettée dans une sauce rouge aux pois chiches et légumes.',
    ingredients: ['Rougag', 'Poulet', 'Pois chiches', 'Tomates'],
  },
  default: {
    category: 'Plat',
    description:
      'Recette maison savoureuse et équilibrée, idéale pour un repas en famille.',
    ingredients: ['Huile d’olive', 'Oignons', 'Épices douces', 'Herbes fraîches'],
  },
};

const CreateMeal = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { addMeal } = useMeals();

  const session = JSON.parse(sessionStorage.getItem('repito_session') || '{}');
  const username = session.username || 'Amina';

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Plat');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

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
    const key = name.trim().toLowerCase();
    const preset = AI_PRESETS[key] || AI_PRESETS.default;
    setCategory(preset.category);
    setDescription(
      key && !AI_PRESETS[key]
        ? `${name.trim()} préparé maison avec des ingrédients frais et de saison.`
        : preset.description
    );
    setIngredients(preset.ingredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Veuillez saisir le nom du repas.');
      return;
    }

    addMeal({
      name: name.trim(),
      category,
      subtitle: `${category} maison`,
      description: description.trim(),
      ingredients,
      image: photo,
    });
    navigate('/meals');
  };

  return (
    <div className="meal-form-page">
      <Navbar username={username} onLogout={handleLogout} />

      <main className="meal-form-main">
        {/* Left Peach Upload Card */}
        <section className="meal-visual-card meal-visual-card--create">
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
            src={stickerCamera}
            alt=""
            className="sticker-camera"
            aria-hidden="true"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden-file-input"
            onChange={handlePhotoUpload}
          />

          {photo ? (
            <div className="edit-photo-stage">
              <div className="edit-photo-circle">
                <img src={photo} alt={name || 'Aperçu du repas'} />
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
          ) : (
            <button
              type="button"
              className="upload-dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="upload-camera-circle">
                <CameraIcon size={22} />
              </span>
              <span className="upload-title">Ajouter une photo</span>
              <span className="upload-hint">JPEG ou PNG · 5 Mo max</span>
            </button>
          )}
        </section>

        {/* Right Form Column */}
        <section className="meal-form-col">
          <div className="meal-form-header">
            <h1 className="meal-form-title">
              Ajouter un <span>repas</span>
            </h1>
            <p className="meal-form-sub">
              Écrivez le nom, l&apos;IA peut remplir le reste.
            </p>
            <img
              src={stickerPlus}
              alt=""
              className="form-plus-sticker"
              aria-hidden="true"
            />
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
            submitLabel="Enregistrer le repas"
            error={error}
          />
        </section>
      </main>
    </div>
  );
};

export default CreateMeal;
