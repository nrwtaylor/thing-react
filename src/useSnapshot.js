import { useState, useEffect } from "react";

import { getWebJson } from "./util/database.js";
import { humanTime, zuluTime } from "./util/time.js";

import useHybridEffect from "./useHybridEffect.js";
//import useDeepCompareEffect from "use-deep-compare-effect";

const defaultSnapshotInterval = process.env.REACT_APP_SNAPSHOT_INTERVAL;

export default function useSnapshot(input, inputSnapshotPollInterval) {
  //const to = input;
/*
  const [snapshotInterval, setSnapshotInterval] = useState(
    inputSnapshotPollInterval == null
      ? defaultSnapshotInterval
      : inputSnapshotPollInterval
  );
*/
const [snapshotInterval, setSnapshotInterval] = useState();
  const [flag, setFlag] = useState();

  const [snapshot, setSnapshot] = useState({
    thing: { uuid: "X" },
    thingReport: { sms: "No snapshot response. Yet." },
  });

  const [snapshotRunTime, setSnapshotRunTime] = useState();
  const [snapshotRunAt, setSnapshotRunAt] = useState();
  const [snapshotResults, setSnapshotResults] = useState([]);
  const [sequentialErrorCount, setSequentialErrorCount] = useState();

useEffect(()=>{

if (inputSnapshotPollInterval == null) {return;}

setSnapshotInterval(inputSnapshotPollInterval);

},[inputSnapshotPollInterval]);

  useHybridEffect(() => {
    console.debug("useSnapshot hybrideffect input", input);

    if (input == null) {
    console.debug("useSnapshot hybrideffore input is null", input);

      return;
    }
    getSnapshot();
  }, [input]);

useEffect(()=>{

console.debug("useSnapshot inputSnapshotPollInterval", inputSnapshotPollInterval);

},[inputSnapshotPollInterval]);

useEffect(() => {

console.debug("useSnapshot init");

}, []);

  useEffect(() => {

  //if (typeof snapshotInterval !== 'number') {
  //  console.error('snapshotInterval should be a valid number.');
  //  return;
  //}

  const intervalValue = typeof snapshotInterval === 'number' ? snapshotInterval : defaultSnapshotInterval;


    console.debug("useSnapshot interval input snapshotInterval", input, snapshotInterval, defaultSnapshotInterval);
    getSnapshot();

    const interval = setInterval(() => {
      console.debug(
        "useSnapshot interval call requested",
        snapshotInterval, intervalValue,
        input
      );
      getSnapshot();
    }, intervalValue); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [snapshotInterval]);

  useHybridEffect(() => {
    console.debug("useSnapshot hybrideffect snapshot");
    if (snapshot == null) {
      return;
    }

    if (snapshotResults == null) {
      console.debug("useSnapshot snapshotResults undefined");
      setSnapshotResults([{ ...snapshot, snapshotAt: zuluTime() }]);

      return;
    }

    console.log("useSnapshot snapshot", snapshot);

    const count = 0;

    for (const snapshotResult of snapshotResults.reverse()) {
      if (snapshotResult.error) {
        count += 1;
      }
      if (!snapshot.error) {
        break;
      }
      console.log(snapshotResult);
    }
    setSequentialErrorCount(count);
  }, [snapshot]);

  useEffect(() => {
    console.log("useSnapshot sequentialErrorCount", sequentialErrorCount);
  }, [sequentialErrorCount]);

  function getSnapshot() {
      console.debug("useSnapshot getSnapshot input", input);

    const startTime = new Date();
    if (flag === "red") {
      console.debug("useSnapshot getSnapshot flag", flag);
      return;
    }

    if (input == null) {
      console.debug("useSnapshot getSnapshot input null", input);

      return;
    }

    const url = input;

    console.debug("useSnapshot url", url);
    return getWebJson(url, "")
      .then((result) => {
        console.debug("useSnapshot getSnapshot result", url, result);
        if (!result) {
          return true;
        }

        if (result && result.thingReport === false) {
          // No thing report. Do not update snapshot.
          return false;
        }

        if (result && result.thingReport && result.thingReport.snapshot) {
          setSnapshot(result.thingReport.snapshot);
        } else {
          // Failback situation where thingReport format not found.
          setSnapshot(result);
        }
console.debug("useSnapshot setSnapshot");
        // dev flag available not available
        setFlag("green");
        const endTime = new Date();
        setSnapshotRunTime(endTime - startTime);
        setSnapshotRunAt(zuluTime(endTime));
        return result;
      })
      .catch((error) => {
        //console.log("History history getSnapshot error", error);
        console.error("useSnapshot getSnapshot error", error);
        setFlag("yellow");
        return { ...snapshot, error };
        //return;
      });
  }

  const saveSnapshot = (userSnapshot) => {
    console.log("useSnapshot saveSnapshot userSnapshot", userSnapshot);
    setSnapshot(userSnapshot);
  };

  const deleteSnapshot = (userSnapshot) => {
    // Leave no rubbish behind.
    setSnapshot(false);
  };

  return {
    deleteSnapshot: deleteSnapshot,
    setSnapshot: saveSnapshot,
    snapshot,
    flag,
    snapshotRunTime,
    snapshotRunAt,
    snapshotInterval,
  };
}
