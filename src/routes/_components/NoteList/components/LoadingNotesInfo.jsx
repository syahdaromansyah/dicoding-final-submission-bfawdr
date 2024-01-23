import PropTypes from 'prop-types';
import { CgSpinnerTwo } from 'react-icons/cg';
import loadingNotesSvg from '../../../../assets/loading-notes-illustration.svg';
import useLang from '../../../../hooks/use-lang';

export default function LoadingNotesInfo({ isActiveNotes }) {
  const { switchLang } = useLang();

  return (
    <div className="h-full">
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <img
          src={loadingNotesSvg}
          className="block h-32 w-40 lg:h-48 lg:w-64"
          alt={
            isActiveNotes
              ? switchLang({
                  en: 'Loading active notes',
                  id: 'Sedang memuat catatan aktif',
                })
              : switchLang({
                  en: 'Loading archived notes',
                  id: 'Sedang memuat catatan arsip',
                })
          }
        />

        <div className="max-w-xs md:max-w-md">
          <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
            <span className="flex items-center gap-x-1">
              <span className="inline-block animate-spin" aria-hidden>
                <CgSpinnerTwo />
              </span>
              <span className="inline-block">
                {isActiveNotes
                  ? switchLang({
                      en: 'Loading active notes',
                      id: 'Sedang memuat catatan aktif',
                    })
                  : switchLang({
                      en: 'Loading archived notes',
                      id: 'Sedang memuat catatan arsip',
                    })}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

LoadingNotesInfo.propTypes = {
  isActiveNotes: PropTypes.bool.isRequired,
};
