import { useState } from 'react';

const useAlert = () => {
  const [isShown, setIsShown] = useState(false);
  const [severity, setSeverity] = useState('success');

  const [title, setTitle] = useState(() => ({
    en: 'Note title',
    id: 'Judul catatan',
  }));

  const [message, setMessage] = useState(() => ({
    en: 'Note message',
    id: 'Pesan catatan',
  }));

  const show = ({ severity, title, message }) => {
    setIsShown(() => true);
    setSeverity(() => severity);
    setTitle(() => title);
    setMessage(() => message);
  };

  const close = () => {
    setIsShown(() => false);
    setSeverity(() => 'success');
    setTitle(() => ({
      en: 'Note title',
      id: 'Judul catatan',
    }));
    setMessage(() => ({
      en: 'Note message',
      id: 'Pesan catatan',
    }));
  };

  return {
    alertIsShown: isShown,
    alertSeverity: severity,
    alertTitle: title,
    alertMessage: message,
    showAlert: show,
    closeAlert: close,
  };
};

export default useAlert;
