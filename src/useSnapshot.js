import { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import { getWebJson, getSnapshot } from "./util/database.js";


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

  useEffect(()=>{

if (!inputSnapshotPollInterval) {return;}

console.log("useSnapshot inputSnapshotPollInterval",inputSnapshotPollInterval);

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

  function getSnapshot() {
    const startTime = new Date();
    if (flag === "red") {
      return;
    }
//    console.log("useSnapshot getSnapshot call " + agent);
//    console.log("useSnapshot getSnapshot to", to);

    const url = to;

    return getWebJson(url, "")
      .then((result) => {
//        console.log("useSnapshot getWebJson result", result);

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
        setFlag('yellow');
        return snapshot;
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
    snapshotInterval
  };
}
