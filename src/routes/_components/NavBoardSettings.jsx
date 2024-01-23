import cn from 'classnames';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ButtonIconPrimary from '../../components/ButtonIconPrimary';
import useLang from '../../hooks/use-lang';
import useTheme from '../../hooks/use-theme';

export default function NavBoardSettings({
  showSettings,
  handleCloseSettings,
}) {
  const { theme, changeTheme } = useTheme();
  const { lang, langCode, changeLang, switchLang } = useLang();

  const langValueOption = useMemo(() => ({ lang, langCode }), [lang, langCode]);

  const langOptions = useMemo(
    () => [
      { lang: 'English', langCode: 'en' },
      { lang: 'Indonesia', langCode: 'id' },
    ],
    [],
  );

  const isDarkTheme = theme === 'dark';

  const handleTheme = () => {
    const htmlElem = document.documentElement;

    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      htmlElem.classList.remove('dark');
      changeTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      htmlElem.classList.add('dark');
      changeTheme('dark');
    }
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
