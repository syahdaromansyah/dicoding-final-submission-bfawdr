import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/contexts.js';
import AuthError from '../exceptions/AuthError.js';
import { getUserLogged } from '../utilities/network-data.js';
import PageLayout from './_route-components/PageLayout.jsx';
import SignInPageLayout from './_route-components/SignInPageLayout/SignInPageLayout.jsx';

const useInitAuth = () => {
  const [fetchOnce, setFetchOnce] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userAuth, updateUserAuth } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUserCreds = async () => {
      try {
        const { error, data } = await getUserLogged({
          fetchSignal: abortController.signal,
        });

        if (error) throw new AuthError();

        setFetchOnce(() => true);
        setLoading(() => false);

        updateUserAuth({
          id: data.id,
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        if (error instanceof AuthError) {
          if (pathName !== '/login' && pathName !== '/register')
            navigate('/login', { replace: true });

          setFetchOnce(() => true);
          setLoading(() => false);
        }
      }
    };

    if (userAuth === null && fetchOnce === false) void fetchUserCreds();

    return () => {
      abortController.abort(
        'fetch signal is aborted because useEffect re-rendered',
      );
    };
  }, [fetchOnce, navigate, pathName, updateUserAuth, userAuth]);

  useEffect(() => {
    const authRoute = pathName === '/login' || pathName === '/register';

    if (userAuth && authRoute) {
      navigate('/', { replace: true });
    }
  }, [navigate, pathName, userAuth]);

  return {
    loadingInitAuth: loading,
  };
};

export default function RootRoute() {
  const { userAuth } = useContext(AuthContext);

  const { loadingInitAuth } = useInitAuth();

  return (
    <>
      {loadingInitAuth === false && (
        <>
          {userAuth ? (
            <SignInPageLayout>
              <Outlet />
            </SignInPageLayout>
          ) : (
            <PageLayout>
              <Outlet />
            </PageLayout>
          )}
        </>
      )}
    </>
  );
}
