import cn from 'classnames';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ButtonIconPrimary from '../../components/ButtonIconPrimary';
import { LanguageContext, ThemeContext } from '../../contexts/contexts';

export default function NavBoardSettings({
  showSettings,
  handleCloseSettings,
}) {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { lang, langCode, changeLang, switchLang } =
    useContext(LanguageContext);

  const langValueOption = useMemo(() => ({ lang, langCode }), [lang, langCode]);

  const isDarkTheme = theme === 'dark';

  const langOptions = [
    { lang: 'English', langCode: 'en' },
    { lang: 'Indonesia', langCode: 'id' },
  ];

  const handleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    changeTheme();
  };

  const handleLang = (ev) => {
    const value = ev.value;

    document.documentElement.lang = value.langCode;

    localStorage.setItem('langInfo', JSON.stringify(value));

    changeLang(value);
  };

  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-[100] hidden h-screen w-full bg-gray-200/40 backdrop-blur dark:bg-gray-800/40',
        {
          '!block': showSettings,
        },
      )}
    >
      <div className="relative h-full w-full md:flex md:items-center md:justify-center">
        <p className="absolute left-0 top-0 h-full w-full">
          <button
            className="inline-block h-full w-full"
            type="button"
            onClick={handleCloseSettings}
          >
            <span className="sr-only">
              {switchLang({
                en: 'Close settings menu',
                id: 'Tutup menu pengaturan',
              })}
            </span>
          </button>
        </p>

        <div className="relative z-10 mx-auto h-full bg-gray-50 p-4 md:max-h-[440px] md:w-[540px] md:rounded-md md:shadow md:shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-800">
          <div className="mb-6">
            <ButtonIconPrimary
              text={switchLang({
                en: 'Settings',
                id: 'Pengaturan',
              })}
              icon={<FaArrowLeftLong />}
              handleClick={handleCloseSettings}
            />
          </div>

          <h2 className="mb-6 font-space-grotesk text-2xl font-bold">
            {switchLang({
              en: 'Display Options',
              id: 'Pengaturan Tampilan',
            })}
          </h2>

          <div className="grid gap-y-2">
            <div className="flex items-center justify-between">
              <p>
                {switchLang({
                  en: 'Dark theme',
                  id: 'Tema gelap',
                })}
              </p>

              <InputSwitch checked={isDarkTheme} onChange={handleTheme} />
            </div>

            <div className="flex items-center justify-between">
              <p className="flex-1">
                {switchLang({
                  en: 'Language',
                  id: 'Bahasa',
                })}
              </p>

              <div className="flex flex-1 justify-end">
                <Dropdown
                  optionLabel="lang"
                  options={langOptions}
                  onChange={handleLang}
                  value={langValueOption}
                  placeholder={switchLang({
                    en: 'Select a language',
                    id: 'Pilih bahasa',
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NavBoardSettings.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  handleCloseSettings: PropTypes.func.isRequired,
};
