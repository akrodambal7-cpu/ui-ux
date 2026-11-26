/**
 * App.jsx
 * @author Aberrahmane (SCRUM-17, Auth, Design System & Routing)
 * Root router connecting all Repito screens with shared MealsProvider state.
 *
 * Routes:
 *   "/"               → 01 Connexion (Login)
 *   "/home"           → 02 Accueil (Home)
 *   "/meals"          → 03 Mes repas + 06 Supprimer modal
 *   "/meals/new"      → 04 Ajouter un repas (CreateMeal)
 *   "/meals/edit/:id" → 05 Modifier un repas (EditMeal)
 *   "/plan"           → 07 Planifier un repas
 *   "/team"           → 08 Équipe du projet
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MealsProvider } from './context/MealsContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Meals from './pages/Meals';
import CreateMeal from './pages/CreateMeal';
import EditMeal from './pages/EditMeal';
import PlanMeal from './pages/PlanMeal';
import Team from './pages/Team';

const ProtectedRoute = ({ children }) => {
  const session = sessionStorage.getItem('repito_session');
  return session ? children : <Navigate to="/" replace />;
};

const App = () => (
  <MealsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <Meals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meals/new"
          element={
            <ProtectedRoute>
              <CreateMeal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meals/edit/:id"
          element={
            <ProtectedRoute>
              <EditMeal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <PlanMeal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </MealsProvider>
);

export default App;
