import { translations } from '../locales/translations';

export const useTranslation = (language: 'zh' | 'en') => {
  const t = (key: keyof typeof translations['en'], params?: Record<string, string | number>) => {
    const translation = translations[language][key];

    if (typeof translation === 'function') {
      return translation(params as any);
    }

    return translation;
  };

  const getList = (key: 'rulesList'): string[] => {
    return translations[language][key] as string[];
  };

  return { t, getList };
};
