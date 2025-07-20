// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { teamLogos } from '../data/teamLogos';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import StatCard from '../components/StatCard';

// Custom colors for charts
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF9F43', '#6C5CE7', '#00B894'];

// Enhanced data structure for multiple seasons
const seasonData = {
  '2024-25': {
    totalPlayers: 540,
    averageTeamSize: 18.0,
    numTeams: 30,
    totalGames: 1230,
    totalRevenue: '8.8B',
    avgAttendance: 18500,
    
    // More realistic team roster variations
    teamRosterData: [
      { name: 'LAL', value: 17, injuries: 2 },
      { name: 'GSW', value: 18, injuries: 1 },
      { name: 'BOS', value: 18, injuries: 0 },
      { name: 'MIA', value: 16, injuries: 3 },
      { name: 'CHI', value: 17, injuries: 2 },
      { name: 'NYK', value: 18, injuries: 1 },
      { name: 'LAC', value: 15, injuries: 4 },
      { name: 'PHX', value: 18, injuries: 0 },
      { name: 'MIL', value: 17, injuries: 2 },
      { name: 'DEN', value: 18, injuries: 1 },
      { name: 'DAL', value: 16, injuries: 3 },
      { name: 'PHI', value: 17, injuries: 2 },
      { name: 'ATL', value: 18, injuries: 1 },
      { name: 'TOR', value: 17, injuries: 2 },
      { name: 'CLE', value: 18, injuries: 0 },
    ],
    
    // Top stat leaders with multiple categories
    individualLeaders: [
      { name: 'Luka Dončić', ppg: 33.2, rpg: 9.1, apg: 8.8, team: 'DAL' },
      { name: 'Giannis Antetokounmpo', ppg: 31.7, rpg: 11.2, apg: 6.1, team: 'MIL' },
      { name: 'Shai Gilgeous-Alexander', ppg: 30.9, rpg: 5.4, apg: 6.3, team: 'OKC' },
      { name: 'Jayson Tatum', ppg: 28.4, rpg: 8.7, apg: 4.8, team: 'BOS' },
      { name: 'Anthony Edwards', ppg: 27.8, rpg: 5.9, apg: 5.2, team: 'MIN' },
      { name: 'Nikola Jokić', ppg: 26.3, rpg: 12.8, apg: 9.9, team: 'DEN' },
      { name: 'Paolo Banchero', ppg: 25.1, rpg: 6.8, apg: 5.7, team: 'ORL' },
      { name: 'Tyler Herro', ppg: 24.9, rpg: 5.2, apg: 4.1, team: 'MIA' },
    ],
    
    // Conference standings
    conferenceStandings: [
      { conference: 'Eastern', wins: 720, losses: 510 },
      { conference: 'Western', wins: 710, losses: 520 },
    ],
    
    // Monthly attendance data
    attendanceData: [
      { month: 'Oct', attendance: 17800, capacity: 95.2 },
      { month: 'Nov', attendance: 18200, capacity: 97.1 },
      { month: 'Dec', attendance: 18900, capacity: 99.5 },
      { month: 'Jan', attendance: 18100, capacity: 96.8 },
      { month: 'Feb', attendance: 18600, capacity: 98.2 },
      { month: 'Mar', attendance: 19100, capacity: 99.8 },
    ]
  },
  
  '2023-24': {
    totalPlayers: 529,
    averageTeamSize: 17.6,
    numTeams: 30,
    totalGames: 1230,
    totalRevenue: '8.3B',
    avgAttendance: 18200,
    
    teamRosterData: [
      { name: 'LAL', value: 18, injuries: 1 },
      { name: 'GSW', value: 17, injuries: 2 },
      { name: 'BOS', value: 18, injuries: 0 },
      { name: 'MIA', value: 17, injuries: 2 },
      { name: 'CHI', value: 18, injuries: 1 },
      { name: 'NYK', value: 16, injuries: 3 },
      { name: 'LAC', value: 17, injuries: 2 },
      { name: 'PHX', value: 18, injuries: 0 },
      { name: 'MIL', value: 17, injuries: 2 },
      { name: 'DEN', value: 18, injuries: 1 },
      { name: 'DAL', value: 17, injuries: 2 },
      { name: 'PHI', value: 16, injuries: 3 },
      { name: 'ATL', value: 18, injuries: 1 },
      { name: 'TOR', value: 17, injuries: 2 },
      { name: 'CLE', value: 18, injuries: 0 },
    ],
    
    individualLeaders: [
      { name: 'Luka Dončić', ppg: 32.4, rpg: 8.2, apg: 9.8, team: 'DAL' },
      { name: 'Shai Gilgeous-Alexander', ppg: 30.1, rpg: 5.5, apg: 6.2, team: 'OKC' },
      { name: 'Giannis Antetokounmpo', ppg: 30.4, rpg: 11.5, apg: 6.5, team: 'MIL' },
      { name: 'Jayson Tatum', ppg: 26.9, rpg: 8.1, apg: 4.9, team: 'BOS' },
      { name: 'Domantas Sabonis', ppg: 19.1, rpg: 13.7, apg: 8.2, team: 'SAC' },
      { name: 'Nikola Jokić', ppg: 26.4, rpg: 12.4, apg: 9.0, team: 'DEN' },
      { name: 'Anthony Edwards', ppg: 25.9, rpg: 5.4, apg: 5.1, team: 'MIN' },
      { name: 'Donovan Mitchell', ppg: 26.6, rpg: 5.1, apg: 6.1, team: 'CLE' },
    ],
    
    conferenceStandings: [
      { conference: 'Eastern', wins: 705, losses: 525 },
      { conference: 'Western', wins: 725, losses: 505 },
    ],
    
    attendanceData: [
      { month: 'Oct', attendance: 17500, capacity: 94.1 },
      { month: 'Nov', attendance: 17900, capacity: 96.2 },
      { month: 'Dec', attendance: 18400, capacity: 98.1 },
      { month: 'Jan', attendance: 17800, capacity: 95.7 },
      { month: 'Feb', attendance: 18300, capacity: 97.8 },
      { month: 'Mar', attendance: 18800, capacity: 99.2 },
    ]
  },
  
  '2022-23': {
    totalPlayers: 518,
    averageTeamSize: 17.3,
    numTeams: 30,
    totalGames: 1230,
    totalRevenue: '7.9B',
    avgAttendance: 17800,
    
    teamRosterData: [
      { name: 'LAL', value: 17, injuries: 3 },
      { name: 'GSW', value: 18, injuries: 1 },
      { name: 'BOS', value: 17, injuries: 2 },
      { name: 'MIA', value: 18, injuries: 0 },
      { name: 'CHI', value: 16, injuries: 4 },
      { name: 'NYK', value: 17, injuries: 2 },
      { name: 'LAC', value: 16, injuries: 3 },
      { name: 'PHX', value: 17, injuries: 2 },
      { name: 'MIL', value: 18, injuries: 1 },
      { name: 'DEN', value: 18, injuries: 0 },
      { name: 'DAL', value: 17, injuries: 2 },
      { name: 'PHI', value: 17, injuries: 2 },
      { name: 'ATL', value: 16, injuries: 3 },
      { name: 'TOR', value: 18, injuries: 1 },
      { name: 'CLE', value: 17, injuries: 2 },
    ],
    
    individualLeaders: [
      { name: 'Joel Embiid', ppg: 33.1, rpg: 10.2, apg: 4.2, team: 'PHI' },
      { name: 'Luka Dončić', ppg: 32.4, rpg: 8.6, apg: 8.0, team: 'DAL' },
      { name: 'Domantas Sabonis', ppg: 19.1, rpg: 12.3, apg: 7.3, team: 'SAC' },
      { name: 'Giannis Antetokounmpo', ppg: 31.1, rpg: 11.8, apg: 5.7, team: 'MIL' },
      { name: 'Jayson Tatum', ppg: 30.1, rpg: 8.8, apg: 4.6, team: 'BOS' },
      { name: 'Nikola Jokić', ppg: 24.5, rpg: 11.8, apg: 9.8, team: 'DEN' },
      { name: 'Shai Gilgeous-Alexander', ppg: 31.4, rpg: 4.8, apg: 5.5, team: 'OKC' },
      { name: 'Lauri Markkanen', ppg: 25.6, rpg: 8.6, apg: 1.9, team: 'UTA' },
    ],
    
    conferenceStandings: [
      { conference: 'Eastern', wins: 690, losses: 540 },
      { conference: 'Western', wins: 740, losses: 490 },
    ],
    
    attendanceData: [
      { month: 'Oct', attendance: 17200, capacity: 92.8 },
      { month: 'Nov', attendance: 17600, capacity: 94.9 },
      { month: 'Dec', attendance: 18100, capacity: 97.2 },
      { month: 'Jan', attendance: 17400, capacity: 93.5 },
      { month: 'Feb', attendance: 17900, capacity: 96.1 },
      { month: 'Mar', attendance: 18500, capacity: 98.9 },
    ]
  }
};

