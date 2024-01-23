import { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

const useAuth = () => {
  const { userAuth, updateUserAuth } = useContext(AuthContext);
  return { userAuth, updateUserAuth };
};

export default useAuth;
