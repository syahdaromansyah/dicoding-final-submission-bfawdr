import { useContext } from 'react';
import { LanguageContext } from '../contexts/contexts';

const useLang = () => {
  const { lang, langCode, changeLang, switchLang } =
    useContext(LanguageContext);

  return { lang, langCode, changeLang, switchLang };
};

export default useLang;
