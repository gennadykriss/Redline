// src/pages/TeamsList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTeams } from '../hooks/useTeams';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import { teamLogos } from '../data/teamLogos';

// Division configuration
const divisions = {
  Atlantic: ['BOS', 'BKN', 'NYK', 'PHI', 'TOR'],
  Central: ['CHI', 'CLE', 'DET', 'IND', 'MIL'],
  Southeast: ['ATL', 'CHA', 'MIA', 'ORL', 'WAS'],
  Northwest: ['DEN', 'MIN', 'OKC', 'POR', 'UTA'],
  Pacific: ['GSW', 'LAC', 'LAL', 'PHX', 'SAC'],
  Southwest: ['DAL', 'HOU', 'MEM', 'NOP', 'SAS']
};

function TeamCard({ team }) {
  return (
    <Link key={team.id} to={`/teams/${team.id}`}>
      <div
        className={classNames(
          'p-4 border rounded-lg hover:shadow-lg transition',
          'bg-white space-y-3'
        )}
      >
        <div className="aspect-square w-24 mx-auto">
          <img
            src={teamLogos[team.abbreviation]}
            alt={`${team.full_name} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{team.full_name}</h3>
          <p className="text-sm text-gray-600">
            {team.city} — {team.abbreviation}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function TeamsList() {
  const { data, isLoading, error } = useTeams();
  const { language } = useLanguage();

  if (isLoading) return <p className="text-center mt-8">{t('loadingTeams', language)}</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{t('errorLoadingTeams', language)}: {error.message}</p>;

  // Group teams by division
  const teamsByDivision = Object.entries(divisions).reduce((acc, [division, abbrevs]) => {
    acc[division] = data.data.filter(team => abbrevs.includes(team.abbreviation));
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(teamsByDivision).map(([division, teams]) => (
        <div key={division} className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{t(division.toLowerCase(), language)} {t('division', language)}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
