import { useEffect } from 'react';
import AppRouter from './app-router';
import useLang from './hooks/use-lang';
import useTheme from './hooks/use-theme';

const useInitTheme = ({ changeTheme }) => {
  useEffect(() => {
    const htmlElem = document.documentElement;
    const themeStorageValue = localStorage.getItem('theme');

    if (
      themeStorageValue === 'dark' ||
      (themeStorageValue === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      htmlElem.classList.add('dark');
      changeTheme('dark');
    } else {
      htmlElem.classList.remove('dark');
      changeTheme('light');
    }
  }, [changeTheme]);
};

const useInitLang = ({ changeLang }) => {
  useEffect(() => {
    const htmlElem = document.documentElement;
    const langInfoStorageValue = JSON.parse(localStorage.getItem('langInfo'));

    if (langInfoStorageValue) {
      htmlElem.lang = langInfoStorageValue.langCode;
      changeLang({
        lang: langInfoStorageValue.lang,
        langCode: langInfoStorageValue.langCode,
      });
    } else {
      htmlElem.lang = 'en';
      changeLang({
        lang: 'English',
        langCode: 'en',
      });
    }
  }, [changeLang]);
};

export default function App() {
  const { theme, changeTheme } = useTheme();
  const { lang, langCode, changeLang } = useLang();

  useInitTheme({ changeTheme });
  useInitLang({ changeLang });

  const readyToRender = theme && lang && langCode;

  return readyToRender ? <AppRouter /> : null;
}
