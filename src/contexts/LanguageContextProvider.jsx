import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { LanguageContext } from './contexts';

export default function LanguageContextProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const langInfo = JSON.parse(localStorage.getItem('langInfo'));

    if (langInfo) return langInfo.lang;

    return 'English';
  });

  const [langCode, setLangCode] = useState(() => {
    const langInfo = JSON.parse(localStorage.getItem('langInfo'));

    if (langInfo) return langInfo.langCode;

    return 'en';
  });

  const changeLang = ({ lang, langCode }) => {
    setLang(() => lang);
    setLangCode(() => langCode);
  };

  const switchLang = useCallback(
    (langText = {}) => langText[langCode] || 'Unknown language',
    [langCode],
  );

  const contextValue = useMemo(
    () => ({
      lang,
      langCode,
      changeLang,
      switchLang,
    }),
    [lang, langCode, switchLang],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