export default function Dashboard() {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedMetric, setSelectedMetric] = useState('ppg');
  
  const currentData = seasonData[selectedYear];
  const years = Object.keys(seasonData);

  // Position distribution with translation
  const positionDistribution = [
    { name: t('guards', language), value: 35 },
    { name: t('forwards', language), value: 40 },
    { name: t('centers', language), value: 25 },
  ];

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Dynamic dashboard title based on selected year
  const getDashboardTitle = () => {
    if (language === 'fr') {
      return `Tableau de bord NBA ${selectedYear}`;
    }
    return `NBA ${selectedYear} Dashboard`;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Year Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">{getDashboardTitle()}</h1>
        
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            {t('season', language) || 'Season'}:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('totalActivePlayers', language)} 
          value={currentData.totalPlayers} 
          change={selectedYear === '2024-25' ? +11 : selectedYear === '2023-24' ? +11 : +7}
        />
        <StatCard 
          title={t('averageTeamSize', language)} 
          value={currentData.averageTeamSize} 
          change={selectedYear === '2024-25' ? +0.4 : selectedYear === '2023-24' ? +0.3 : +0.1}
        />
        <StatCard 
          title={t('totalGames', language) || 'Total Games'} 
          value={currentData.totalGames} 
          change={0}
        />
        <StatCard 
          title={t('avgAttendance', language) || 'Avg Attendance'} 
          value={formatNumber(currentData.avgAttendance)} 
          change={selectedYear === '2024-25' ? +300 : selectedYear === '2023-24' ? +400 : +200}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1) Team Health & Roster Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('teamHealthStatus', language) || 'Team Health & Roster Status'}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData.teamRosterData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'value' ? t('activePlayers', language) || 'Active Players' : 
                    name === 'injuries' ? t('injuries', language) || 'Injuries' : name
                  ]}
                />
                <Legend />
                <Bar dataKey="value" fill={COLORS[0]} name={t('activePlayers', language) || 'Active Players'} />
                <Bar dataKey="injuries" fill={COLORS[3]} name={t('injuries', language) || 'Injuries'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2) Player Performance Leaders with Metric Selector */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('playerPerformance', language) || 'Player Performance'}</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="ppg">{t('points', language)}</option>
              <option value="rpg">{t('rebounds', language)}</option>
              <option value="apg">{t('assists', language)}</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData.individualLeaders.slice(0, 6)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  interval={0} 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value.toFixed(1), 
                    selectedMetric === 'ppg' ? t('points', language) : 
                    selectedMetric === 'rpg' ? t('rebounds', language) : 
                    t('assists', language)
                  ]}
                  labelFormatter={(label) => `Player: ${label}`}
                />
                <Bar dataKey={selectedMetric} fill={COLORS[1]}>
                  {currentData.individualLeaders.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3) Monthly Attendance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('attendanceTrends', language) || 'Monthly Attendance Trends'}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentData.attendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'attendance' ? formatNumber(value) : `${value}%`,
                    name === 'attendance' ? t('attendance', language) || 'Attendance' : 
                    t('capacity', language) || 'Capacity %'
                  ]}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke={COLORS[2]} 
                  fill={COLORS[2]} 
                  fillOpacity={0.6}
                  name={t('attendance', language) || 'Attendance'}
                />
                <Line 
                  type="monotone" 
                  dataKey="capacity" 
                  stroke={COLORS[4]} 
                  strokeWidth={3}
                  name={t('capacity', language) || 'Capacity %'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4) Position Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('positionDistribution', language)}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={positionDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {positionDistribution.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5) Teams Overview (logos) */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{t('teamsOverview', language)}</h2>
          <div className="h-80 grid grid-cols-6 gap-4 overflow-y-auto">
            {Object.entries(teamLogos).map(([abbr, logo]) => (
              <div key={abbr} className="flex flex-col items-center">
                <img src={logo} alt={abbr} className="w-12 h-12 object-contain" />
                <span className="text-xs mt-1 font-medium">{abbr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
