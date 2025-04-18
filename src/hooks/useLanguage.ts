import { useState } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('en');  // Default language 'en'

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'zh' : 'en'));
  };

  return { language, toggleLanguage };
};
