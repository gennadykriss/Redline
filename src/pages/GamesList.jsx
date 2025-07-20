// src/pages/GamesList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../hooks/useGames';
import classNames from 'classnames';
import { teamLogos } from '../data/teamLogos';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

function GameCard({ game, language }) {
  const date = new Date(game.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isGameComplete = game.status === "Final";
  const homeTeamWon = isGameComplete && game.home_team_score > game.visitor_team_score;
  const visitorTeamWon = isGameComplete && game.visitor_team_score > game.home_team_score;

  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition bg-white space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <p className="text-sm font-medium text-gray-600">{date}</p>
        <p className="text-sm font-medium text-gray-600">{game.status}</p>
      </div>
      
      {/* Teams */}
      <div className="space-y-4">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <img
                src={teamLogos[game.home_team.abbreviation]}
                alt={game.home_team.full_name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={classNames(
              "font-semibold",
              homeTeamWon && "text-green-600"
            )}>
              {game.home_team.full_name}
            </span>
          </div>
          <span className={classNames(
            "font-bold text-lg",
            homeTeamWon && "text-green-600"
          )}>
            {game.home_team_score}
          </span>
        </div>

        {/* Visitor Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <img
                src={teamLogos[game.visitor_team.abbreviation]}
                alt={game.visitor_team.full_name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className={classNames(
              "font-semibold",
              visitorTeamWon && "text-green-600"
            )}>
              {game.visitor_team.full_name}
            </span>
          </div>
          <span className={classNames(
            "font-bold text-lg",
            visitorTeamWon && "text-green-600"
          )}>
            {game.visitor_team_score}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GamesList() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState('');
  const { data, isLoading, error } = useGames(currentPage, '', searchDate);

  if (isLoading) return <p className="text-center mt-8">{t('loading', language)}…</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{t('error', language)} loading games: {error.message}</p>;
  if (!data?.data || data.data.length === 0) return <p className="text-center mt-8">{t('noResults', language)}</p>;

  // Games are already sorted by date (most recent first) from the backend
  const games = data.data;

  const totalCount = data?.meta?.total_count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / 25));

  // Reset to page 1 when search date changes
  const handleDateChange = (newDate) => {
    setSearchDate(newDate);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Date Search */}
      <div className="flex flex-col space-y-4">
        <div className="relative max-w-md">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder={t('searchByDate', language)}
          />
          {searchDate && (
            <button
              onClick={() => handleDateChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchDate && (
          <p className="text-sm text-gray-600">
            {t('showingGamesFor', language)} {new Date(searchDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <Link key={game.id} to={`/games/${game.id}`}>
            <GameCard game={game} language={language} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={isLoading || currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {t('previous', language)}
          </button>
          <button
            onClick={() => setCurrentPage(page => page + 1)}
            disabled={isLoading || currentPage >= totalPages}
            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {t('next', language)}
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {isLoading ? (
                `${t('loading', language)}...`
              ) : (
                <>
                  {t('showing', language)} {t('page', language).toLowerCase()} <span className="font-medium">{currentPage}</span> {t('of', language)}{' '}
                  <span className="font-medium">{totalPages}</span> •{' '}
                  <span className="font-medium">{totalCount}</span> {t('totalGamesLower', language)}
                  {searchDate && (
                    <span className="text-gray-500"> {t('for', language)} {new Date(searchDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </>
              )}
            </p>
          </div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(page => page + 1)}
                disabled={currentPage >= totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
    </div>
  );
}

