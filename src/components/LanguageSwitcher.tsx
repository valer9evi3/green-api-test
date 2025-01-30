import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-100 transition-colors text-sm font-medium"
    >
      {i18n.language === 'ru' ? 'EN' : 'RU'}
    </button>
  );
};