import { useState, useEffect } from "react";

import { getWebJson } from "./util/database.js";
import { humanTime, zuluTime } from "./util/time.js";

import useDeepCompareEffect from 'use-deep-compare-effect'

const defaultSnapshotInterval = process.env.REACT_APP_SNAPSHOT_INTERVAL;


export default function useSnapshot(input, inputSnapshotPollInterval) {
  //const to = input;

  const [snapshotInterval, setSnapshotInterval] = useState(inputSnapshotPollInterval == null ? defaultSnapshotInterval : inputSnapshotPollInterval);

  const [flag, setFlag] = useState();

  const [snapshot, setSnapshot] = useState({
    thing: { uuid: "X" },
    thingReport: { sms: "No response. Yet." },
  });

  const [snapshotRunTime, setSnapshotRunTime] = useState();
  const [snapshotRunAt, setSnapshotRunAt] = useState();
  const [snapshotResults, setSnapshotResults] = useState([]);
  const [sequentialErrorCount, setSequentialErrorCount] = useState();

  useEffect(() => {
    if (input == null) {
      return;
    }
    console.log("useSnapshot input", input);
    getSnapshot();
  }, [input]);

  useEffect(() => {

    console.log("useSnapshot snapshotInterval", snapshotInterval);
    getSnapshot();

    const interval = setInterval(() => {
      console.log(
        "useSnapshot getSnapshot() call requested",
        snapshotInterval,
        input
      );
      getSnapshot();
    }, snapshotInterval); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [snapshotInterval]);

  useDeepCompareEffect(() => {
    if (snapshot == null) {
      return;
    }

    if (snapshotResults == null) {
      console.log("useSnapshot snapshotResults undefined");
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
    console.log("sequentialErrorCount", sequentialErrorCount);
  }, [sequentialErrorCount]);

  function getSnapshot() {
    const startTime = new Date();
    if (flag === "red") {
      console.log("useSnapshot getSnapshot flag", flag);
      return;
    }

    if (input == null) {
      console.log("useSnapshot getSnapshot input", input);

      return;
    }

    const url = input;

    console.log("useSnapshot url", url);
    return getWebJson(url, "")
      .then((result) => {
        console.log("useSnapshot getSnapshot result", url, result);
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
