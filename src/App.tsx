import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import FavoritesPage from './pages/FavoritesPage';
import DonatePage from './pages/DonatePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import VideosPage from './pages/VideosPage';
import MagazinesPage from './pages/MagazinesPage';
import FitnessPage from './pages/FitnessPage';
import ArabCuisinePage from './pages/ArabCuisinePage';
import FilmLibraryPage from './pages/FilmLibraryPage';
import SkillsAcademyPage from './pages/SkillsAcademyPage';
import WorldMarketsPage from './pages/WorldMarketsPage';
import ChefHallPage from './pages/ChefHallPage';
import DrinksLibraryPage from './pages/DrinksLibraryPage';
import SaucesLibraryPage from './pages/SaucesLibraryPage';
import ShortsLibraryPage from './pages/ShortsLibraryPage';
import WorkoutLibraryPage from './pages/WorkoutLibraryPage';
import MichelinPage from './pages/MichelinPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipes" element={<SearchPage />} />
        <Route path="recipe/:id" element={<RecipeDetailPage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="magazines" element={<MagazinesPage />} />
        <Route path="fitness" element={<FitnessPage />} />
        <Route path="arab-cuisine" element={<ArabCuisinePage />} />
        <Route path="films" element={<FilmLibraryPage />} />
        <Route path="academy" element={<SkillsAcademyPage />} />
        <Route path="markets" element={<WorldMarketsPage />} />
        <Route path="chefs" element={<ChefHallPage />} />
        <Route path="drinks" element={<DrinksLibraryPage />} />
        <Route path="sauces" element={<SaucesLibraryPage />} />
        <Route path="shorts" element={<ShortsLibraryPage />} />
        <Route path="workouts" element={<WorkoutLibraryPage />} />
        <Route path="michelin" element={<MichelinPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
