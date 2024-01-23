import { createContext } from 'react';

export const AuthContext = createContext({
  userAuth: null,
  updateUserAuth: () => {},
});

export const ThemeContext = createContext({
  theme: 'dark',
  changeTheme: () => {},
});

export const LanguageContext = createContext({
  lang: 'English',
  langCode: 'en',
  changeLang: () => {},
});
