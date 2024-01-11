import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import emptyNotesSvg from '../../../../assets/empty-data-illustration.svg';
import { LanguageContext } from '../../../../contexts/contexts.js';

export default function EmptyNotesInfo({ isActiveNotes }) {
  const { switchLang } = useContext(LanguageContext);

  const [searchParams] = useSearchParams();

  const searchNotesParams = searchParams.get('title') || '';

  const printNotFoundSearchedNotes = () => {
    if (isActiveNotes)
      return switchLang({
        en: (
          <span>
            <span className="font-bold">&quot;{searchNotesParams}&quot;</span>{' '}
            title note is not found
          </span>
        ),
        id: (
          <span>
            Judul catatan{' '}
            <span className="font-bold">&quot;{searchNotesParams}&quot;</span>{' '}
            tidak ditemukan
          </span>
        ),
      });

    return switchLang({
      en: (
        <span>
          Archived{' '}
          <span className="font-bold">&quot;{searchNotesParams}&quot;</span>{' '}
          title note is not found
        </span>
      ),
      id: (
        <span>
          Judul catatan arsip{' '}
          <span className="font-bold">&quot;{searchNotesParams}&quot;</span>{' '}
          tidak ditemukan
        </span>
      ),
    });
  };

  const printEmptyNotes = () => {
    if (isActiveNotes)
      return switchLang({
        en: 'Active notes are empty',
        id: 'Daftar catatan aktif kosong',
      });
    else
      return switchLang({
        en: 'Archived notes are empty',
        id: 'Daftar catatan arsip kosong',
      });
  };

  return (
    <div className="h-full">
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <img
          src={emptyNotesSvg}
          className="block h-48 w-40 lg:h-72 lg:w-64"
          alt={
            isActiveNotes
              ? switchLang({
                  en: 'Active note lists is empty',
                  id: 'Daftar catatan aktif kosong',
                })
              : switchLang({
                  en: 'Archived note lists is empty',
                  id: 'Daftar catatan arsip kosong',
                })
          }
        />

        <div className="max-w-xs md:max-w-md">
          <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
            {searchNotesParams.trim() === ''
              ? printEmptyNotes()
              : printNotFoundSearchedNotes()}
          </p>
        </div>
      </div>
    </div>
  );
}

EmptyNotesInfo.propTypes = {
  isActiveNotes: PropTypes.bool.isRequired,
};
