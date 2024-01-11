import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import errorNotFoundSvg from '../assets/not-found-page-illustration.svg';
import { LanguageContext } from '../contexts/contexts.js';

export default function NotFoundRoute() {
  const { switchLang } = useContext(LanguageContext);

  const location = useLocation();

  const pathName = location.pathname;

  return (
    <>
      {pathName && (
        <div className="flex h-full flex-col items-center justify-center gap-y-6">
          <img
            src={errorNotFoundSvg}
            className="block h-28 w-40 lg:h-48 lg:w-64"
            alt={switchLang({
              en: 'Page is not found',
              id: 'Halaman tidak ditemukan',
            })}
          />

          <div className="max-w-xs md:max-w-md">
            {switchLang({
              en: (
                <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
                  Oops! Route{' '}
                  <span className="font-semibold">&quot;{pathName}&quot;</span>{' '}
                  is not found
                </p>
              ),
              id: (
                <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
                  Oops! Halaman{' '}
                  <span className="font-semibold">&quot;{pathName}&quot;</span>{' '}
                  tidak ditemukan
                </p>
              ),
            })}
          </div>
        </div>
      )}
    </>
  );
}
