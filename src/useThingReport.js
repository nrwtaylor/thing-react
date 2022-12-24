import { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import { getWebJson, getSnapshot } from "./util/database.js";
import { humanTime, zuluTime } from "./util/time.js";


//export default function useToken(inputToken) {
export default function useThingReport(input, inputThingReportPollInterval) {
  const to = input;

  const [thingReportInterval, setThingReportInterval] = useState(50);

  const [flag, setFlag] = useState();

  const [thingReport, setThingReport] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  const [thingReportGetTime, setThingReportGetTime] = useState();
  const [thingReportResults, setThingReportResults] = useState([]);
const [sequentialErrorCount, setSequentialErrorCount] = useState();
  useEffect(() => {
    if (!inputThingReportPollInterval) {
      return;
    }

    console.log(
      "useSnapshot inputSnapshotPollInterval",
      inputThingReportPollInterval
    );

    setThingReportInterval(inputThingReportPollInterval);
  }, [inputThingReportPollInterval]);

  useEffect(() => {
    console.log("useThingReport thingReportInterval", thingReportInterval);
    getThingReport();

    const interval = setInterval(() => {
      getThingReport();
    }, thingReportInterval); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [thingReportInterval]);

useEffect(()=>{
if (thingReport === undefined) {
console.log("useSnapshot snapshot undefined");

return;}
if (thingReportResults === undefined) {
console.log("useThingReport thingReportResults undefined");
setThingReportResults([{...thingReport, thingReportAt:zuluTime()}]);


return;}

console.log("useSnapshot snapshot", thingReport);


//const s = snapshotResults.push(snapshot);
//setSnapshotResults({...s, snapshotAt:zuluTime()});

const count = 0;
//snapshotResults.reverse().forEach((snapshotResult)=>{

for (const thingReportResult of thingReportResults.reverse()) {

if (thingReportResult.error) {count += 1;}
if (!thingReport.error) {break;}
console.log(thingReportResult);
};
setSequentialErrorCount(count);

}, [thingReport]);


useEffect(() =>{

console.log("sequentialErrorCount", sequentialErrorCount);

}, [sequentialErrorCount]);
  function getThingReport() {
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
          setThingReport(result.thingReport);
        } else {
          // Failback situation where thingReport format not found.
          setThingReport(result);
        }
        // dev flag available not available
        setFlag("green");
        const endTime = new Date();
        setThingReportGetTime(endTime - startTime);
        return result;
      })
      .catch((error) => {
        console.error("useSnapshot getWebJson error", error);
        setFlag("yellow");
        return {...thingReport, error};
        //return;
      });
  }

  const saveThingReport = (userThingReport) => {
    console.log("useThingReport saveThingReport userThingReport", userThingReport);
    setThingReport(userThingReport);
  };

  const deleteThingReport = (userThingReport) => {
    // Leave no rubbish behind.
    setThingReport(false);
  };

  return {
    deleteThingReport: deleteThingReport,
    setThingReport: saveThingReport,
    thingReport,
    flag,
    thingReportGetTime,
    thingReportInterval,
  };
}
