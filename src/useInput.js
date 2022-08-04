import { useState, useEffect } from "react";

export default function useInput() {
  const getInput = () => {
    return null;
  };

  const [input, setInput] = useState(getInput());

  const saveInput = (i) => {
    setInput(i);
  };

  const deleteInput = () => {
    // Leave no rubbish behind.
    setInput(false);
  };

  return {
    deleteInput: deleteInput,
    setInput: saveInput,
    input,
  };
}
