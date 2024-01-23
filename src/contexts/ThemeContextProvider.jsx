import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { ThemeContext } from './contexts';

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(null);

  const changeTheme = (themeValue) => {
    if (themeValue === 'light') setTheme(() => 'light');
    else setTheme(() => 'dark');
  };

  const contextValue = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
