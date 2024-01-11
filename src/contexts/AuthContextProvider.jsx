import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { AuthContext } from './contexts';

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (data) => setUser(() => data);

  const contextValue = useMemo(
    () => ({
      userAuth: user,
      updateUserAuth: updateUser,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
