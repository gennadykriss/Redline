// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames';

// import your pages/components
import NavBar from './components/NavBar';
import Footer      from './components/Footer';
import Dashboard from './pages/Dashboard';
import PlayersList from './pages/PlayersList';
import PlayerDetail from './pages/PlayerDetail';
import TeamsList from './pages/TeamsList';
import TeamDetail from './pages/TeamDetail';
import GamesList from './pages/GamesList';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className={classNames('min-h-screen', 'bg-gray-50', 'text-gray-800', 'flex', 'flex-col')}>
        {/* Global navigation/header */}
        <NavBar />

        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-12">
          <Routes>
            {/* Dashboard as homepage */}
            <Route path="/" element={<Dashboard />} />

            {/* players */}
            <Route path="/players" element={<PlayersList />} />
            <Route path="/players/:id" element={<PlayerDetail />} />

            {/* teams */}
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/teams/:id" element={<TeamDetail />} />

            {/* games */}
            <Route path="/games" element={<GamesList />} />

            {/* 404 - catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
