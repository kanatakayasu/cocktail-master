import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));
const ClassificationPage = lazy(() => import('./pages/ClassificationPage'));
const GameTopPage = lazy(() => import('./pages/game/GameTopPage'));
const GamePlayPage = lazy(() => import('./pages/game/GamePlayPage'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">🍸</div>
        <p className="text-white/60">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/game" element={<GameTopPage />} />
          <Route path="/game/play" element={<GamePlayPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
