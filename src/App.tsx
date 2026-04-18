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
const WhiskyHomePage = lazy(() => import('./pages/whisky/WhiskyHomePage'));
const WhiskyEncyclopediaPage = lazy(() => import('./pages/whisky/WhiskyEncyclopediaPage'));
const WhiskyQuizPage = lazy(() => import('./pages/whisky/WhiskyQuizPage'));
const WhiskyFlashcardsPage = lazy(() => import('./pages/whisky/WhiskyFlashcardsPage'));
const WhiskyClassificationPage = lazy(() => import('./pages/whisky/WhiskyClassificationPage'));

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
          <Route path="/whisky" element={<WhiskyHomePage />} />
          <Route path="/whisky/encyclopedia" element={<WhiskyEncyclopediaPage />} />
          <Route path="/whisky/quiz" element={<WhiskyQuizPage />} />
          <Route path="/whisky/flashcards" element={<WhiskyFlashcardsPage />} />
          <Route path="/whisky/classification" element={<WhiskyClassificationPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
