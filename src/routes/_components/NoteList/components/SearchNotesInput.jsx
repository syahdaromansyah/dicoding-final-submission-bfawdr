import PropTypes from 'prop-types';
import { useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLang from '../../../../hooks/use-lang';

export default function SearchNoteInput({ disabled }) {
  const inputId = useId();

  const [searchParams, setSearchParams] = useSearchParams();

  const { switchLang } = useLang();

  const handleSearchNote = (ev) => {
    if (disabled) return;

    const inputValue = ev.target.value;

    if (inputValue.trim()) {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        title: inputValue,
      }));
    } else {
      setSearchParams((prevSearchParams) => {
        const copyPrevSearchParams = { ...prevSearchParams };
        delete copyPrevSearchParams.title;
        return copyPrevSearchParams;
      });
    }
  };

  return (
    <form>
      <p>
        <label
          className="inline-block w-full"
          htmlFor={`${inputId}-search-notes`}
        >
          <input
            className="inline-block w-full rounded-md border bg-gray-50/80 p-4 font-space-grotesk shadow shadow-gray-300 backdrop-blur transition placeholder:text-slate-600 hover:bg-gray-100/80 focus:bg-gray-100/80 active:bg-gray-200/80 disabled:cursor-not-allowed disabled:bg-gray-100/80 disabled:text-slate-400 disabled:placeholder:text-slate-400 xl:text-xl dark:border-gray-700 dark:bg-gray-800/80 dark:shadow-none dark:placeholder:text-slate-400 dark:hover:bg-gray-700/80 dark:focus:bg-gray-700/80 dark:active:bg-gray-800/80 dark:disabled:bg-gray-800/80 dark:disabled:text-gray-600 dark:disabled:placeholder:text-gray-600"
            id={`${inputId}-search-notes`}
            type="text"
            placeholder={switchLang({
              en: 'Search notes',
              id: 'Cari catatan',
            })}
            value={searchParams.get('title') || ''}
            onChange={handleSearchNote}
            disabled={disabled}
          />
          <span className="sr-only">
            {switchLang({
              en: 'Search notes',
              id: 'Cari catatan',
            })}
          </span>
        </label>
      </p>
    </form>
  );
}

SearchNoteInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
