import { createContext } from 'react';

export const AuthContext = createContext(null);

export const ThemeContext = createContext('dark');

export const LanguageContext = createContext({
  lang: 'English',
  langCode: 'en',
  changeLang: () => null,
});
