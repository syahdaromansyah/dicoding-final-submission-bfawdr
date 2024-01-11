import cn from 'classnames';
import { useContext, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaTrashCan } from 'react-icons/fa6';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../components/Alert.jsx';
import MarkdownContent from '../../../components/MarkdownContent';
import { LanguageContext } from '../../../contexts/contexts';
import {
  archiveNote,
  deleteNote,
  unarchiveNote,
} from '../../../utilities/network-data.js';
import showFormattedDate from '../../../utilities/show-formatted-date';
import useAlert from '../../_route-custom-hooks/use-alert.js';
import useInitialNote from './_custom-hooks/use-initial-note.js';
import GetNoteInfo from './_route-components/GetNoteInfo.jsx';

export default function NoteDetailRootRoute() {
  const [note, setNote] = useState(null);
  const [loadingNoteOp, setLoadingNoteOp] = useState('none');
  const [showNoteOptions, setShowNoteOptions] = useState(false);

  const { switchLang } = useContext(LanguageContext);

  const navigate = useNavigate();

  const { noteId } = useParams();

  const { loadingInitNote } = useInitialNote({ setNote });

  const {
    alertIsShown,
    alertSeverity,
    alertTitle,
    alertMessage,
    showAlert,
    closeAlert,
  } = useAlert();

  const handleCloseAlert = () => closeAlert();

  const handleShowNoteOptions = () => {
    setShowNoteOptions((prevShowNoteOptions) => !prevShowNoteOptions);
  };

  const handleArchiveNoteOption = async () => {
    try {
      setLoadingNoteOp(() => 'archive');

      const { error } = await archiveNote(noteId);

      if (error) throw new Error('archive note failed');

      setNote((prevNote) => ({
        ...prevNote,
        archived: true,
      }));
    } catch (error) {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Archiving note is failed',
          id: 'Mengarsipkan catatan gagal',
        },
      });
    } finally {
      setLoadingNoteOp(() => 'none');
    }
  };

  const handleUnarchiveNoteOption = async () => {
    try {
      setLoadingNoteOp(() => 'unarchive');

      const { error } = await unarchiveNote(note.id);

      if (error) throw new Error('unarchive note failed');

      setNote((prevNote) => ({
        ...prevNote,
        archived: false,
      }));
    } catch (error) {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Unarchive note failed ',
          id: 'Membatalkan pengarsipan catatan gagal',
        },
      });
    } finally {
      setLoadingNoteOp(() => 'none');
    }
  };

  const handleDeleteNoteOption = async () => {
    try {
      setLoadingNoteOp(() => 'delete');

      const { error } = await deleteNote(noteId);

      if (error) throw new Error('delete archived note failed');

      if (note.archived) navigate('/notes/archived', { replace: true });
      else navigate('/', { replace: true });
    } catch (error) {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Deleting note is failed',
          id: 'Menghapus catatan gagal',
        },
      });
    } finally {
      setLoadingNoteOp(() => 'none');
    }
  };

  const noteCardOptions = () => [
    note.archived
      ? {
          text: switchLang({
            en: 'Unarchive',
            id: 'Batal arsip',
          }),
          icon: <MdUnarchive />,
          handleClick: handleUnarchiveNoteOption,
        }
      : {
          text: switchLang({
            en: 'Archive',
            id: 'Arsipkan',
          }),
          icon: <MdArchive />,
          handleClick: handleArchiveNoteOption,
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
    <>
      <Alert
        shown={alertIsShown}
        severity={alertSeverity}
        title={switchLang(alertTitle)}
        message={switchLang(alertMessage)}
        handleClose={handleCloseAlert}
      />

      {loadingInitNote === false && (
        <>
          {note !== null && (
            <div className="mx-auto max-w-2xl pb-20 pt-4 md:px-0 lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
              {loadingNoteOp === 'none' && (
                <section className="fixed bottom-24 right-4 lg:bottom-4 lg:right-8">
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
                        'absolute bottom-[calc(100%+8px)] right-0 hidden w-max min-w-48 rounded-md border border-gray-300 bg-gray-100 md:w-44 dark:border-gray-700 dark:bg-gray-800',
                        {
                          '!block': showNoteOptions,
                        },
                      )}
                    >
                      <ul className="grid gap-y-2 p-2">
                        {noteCardOptions().map((noteOption) => (
                          <li key={noteOption.text}>
                            <p>
                              <button
                                className="flex w-full items-center gap-x-2 rounded-md p-4 transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-900 dark:disabled:text-gray-600"
                                type="button"
                                onClick={noteOption.handleClick}
                                disabled={loadingNoteOp !== 'none'}
                              >
                                <span className="inline-block text-xl">
                                  {noteOption.icon}
                                </span>{' '}
                                <span className="font-space-grotesk font-bold lg:text-xl">
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
              )}

              {loadingNoteOp !== 'none' && (
                <div className="fixed bottom-24 right-4 select-none lg:bottom-4 lg:right-8">
                  <p className="flex max-w-fit items-center gap-x-1 rounded-md border border-gray-400 bg-gray-300/60 px-3 py-2 backdrop-blur dark:border-gray-600 dark:bg-gray-700/60">
                    <span className="inline-block animate-spin">
                      <CgSpinnerTwo />
                    </span>

                    {loadingNoteOp === 'archive' && (
                      <span className="inline-block">
                        {switchLang({
                          en: 'Archiving note',
                          id: 'Mengarsipkan catatan',
                        })}
                      </span>
                    )}

                    {loadingNoteOp === 'unarchive' && (
                      <span className="inline-block">
                        {switchLang({
                          en: 'Unarchive note',
                          id: 'Membatalkan catatan arsip',
                        })}
                      </span>
                    )}
                    {loadingNoteOp === 'delete' && (
                      <span className="inline-block">
                        {switchLang({
                          en: 'Deleting note',
                          id: 'Menghapus catatan',
                        })}
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="mb-6 border-b-2 border-gray-300 pb-4">
                <h1 className="mb-2 font-space-grotesk text-4xl font-bold xl:mb-4 xl:text-6xl">
                  {note.title}
                </h1>

                <p className="text-sm xl:text-base">
                  <span className="inline-block rounded-md bg-gray-200 px-2 py-1 dark:bg-gray-800">
                    {switchLang({
                      en: 'Created at',
                      id: 'Dibuat',
                    })}
                    :{' '}
                    <time className="inline-block" dateTime={note.createdAt}>
                      {showFormattedDate({
                        locales: switchLang({
                          en: 'en-US',
                          id: 'id-ID',
                        }),
                        date: note.createdAt,
                      })}
                    </time>
                  </span>
                </p>
              </div>

              <div>
                <MarkdownContent>{String(note.body)}</MarkdownContent>
              </div>
            </div>
          )}

          {note === null && (
            <GetNoteInfo isLoadingState={false} isFailedState />
          )}
        </>
      )}

      {loadingInitNote && <GetNoteInfo isLoadingState isFailedState={false} />}
    </>
  );
}
