import { useState, useEffect } from "react";

import { getWebJson, getSnapshot } from "./util/database.js";
import { humanTime, zuluTime } from "./util/time.js";

//export default function useToken(inputToken) {
export default function useSnapshot(input, inputSnapshotPollInterval) {
  const to = input;

  const [snapshotInterval, setSnapshotInterval] = useState(50);

  const [flag, setFlag] = useState();

  const [snapshot, setSnapshot] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [snapshotGetTime, setSnapshotGetTime] = useState();
  const [snapshotResults, setSnapshotResults] = useState([]);
  const [sequentialErrorCount, setSequentialErrorCount] = useState();
  useEffect(() => {
    if (!inputSnapshotPollInterval) {
      return;
    }

    console.log(
      "useSnapshot inputSnapshotPollInterval",
      inputSnapshotPollInterval
    );

    setSnapshotInterval(inputSnapshotPollInterval);
  }, [inputSnapshotPollInterval]);

  useEffect(() => {
    console.log("useSnapshot snapshotInterval", snapshotInterval);
    getSnapshot();

    const interval = setInterval(() => {
      getSnapshot();
    }, snapshotInterval); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [snapshotInterval]);

  useEffect(() => {
    if (snapshot === undefined) {
      console.log("useSnapshot snapshot undefined");

      return;
    }
    if (snapshotResults === undefined) {
      console.log("useSnapshot snapshotResults undefined");
      setSnapshotResults([{ ...snapshot, snapshotAt: zuluTime() }]);

      return;
    }

    console.log("useSnapshot snapshot", snapshot);

    //const s = snapshotResults.push(snapshot);
    //setSnapshotResults({...s, snapshotAt:zuluTime()});

    const count = 0;
    //snapshotResults.reverse().forEach((snapshotResult)=>{

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
    console.log("sequentialErrorCount", sequentialErrorCount);
  }, [sequentialErrorCount]);

  function getSnapshot() {
    const startTime = new Date();
    if (flag === "red") {
      return;
    }
    //    console.log("useSnapshot getSnapshot call " + agent);
    //    console.log("useSnapshot getSnapshot to", to);

    const url = to;
    console.log("useSnapshot url", url);
    return getWebJson(url, "")
      .then((result) => {
        console.log("useSnapshot getWebJson url result", url, result);

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
        // dev flag available not available
        setFlag("green");
        const endTime = new Date();
        setSnapshotGetTime(endTime - startTime);
        return result;
      })
      .catch((error) => {
        console.error("useSnapshot getWebJson error", error);
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
    snapshotGetTime,
    snapshotInterval,
  };
}
