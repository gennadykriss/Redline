import React from 'react';

export default function StatCard({ title, value, change, className = '' }) {
  const isPositive = change > 0;
  return (
    <div className={`p-6 rounded-lg bg-white shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}
