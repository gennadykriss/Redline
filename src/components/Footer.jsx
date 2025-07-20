// src/components/Footer.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-red-600 text-white py-4">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} Redline. {t('allRightsReserved', language)}.
      </div>
    </footer>
  );
}
