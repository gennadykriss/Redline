// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Basketball Icon */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center shadow-lg relative">
            {/* Basketball lines */}
            <div className="absolute inset-0 rounded-full">
              <svg 
                className="w-full h-full text-orange-600" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                {/* Vertical line */}
                <line x1="12" y1="2" x2="12" y2="22" />
                {/* Horizontal line */}
                <line x1="2" y1="12" x2="22" y2="12" />
                {/* Curved lines */}
                <path d="M2 12c0-5.5 4.5-10 10-10" />
                <path d="M22 12c0 5.5-4.5 10-10 10" />
                <path d="M12 2c5.5 0 10 4.5 10 10" />
                <path d="M12 22c-5.5 0-10-4.5-10-10" />
              </svg>
            </div>
            {/* Center circle */}
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700">{t('pageNotFound', language)}</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {t('notFoundMessage', language)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('goHome', language)}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('goBack', language)}
          </button>
        </div>

        {/* Quick Navigation Links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">{t('explorePopular', language)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/players"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('players', language)}
            </Link>
            <Link
              to="/teams"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {t('teams', language)}
            </Link>
            <Link
              to="/games"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-1v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-1" />
              </svg>
              {t('games', language)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
