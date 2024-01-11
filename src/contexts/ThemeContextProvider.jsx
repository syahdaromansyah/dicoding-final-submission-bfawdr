import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { ThemeContext } from './contexts';

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark',
  );

  const changeTheme = () =>
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

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
