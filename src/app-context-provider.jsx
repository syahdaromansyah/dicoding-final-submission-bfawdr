import PropTypes from 'prop-types';
import AuthContextProvider from './contexts/AuthContextProvider';
import LanguageContextProvider from './contexts/LanguageContextProvider';
import ThemeContextProvider from './contexts/ThemeContextProvider';

export default function AppContextProvider({ children }) {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
