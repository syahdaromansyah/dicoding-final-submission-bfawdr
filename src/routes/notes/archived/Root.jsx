import { useState } from 'react';
import Alert from '../../../components/Alert.jsx';
import useLang from '../../../hooks/use-lang';
import { deleteNote, unarchiveNote } from '../../../utilities/network-data';
import NoteList from '../../_components/NoteList/NoteList.jsx';
import useAlert from '../../_hooks/use-alert';
import useNotes from '../../_hooks/use-notes';

export default function ArchivedNotesRootRoute() {
  const [notesOperation, setNotesOperation] = useState(() => ({}));

  const { switchLang } = useLang();

  const { notes, loadingNotes, refreshNote, deleteNoteById } = useNotes({
    isActiveNotes: false,
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

  const handleUnarchiveNote = async (noteId) => {
    try {
      setNotesOperation((prevNoteOperations) => ({
        ...prevNoteOperations,
        [noteId]: 'unarchive',
      }));

      const { error } = await unarchiveNote(noteId);

      if (error) throw new Error('unarchive note failed');

      deleteNoteById(noteId);
    } catch (error) {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Unarchive note is failed',
          id: 'Membatalkan pengarsipan catatan gagal',
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

  const handleDeleteNote = async (noteId) => {
    try {
      setNotesOperation((prevNoteOperations) => ({
        ...prevNoteOperations,
        [noteId]: 'delete',
      }));

      const { error } = await deleteNote(noteId);

      if (error) throw new Error('delete archived note failed');

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
        const copiedPrevNoteOperations = { ...prevNoteOperations };
        delete copiedPrevNoteOperations[noteId];
        return copiedPrevNoteOperations;
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
        isActiveNotes={false}
        notesOperation={notesOperation}
        handleUnarchiveNote={handleUnarchiveNote}
        handleDeleteNote={handleDeleteNote}
        handleRefreshNotes={handleRefreshNotes}
      />
    </>
  );
}
