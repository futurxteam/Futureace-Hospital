import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import mlTranslation from './locales/ml/translation.json';

const STORAGE_KEY = 'futureace_language';
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const initialLanguage = savedLanguage === 'ml' ? 'ml' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ml: { translation: mlTranslation },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes XSS
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  });

// Keep document.documentElement.lang and localStorage in sync
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

export default i18n;

