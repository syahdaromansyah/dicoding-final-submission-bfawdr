import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthError from '../exceptions/AuthError.js';
import useAuth from '../hooks/use-auth';
import { getUserLogged } from '../utilities/network-data';
import PageLayout from './_components/PageLayout.jsx';
import SignInPageLayout from './_components/SignInPageLayout/SignInPageLayout.jsx';

const useInitAuth = () => {
  const [fetchOnce, setFetchOnce] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { userAuth, updateUserAuth } = useAuth();

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
    userAuth,
    loadingInitAuth: loading,
  };
};

export default function RootRoute() {
  const { userAuth, loadingInitAuth } = useInitAuth();

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
