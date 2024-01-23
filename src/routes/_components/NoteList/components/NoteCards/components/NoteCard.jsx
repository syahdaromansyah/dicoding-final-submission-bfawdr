import cn from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaTrashCan } from 'react-icons/fa6';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MarkdownContent from '../../../../../../components/MarkdownContent.jsx';
import useLang from '../../../../../../hooks/use-lang';
import showFormattedDate from '../../../../../../utilities/show-formatted-date';

export default function NoteCard({
  noteData,
  isActiveNote,
  isOnNoteOption,
  handleArchiveNote = () => null,
  handleUnarchiveNote = () => null,
  handleDeleteNote,
}) {
  const [showNoteOptions, setShowNoteOptions] = useState(false);

  const { switchLang } = useLang();

  const handleShowNoteOptions = () => {
    setShowNoteOptions((prevShowNoteOptions) => !prevShowNoteOptions);
  };

  const handleArchiveNoteOption = () => handleArchiveNote(noteData.id);
  const handleUnarchiveNoteOption = () => handleUnarchiveNote(noteData.id);
  const handleDeleteNoteOption = () => handleDeleteNote(noteData.id);

  const noteCardOptions = [
    isActiveNote
      ? {
          text: switchLang({
            en: 'Archive',
            id: 'Arsipkan',
          }),
          icon: <MdArchive />,
          handleClick: handleArchiveNoteOption,
        }
      : {
          text: switchLang({
            en: 'Unarchive',
            id: 'Batal arsip',
          }),
          icon: <MdUnarchive />,
          handleClick: handleUnarchiveNoteOption,
        },
    {
      text: switchLang({
        en: 'Delete',
        id: 'Hapus',
      }),
      icon: <FaTrashCan />,
      handleClick: handleDeleteNoteOption,
    },
  ];

  return (
    <article className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50 px-4 py-4 shadow shadow-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
      {isOnNoteOption !== 'none' && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-300/80 shadow shadow-gray-200 backdrop-blur dark:bg-gray-800/80">
          <div>
            <p className="flex select-none items-center justify-end">
              <span className="flex w-max items-center justify-end gap-x-1 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-none dark:bg-gray-700">
                <span className="inline-block animate-spin">
                  <CgSpinnerTwo />
                </span>
                {isOnNoteOption === 'archive' && (
                  <span className="inline-block">
                    {switchLang({
                      en: 'Archiving note',
                      id: 'Mengarsipkan catatan',
                    })}
                  </span>
                )}

                {isOnNoteOption === 'unarchive' && (
                  <span className="inline-block">
                    {switchLang({
                      en: 'Unarchive note',
                      id: 'Membatalkan arsip catatan',
                    })}
                  </span>
                )}

                {isOnNoteOption === 'delete' && (
                  <span className="inline-block">
                    {switchLang({
                      en: 'Deleting note',
                      id: 'Menghapus catatan',
                    })}
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-x-2">
        <h2 className="flex-1 font-space-grotesk text-2xl font-bold">
          <Link
            className="inline-block underline md:max-w-sm md:overflow-hidden md:text-ellipsis md:whitespace-nowrap"
            title={noteData.title}
            to={`/notes/${noteData.id}`}
          >
            {noteData.title}
          </Link>
        </h2>

        <section className="flex-none">
          <div className="relative">
            <p>
              <button
                className="flex items-center rounded-md border border-gray-300 bg-gray-100 p-4 text-xl transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:active:bg-gray-900"
                type="button"
                onClick={handleShowNoteOptions}
              >
                <span className="inline-block">
                  <BsThreeDotsVertical />
                </span>
                <span className="sr-only">
                  {switchLang({
                    en: 'Open note options',
                    id: 'Buka opsi catatan',
                  })}
                </span>
              </button>
            </p>

            <section
              className={cn(
                'absolute right-0 top-[calc(100%+8px)] hidden w-max min-w-48 rounded-md border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800',
                {
                  '!block': showNoteOptions,
                },
              )}
            >
              <ul className="grid gap-y-2 p-2">
                {noteCardOptions.map((noteOption) => (
                  <li key={noteOption.text}>
                    <p>
                      <button
                        className="flex w-full items-center gap-x-2 rounded-md p-4 transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 disabled:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-900 dark:disabled:text-gray-600"
                        type="button"
                        onClick={noteOption.handleClick}
                        disabled={isOnNoteOption !== 'none'}
                      >
                        <span className="inline-block text-xl">
                          {noteOption.icon}
                        </span>{' '}
                        <span className="font-space-grotesk text-xl font-bold">
                          {noteOption.text}
                        </span>
                      </button>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </div>

      <div className="mb-4 h-40 max-w-full overflow-auto rounded-md bg-gray-100 px-4 py-3 pr-2 font-inter md:h-64 dark:bg-gray-900">
        <MarkdownContent>{noteData.body}</MarkdownContent>
      </div>

      <p className="border-t-2 border-slate-300 pt-4 text-xs md:text-sm dark:border-gray-700">
        {switchLang({
          en: 'Created at',
          id: 'Dibuat',
        })}
        :{' '}
        <time dateTime={noteData.createdAt}>
          {showFormattedDate({
            locales: switchLang({
              en: 'en-US',
              id: 'id-ID',
            }),
            date: noteData.createdAt,
          })}
        </time>
      </p>
    </article>
  );
}

NoteCard.propTypes = {
  isActiveNote: PropTypes.bool.isRequired,
  isOnNoteOption: PropTypes.oneOf(['archive', 'unarchive', 'delete', 'none'])
    .isRequired,
  handleArchiveNote: PropTypes.func,
  handleUnarchiveNote: PropTypes.func,
  handleDeleteNote: PropTypes.func.isRequired,
  noteData: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
};
