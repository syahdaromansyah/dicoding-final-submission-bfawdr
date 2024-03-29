import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/contexts';
import FetchError from '../../../../exceptions/FetchError.js';
import { getNote } from '../../../../utilities/network-data.js';

const useInitialNote = ({ setNote }) => {
  const [fetchOnce, setFetchOnce] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userAuth } = useContext(AuthContext);

  const { noteId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchNote = async () => {
      try {
        const { error, data } = await getNote({
          id: noteId,
          fetchSignal: abortController.signal,
        });

        if (error) throw new FetchError();

        setFetchOnce(() => true);
        setLoading(() => false);

        setNote(() => data);
      } catch (error) {
        if (error instanceof FetchError) setLoading(() => false);
      }
    };

    if (noteId && userAuth !== null && fetchOnce === false) void fetchNote();

    return () => {
      abortController.abort(
        'fetch signal is aborted because useEffect is re-rendering',
      );
    };
  }, [fetchOnce, noteId, setNote, userAuth]);

  return {
    loadingInitNote: loading,
  };
};

export default useInitialNote;
