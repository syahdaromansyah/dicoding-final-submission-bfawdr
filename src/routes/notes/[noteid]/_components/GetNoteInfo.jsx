import PropTypes from 'prop-types';
import { CgSpinnerTwo } from 'react-icons/cg';
import failedNoteSvg from '../../../../assets/failed-note-illustration.svg';
import loadingNoteSvg from '../../../../assets/loading-note-illustration.svg';
import useLang from '../../../../hooks/use-lang';

export default function GetNoteInfo({ isLoadingState, isFailedState }) {
  const { switchLang } = useLang();

  return (
    <div className="h-full">
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        {isLoadingState && (
          <img
            src={loadingNoteSvg}
            className="block h-52 w-40 lg:h-80 lg:w-64"
            alt={switchLang({
              en: 'Loading note',
              id: 'Sedang memuat catatan',
            })}
          />
        )}

        {isFailedState && (
          <img
            src={failedNoteSvg}
            className="block h-48 w-40 lg:h-72 lg:w-64"
            alt={switchLang({
              en: 'Loading note failed',
              id: 'Mengambil catatan gagal dimuat',
            })}
          />
        )}

        <div className="max-w-xs md:max-w-md">
          <p className="mx-auto w-full break-words rounded bg-gray-300 px-3 py-1 text-center text-sm lg:text-base dark:bg-gray-800">
            <span className="flex items-center gap-x-1">
              {isLoadingState && (
                <>
                  <span className="inline-block animate-spin" aria-hidden>
                    <CgSpinnerTwo />
                  </span>

                  <span className="inline-block">
                    {switchLang({
                      en: 'Loading note',
                      id: 'Sedang memuat catatan',
                    })}
                  </span>
                </>
              )}

              {isFailedState && (
                <span className="inline-block">
                  {switchLang({
                    en: 'Loading note failed',
                    id: 'Mengambil catatan gagal dimuat',
                  })}
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

GetNoteInfo.propTypes = {
  isLoadingState: PropTypes.bool.isRequired,
  isFailedState: PropTypes.bool.isRequired,
};
