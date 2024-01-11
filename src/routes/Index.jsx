import { useContext, useState } from 'react';
import Alert from '../components/Alert.jsx';
import { LanguageContext } from '../contexts/contexts.js';
import { archiveNote, deleteNote } from '../utilities/network-data.js';
import NoteList from './_route-components/NoteList/NoteList.jsx';
import useAlert from './_route-custom-hooks/use-alert.js';
import useNotes from './_route-custom-hooks/use-notes.js';

export default function RootIndexRoute() {
  const [notesOperation, setNotesOperation] = useState(() => ({}));

  const { switchLang } = useContext(LanguageContext);

  const { notes, loadingNotes, refreshNote, deleteNoteById } = useNotes({
    isActiveNotes: true,
  });

  const {
    alertIsShown,
    alertSeverity,
    alertTitle,
    alertMessage,
    showAlert,
    closeAlert,
  } = useAlert();

  const handleCloseAlert = () => closeAlert();

  const handleArchiveNote = async (noteId) => {
    try {
      setNotesOperation((prevNoteOperations) => ({
        ...prevNoteOperations,
        [noteId]: 'archive',
      }));

      const { error } = await archiveNote(noteId);

      if (error) throw new Error('archive note failed');

      deleteNoteById(noteId);
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
      setNotesOperation((prevNoteOperations) => {
        const copiedPrevNoteOperations = { ...prevNoteOperations };
        delete copiedPrevNoteOperations[noteId];
        return copiedPrevNoteOperations;
      });
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setNotesOperation((prevNoteOperations) => ({
        ...prevNoteOperations,
        [noteId]: 'delete',
      }));

      const { error } = await deleteNote(noteId);

      if (error) throw new Error('delete active note failed');

      deleteNoteById(noteId);
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
      setNotesOperation((prevNoteOperations) => {
        const copiedPrevNoteOps = { ...prevNoteOperations };
        delete copiedPrevNoteOps[noteId];
        return copiedPrevNoteOps;
      });
    }
  };

  const handleRefreshNotes = async () => {
    if (loadingNotes) return;
    void refreshNote();
  };

  return (
    <>
      <Alert
        shown={alertIsShown}
        severity={alertSeverity}
        title={switchLang(alertTitle)}
        message={switchLang(alertMessage)}
        handleClose={handleCloseAlert}
      />

      <NoteList
        notes={notes}
        loadingNotes={loadingNotes}
        isActiveNotes
        notesOperation={notesOperation}
        handleArchiveNote={handleArchiveNote}
        handleDeleteNote={handleDeleteNote}
        handleRefreshNotes={handleRefreshNotes}
      />
    </>
  );
}
