import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import FavoritesPage from './pages/FavoritesPage';
import DonatePage from './pages/DonatePage';
import VideosPage from './pages/VideosPage';
import LibraryPage from './pages/LibraryPage';
import MagazinesPage from './pages/MagazinesPage';
import FitnessPage from './pages/FitnessPage';
import ArabCuisinePage from './pages/ArabCuisinePage';
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
        <Route path="library" element={<LibraryPage />} />
        <Route path="magazines" element={<MagazinesPage />} />
        <Route path="fitness" element={<FitnessPage />} />
        <Route path="arab-cuisine" element={<ArabCuisinePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
