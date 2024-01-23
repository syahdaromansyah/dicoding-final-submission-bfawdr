import { useRouteError } from 'react-router-dom';
import somethingWentWrongSvg from '../assets/something-went-wrong-illustration.svg';
import useLang from '../hooks/use-lang';
import PageLayout from './_components/PageLayout.jsx';

export default function ErrorRootRoute() {
  const routeError = useRouteError();

  const { switchLang } = useLang();

  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center gap-y-6">
        <img
          src={somethingWentWrongSvg}
          className="block h-20 w-40 lg:h-32 lg:w-64"
          alt={switchLang({
            en: 'Page is not found',
            id: 'Halaman tidak ditemukan',
          })}
        />

        <div className="max-w-xs md:max-w-md">
          {switchLang({
            en: (
              <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
                Oops! Something went wrong
              </p>
            ),
            id: (
              <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
                Oops! Terjadi suatu kesalahan
              </p>
            ),
          })}
        </div>

        {routeError && <p>{routeError.statusText || routeError.message}</p>}
      </div>
    </PageLayout>
  );
}
