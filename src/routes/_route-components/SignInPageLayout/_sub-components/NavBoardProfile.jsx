import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { LanguageContext } from '../../../../contexts/contexts';

export default function NavBoardProfile({ fullName, email, handleSignOut }) {
  const { switchLang } = useContext(LanguageContext);

  const [firstName] = fullName.split(' ');

  return (
    <div className="border-b border-gray-400 pb-4">
      <div className="mb-2">
        <h2 className="font-space-grotesk text-2xl font-bold">
          {switchLang({
            en: 'Hello',
            id: 'Halo',
          })}
          , {firstName}!
        </h2>

        <p>{email}</p>
      </div>

      <p>
        <button
          className="inline-block w-full rounded-md border border-gray-300 bg-gray-100 py-2 transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-700"
          type="button"
          onClick={handleSignOut}
        >
          <span className="inline-flex items-center gap-x-2">
            <span className="rotate-180 transform">
              <FaArrowRightToBracket />
            </span>{' '}
            <span className="inline-block">
              {switchLang({
                en: 'Sign out',
                id: 'Keluar akun',
              })}
            </span>
          </span>
        </button>
      </p>
    </div>
  );
}

NavBoardProfile.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};
