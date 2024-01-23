import { useContext } from 'react';
import { ThemeContext } from '../contexts/contexts';

const useTheme = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  return { theme, changeTheme };
};

export default useTheme;
