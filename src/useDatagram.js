import { useState, useEffect } from "react";

import usePrior from "../src/usePrior.js";

import useHybridEffect from "./useHybridEffect.js";


export default function useDatagram(inputDatagram) {
const [datagram, setDatagram] = useState();

  const priorDatagram = usePrior(datagram);

  // Save datagram locally in memory

  useHybridEffect(() => {
    if (inputDatagram == null) {return;}
    // Consider: Merge strategies.
    saveDatagram(inputDatagram);
  }, [inputDatagram]);

  useHybridEffect(() => {
    //console.log("useThing getThing datagram changed", priorDatagram, datagram, deepDiffMapper.map([priorDatagram, datagram]) );

    if (priorDatagram == null) {
      return;
    }
    if (datagram == null) {
      return;
    }

    var hasDatagramChanged = false;
    if (priorDatagram.subject !== datagram.subject) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.to !== datagram.to) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.from !== datagram.from) {
      hasDatagramChanged = true;
    }

    if (priorDatagram.agentInput !== datagram.agentInput) {
      hasDatagramChanged = true;
    }

    if (hasDatagramChanged === false) {
      return;
    }

    //    console.log(
    //      "useThing getThing datagram changed",
    //      priorDatagram,
    //      datagram,
    //      deepDiffMapper.map([priorDatagram, datagram])
    //    );

    //    getThing();
  }, [datagram, priorDatagram]);

  useHybridEffect(() => {
    if (inputDatagram.subject == null) {
      return;
    }
    if (inputDatagram.to == null) {
      return;
    }
    if (inputDatagram.from == null) {
      return;
    }
    if (inputDatagram.agentInput == null) {
      return;
    }

    setDatagram({
      to: inputDatagram.to,
      from: inputDatagram.from,
      subject: inputDatagram.subject,
      agentInput: inputDatagram.agentInput,
    });
  }, [inputDatagram]);

  //  const getDatagram = () => {
  //    return null;
  //  };

  //  const [datagram, setDatagram] = useState(getDatagram());


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
