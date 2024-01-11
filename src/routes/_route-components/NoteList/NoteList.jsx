import PropTypes from 'prop-types';
import { useContext } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/contexts.js';
import EmptyNotesInfo from './_sub-components/EmptyNotesInfo.jsx';
import LoadingNotesInfo from './_sub-components/LoadingNotesInfo.jsx';
import NoteCards from './_sub-components/NoteCards/NoteCards.jsx';
import SearchNoteInput from './_sub-components/SearchNotesInput.jsx';

export default function NoteList({
  notes,
  loadingNotes,
  isActiveNotes,
  notesOperation,
  handleArchiveNote = () => null,
  handleUnarchiveNote = () => null,
  handleDeleteNote,
  handleRefreshNotes,
}) {
  const { switchLang } = useContext(LanguageContext);

  const [searchParams] = useSearchParams();

  const searchNotesParams = searchParams.get('title') || '';

  const filteredNotes = notes.filter((activeNote) =>
    activeNote.title
      .toLowerCase()
      .startsWith(searchNotesParams.trim().toLowerCase()),
  );

  return (
    <div className="relative min-h-full pb-6">
      <div className="sticky left-0 top-0 z-20 mb-6 w-full flex-none">
        <div className="flex gap-x-2">
          <div className="flex-1">
            <SearchNoteInput disabled={loadingNotes} />
          </div>

          <div className="flex-none">
            <p className="h-full">
              <button
                className="inline-block h-full rounded-md border bg-gray-50/80 px-4 font-space-grotesk shadow shadow-gray-300 backdrop-blur transition hover:bg-gray-100/80 focus:bg-gray-100/80 active:bg-gray-200/80 disabled:cursor-not-allowed disabled:bg-gray-100/80 disabled:text-slate-400 dark:border-gray-700 dark:bg-gray-800/80 dark:shadow-none dark:hover:bg-gray-700/80 dark:focus:bg-gray-700/80 dark:active:bg-gray-800/80 dark:disabled:bg-gray-800/80 dark:disabled:text-slate-600"
                type="button"
                disabled={loadingNotes}
                onClick={handleRefreshNotes}
              >
                <span className="flex items-center md:gap-x-1">
                  <span className="inline-block text-xl">
                    <MdOutlineRefresh />
                  </span>

                  <span className="sr-only inline-block md:not-sr-only">
                    {switchLang({
                      en: 'Refresh',
                      id: 'Perbarui',
                    })}
                  </span>
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>

      {loadingNotes === false && filteredNotes.length > 0 && (
        <>
          {isActiveNotes ? (
            <NoteCards
              isActiveNotes
              notesOperation={notesOperation}
              notes={filteredNotes}
              handleArchiveNote={handleArchiveNote}
              handleDeleteNote={handleDeleteNote}
            />
          ) : (
            <NoteCards
              isActiveNotes={false}
              notesOperation={notesOperation}
              notes={filteredNotes}
              handleUnarchiveNote={handleUnarchiveNote}
              handleDeleteNote={handleDeleteNote}
            />
          )}
        </>
      )}

      {loadingNotes === false && filteredNotes.length === 0 && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <EmptyNotesInfo isActiveNotes={isActiveNotes} />
        </div>
      )}

      {loadingNotes && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <LoadingNotesInfo isActiveNotes={isActiveNotes} />
        </div>
      )}
    </div>
  );
}

NoteList.propTypes = {
  loadingNotes: PropTypes.bool.isRequired,
  isActiveNotes: PropTypes.bool.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleRefreshNotes: PropTypes.func.isRequired,
  handleArchiveNote: PropTypes.func,
  handleUnarchiveNote: PropTypes.func,
  notes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      owner: PropTypes.string.isRequired,
    }),
  ).isRequired,
  notesOperation: PropTypes.objectOf(
    PropTypes.oneOf(['archive', 'unarchive', 'delete']),
  ).isRequired,
};
