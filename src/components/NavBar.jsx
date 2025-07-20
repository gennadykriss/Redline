// src/components/NavBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

export default function NavBar() {
  const { language, toggleLanguage, isEnglish } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { to: '/players', label: t('players', language) },
    { to: '/teams',   label: t('teams', language)   },
    { to: '/games',   label: t('games', language)   },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src="/Redline.png"
            alt="Redline"
            className="h-10 w-auto"
          />
          <span className="font-['Orbitron'] font-bold text-2xl text-red-600 tracking-wider">
            REDLINE
          </span>
        </NavLink>

        {/* Links and Language Switcher */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="space-x-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  classNames(
                    'text-gray-700 hover:text-red-600 transition-colors',
                    {
                      'font-semibold text-red-600': isActive,
                      'font-normal': !isActive,
                    }
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium">
                {isEnglish ? 'EN' : 'FR'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    if (!isEnglish) toggleLanguage();
                    setShowLanguageMenu(false);
                  }}
                  className={classNames(
                    'block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
                    {
                      'text-red-600 font-medium': isEnglish,
                      'text-gray-700': !isEnglish,
                    }
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span>{t('english', language)}</span>
                    {isEnglish && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => {
                    if (isEnglish) toggleLanguage();
                    setShowLanguageMenu(false);
                  }}
                  className={classNames(
                    'block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
                    {
                      'text-red-600 font-medium': !isEnglish,
                      'text-gray-700': isEnglish,
                    }
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span>{t('french', language)}</span>
                    {!isEnglish && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
