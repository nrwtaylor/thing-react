import { useState, useEffect } from "react";

export default function useDatagram(inputDatagram) {

  // Save datagram locally in memory

  useEffect(()=>{

    // Consider: Merge strategies.
    saveDatagram(inputDatagram);

  }, [inputDatagram]);

  const getDatagram = () => {
    return null;
  };

  const [datagram, setDatagram] = useState(getDatagram());

  const saveDatagram = (i) => {
    setDatagram(i);
  };

  const deleteDatagram = () => {
    // Leave no rubbish behind.
    setDatagram(false);
  };

  return {
    deleteDatagram: deleteDatagram,
    setDatagram: saveDatagram,
    datagram,
  };
}
