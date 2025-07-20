// src/components/PlayerTable.jsx
import React from 'react'
import classNames from 'classnames'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../utils/translations'

export default function PlayerTable({ players }) {
  const { language } = useLanguage();

  // Define the columns you want to show, including nested team fields
  const COLUMNS = [
    { key: 'id',             label: 'ID',           type: 'number',  accessor: p => p.id },
    { key: 'first_name',     label: t('firstName', language) || 'First Name',   type: 'string',  accessor: p => p.first_name },
    { key: 'last_name',      label: t('lastName', language) || 'Last Name',    type: 'string',  accessor: p => p.last_name },
    { key: 'position',       label: t('position', language),     type: 'string',  accessor: p => p.position },
    { key: 'height',         label: t('height', language),       type: 'string',  accessor: p => p.height },
    { key: 'weight',         label: t('weight', language),       type: 'number',  accessor: p => Number(p.weight) },
    { key: 'jersey_number',  label: t('jerseyNumber', language) || 'Jersey #',     type: 'number',  accessor: p => Number(p.jersey_number) },
    { key: 'college',        label: t('college', language) || 'College',      type: 'string',  accessor: p => p.college },
    { key: 'country',        label: t('country', language),      type: 'string',  accessor: p => p.country },
    { key: 'draft_year',     label: t('draftYear', language) || 'Draft Year',   type: 'number',  accessor: p => p.draft_year },
    { key: 'draft_round',    label: t('draftRound', language) || 'Draft Round',  type: 'number',  accessor: p => p.draft_round },
    { key: 'draft_number',   label: t('draftPick', language) || 'Draft Pick',   type: 'number',  accessor: p => p.draft_number },
    { key: 'team_abbr',      label: t('club', language) || 'Club',         type: 'string',  accessor: p => p.team.abbreviation },
    { key: 'team_full_name', label: t('teamName', language) || 'Team Name',    type: 'string',  accessor: p => p.team.full_name },
    { key: 'team_city',      label: t('city', language) || 'City',         type: 'string',  accessor: p => p.team.city },
    { key: 'team_conf',      label: t('conference', language),   type: 'string',  accessor: p => p.team.conference },
    { key: 'team_div',       label: t('division', language),     type: 'string',  accessor: p => p.team.division },
  ];
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  className="border-b px-3 py-2 text-left text-sm font-semibold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id} className="hover:bg-red-50">
                {COLUMNS.map(col => {
                  const v = col.accessor(p)
                  return (
                    <td
                      key={col.key}
                      className={classNames('px-3 py-2 text-sm', {
                        // highlight jersey number column, for example
                        'font-bold text-red-600': col.key === 'jersey_number'
                      })}
                    >
                      {v ?? '—'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
