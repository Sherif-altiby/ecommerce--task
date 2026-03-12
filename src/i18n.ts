import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import type { InitOptions } from 'i18next';

const options: InitOptions = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],
  defaultNS: 'translation',

  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],        
  },

  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .use(initReactI18next)
  .init(options);

export default i18n;