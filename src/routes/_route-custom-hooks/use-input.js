import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (ev) => {
    setInputValue(() => ev.target.value);
  };

  return [inputValue, handleInput];
};

export default useInput;
