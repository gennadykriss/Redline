// src/pages/TeamDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeams, fetchPlayers } from '../api/balldontlie';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import { teamLogos } from '../data/teamLogos';

function LoadingState() {
  const { language } = useLanguage();
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-xl text-gray-600">{t('loadingTeamDetails', language)}</p>
    </div>
  );
}

function PlayerCard({ player }) {
  const { language } = useLanguage();
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-lg">{player.first_name} {player.last_name}</h3>
      <p className="text-gray-600">#{player.jersey_number || 'N/A'}</p>
      <p className="text-sm text-gray-500">{player.position || `${t('position', language)} N/A`}</p>
      <div className="mt-2 text-sm">
        <p><span className="font-medium">{t('height', language)}:</span> {player.height || 'N/A'}</p>
        <p><span className="font-medium">{t('weight', language)}:</span> {player.weight ? `${player.weight} lbs` : 'N/A'}</p>
        <p><span className="font-medium">{t('country', language)}:</span> {player.country || 'N/A'}</p>
      </div>
    </div>
  );
}

export default function TeamDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  
  // Fetch team data
  const { data: teamsData, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Fetch players for this team
  const { data: playersData, isLoading: isLoadingPlayers } = useQuery({
    queryKey: ['team-players', id],
    queryFn: () => fetchPlayers(1, 100), // Get enough players to find team members
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });

  if (isLoadingTeams || isLoadingPlayers) return <LoadingState />;

  // Find the specific team
  const team = teamsData?.data?.find(t => t.id === parseInt(id));
  
  if (!team) {
    return (
      <div className="text-center mt-8">
        <p className="text-xl text-red-500">{t('teamNotFound', language)}</p>
      </div>
    );
  }

  // Filter players for this team
  const teamPlayers = playersData?.data?.filter(player => player.team.id === parseInt(id)) || [];

  // Team statistics
  const totalPlayers = teamPlayers.length;
  const positions = teamPlayers.reduce((acc, player) => {
    const pos = player.position || 'Unknown';
    acc[pos] = (acc[pos] || 0) + 1;
    return acc;
  }, {});

  const averageHeight = teamPlayers
    .filter(p => p.height)
    .reduce((sum, p, _, arr) => {
      const height = parseFloat(p.height.split('-')[0]) + parseFloat(p.height.split('-')[1]) / 12;
      return sum + height / arr.length;
    }, 0);

  const averageWeight = teamPlayers
    .filter(p => p.weight)
    .reduce((sum, p, _, arr) => sum + p.weight / arr.length, 0);

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24">
            <img
              src={teamLogos[team.abbreviation]}
              alt={`${team.full_name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{team.full_name}</h1>
            <p className="text-xl text-gray-600">{team.city}</p>
            <p className="text-lg text-gray-500">{team.abbreviation}</p>
            <div className="mt-2">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {team.conference} {t('conference', language)}
              </span>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                {team.division} {t('division', language)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600">{t('totalPlayers', language)}</h3>
          <p className="text-3xl font-bold mt-2">{totalPlayers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600">{t('averageHeight', language)}</h3>
          <p className="text-3xl font-bold mt-2">
            {averageHeight ? `${Math.floor(averageHeight)}'${Math.round((averageHeight % 1) * 12)}"` : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600">{t('averageWeight', language)}</h3>
          <p className="text-3xl font-bold mt-2">
            {averageWeight ? `${Math.round(averageWeight)} lbs` : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600">{t('mostCommonPosition', language)}</h3>
          <p className="text-3xl font-bold mt-2">
            {Object.keys(positions).length > 0 
              ? Object.entries(positions).reduce((a, b) => positions[a[0]] > positions[b[0]] ? a : b)[0]
              : 'N/A'
            }
          </p>
        </div>
      </div>

      {/* Position Breakdown */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">{t('positionBreakdown', language)}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(positions).map(([position, count]) => (
            <div key={position} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-lg">{count}</p>
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Roster */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">{t('roster', language)} ({totalPlayers} {t('players', language)})</h2>
        {teamPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teamPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('noPlayersFound', language)}.</p>
        )}
      </div>
    </div>
  );
}
