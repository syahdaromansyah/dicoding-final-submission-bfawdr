import cn from 'classnames';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { FaBars, FaGear } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { AuthContext, LanguageContext } from '../../../contexts/contexts.js';
import NavBoardSettings from '../NavBoardSettings.jsx';
import PageLayout from '../PageLayout.jsx';
import NavBoardNavLinks from './_sub-components/NavBoardNavLinks/NavBoardNavLinks.jsx';
import NavBoardProfile from './_sub-components/NavBoardProfile.jsx';

export default function SignInPageLayout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { switchLang } = useContext(LanguageContext);
  const { userAuth, updateUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleShowNav = () => setShowNav(() => true);

  const handleCloseNav = () => setShowNav(() => false);

  const handleShowMobSettings = () => {
    setShowNav(() => false);
    setShowSettings(() => true);
  };

  const handleShowSettings = () => setShowSettings(() => true);

  const handleCloseSettings = () => setShowSettings(() => false);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');

    updateUserAuth(null);

    navigate('/login', { replace: true });
  };

  return (
    <PageLayout>
      <div className="flex h-full flex-col-reverse lg:flex-row">
        <header className="flex-none lg:h-full lg:w-1/4 xl:w-1/5">
          {/* Navigation app */}
          <nav className="border-t border-gray-300 bg-gray-200 lg:h-full lg:border-b lg:border-t-0 dark:border-gray-600 dark:bg-gray-800">
            <div className="p-2 text-center lg:hidden">
              <p>
                <button
                  className="inline-block rounded-md border-2 border-gray-300 p-4 text-2xl shadow shadow-gray-300 dark:border-gray-700 dark:shadow-none"
                  type="button"
                  onClick={handleShowNav}
                >
                  <FaBars />{' '}
                  <span className="sr-only">
                    {switchLang({
                      en: 'Open navigation menu',
                      id: 'Buka navigasi menu',
                    })}
                  </span>
                </button>
              </p>
            </div>

            {/* Navigation menu overlay */}
            <div
              className={cn(
                'absolute left-0 top-0 z-50 h-screen w-full bg-gray-100/40 backdrop-blur lg:!hidden dark:bg-gray-800/40',
                {
                  block: showNav,
                  hidden: !showNav,
                },
              )}
            />

            {/* Navigation app menu */}
            <div
              className={cn(
                'absolute left-0 top-0 z-50 h-screen w-full -translate-x-full transition lg:relative lg:translate-x-0',
                {
                  '!translate-x-0': showNav,
                },
              )}
            >
              <div className="flex h-full flex-row-reverse lg:block">
                <p className="h-full flex-1 lg:hidden">
                  <button
                    className="inline-block h-full w-full"
                    type="button"
                    onClick={handleCloseNav}
                  >
                    <span className="sr-only">
                      {switchLang({
                        en: 'Close navigation menu',
                        id: 'Tutup navigasi menu',
                      })}
                    </span>
                  </button>
                </p>

                <section className="h-full w-9/12 bg-gray-50 p-4 md:w-2/5 lg:w-full dark:bg-gray-800">
                  <div className="mb-4">
                    <NavBoardProfile
                      fullName={userAuth.name}
                      email={userAuth.email}
                      handleSignOut={handleSignOut}
                    />
                  </div>

                  <div className="mb-4 border-b border-gray-400 pb-4">
                    <NavBoardNavLinks handleClick={handleCloseNav} />
                  </div>

                  <div>
                    <p>
                      <button
                        className="inline-block w-full rounded-md p-4 text-left transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-100 lg:hidden dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-800"
                        type="button"
                        onClick={handleShowMobSettings}
                      >
                        <span className="inline-flex items-center gap-x-4">
                          <FaGear />{' '}
                          <span className="inline-block">
                            {switchLang({
                              en: 'Settings',
                              id: 'Pengaturan',
                            })}
                          </span>
                        </span>
                      </button>
                    </p>

                    <p>
                      <button
                        className="hidden w-full rounded-md p-4 text-left transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-100 lg:inline-block dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-800"
                        type="button"
                        onClick={handleShowSettings}
                      >
                        <span className="inline-flex items-center gap-x-4">
                          <FaGear />{' '}
                          <span className="inline-block">
                            {switchLang({
                              en: 'Settings',
                              id: 'Pengaturan',
                            })}
                          </span>
                        </span>
                      </button>
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Navigation app settings menu */}
            <NavBoardSettings
              showSettings={showSettings}
              handleCloseSettings={handleCloseSettings}
            />
          </nav>
        </header>

        <main className="h-full max-h-full flex-1 overflow-y-auto px-4 pt-4">
          {children}
        </main>
      </div>
    </PageLayout>
  );
}

SignInPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
