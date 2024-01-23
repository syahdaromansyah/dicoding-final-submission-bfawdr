import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/contexts';
import FetchError from '../../exceptions/FetchError';
import { getActiveNotes, getArchivedNotes } from '../../utilities/network-data';

const useNotes = ({ isActiveNotes }) => {
  const abortCtrlRefreshNotesRef = useRef(null);

  const [fetchOnce, setFetchOnce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(() => []);

  const { userAuth } = useContext(AuthContext);

  const deleteNoteById = (noteId) =>
    setNotes((prevNotes) =>
      prevNotes.filter((prevNote) => prevNote.id !== noteId),
    );

  const refreshNote = async () => {
    try {
      abortCtrlRefreshNotesRef.current = new AbortController();

      setLoading(() => true);

      let response = null;

      if (isActiveNotes)
        response = await getActiveNotes({
          fetchSignal: abortCtrlRefreshNotesRef.current.signal,
        });
      else
        response = await getArchivedNotes({
          fetchSignal: abortCtrlRefreshNotesRef.current.signal,
        });

      const { error, data } = response;

      if (error) throw new FetchError();

      setLoading(() => false);
      setNotes(() => [...data]);
    } catch (error) {
      if (error instanceof FetchError) setLoading(() => false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchNotes = async () => {
      try {
        let response = null;

        if (isActiveNotes)
          response = await getActiveNotes({
            fetchSignal: abortController.signal,
          });
        else
          response = await getArchivedNotes({
            fetchSignal: abortController.signal,
          });

        const { error, data } = response;

        if (error) throw new FetchError();

        setFetchOnce(() => true);
        setLoading(() => false);
        setNotes(() => [...data]);
      } catch (error) {
        if (error instanceof FetchError) setLoading(() => false);
      }
    };

    if (userAuth !== null && fetchOnce === false) void fetchNotes();

    return () => {
      abortController.abort(
        'fetch signal is aborted because useEffect re-rendered',
      );
    };
  }, [fetchOnce, isActiveNotes, userAuth]);

  useEffect(() => {
    return () => {
      if (abortCtrlRefreshNotesRef.current)
        abortCtrlRefreshNotesRef.current.abort(
          'fetch signal is aborted because the component will unmount',
        );
    };
  }, []);

  return {
    notes,
    loadingNotes: loading,
    refreshNote,
    deleteNoteById,
  };
};

export default useNotes;
