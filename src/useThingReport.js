import { useState, useEffect } from "react";

import { getWebJson } from "./util/database.js";
import { humanTime, zuluTime } from "./util/time.js";

//export default function useToken(inputToken) {
export default function useThingReport(input, inputThingReportPollInterval) {
  const to = input;

  const [thingReportInterval, setThingReportInterval] = useState();

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
      "useThingReport inputThingReportPollInterval",
      inputThingReportPollInterval
    );

    setThingReportInterval(inputThingReportPollInterval);
  }, [inputThingReportPollInterval]);

  useEffect(() => {
    console.log("useThingReport thingReportInterval", thingReportInterval);
    if (thingReportInterval == null) {
      return;
    }

    if (thingReportInterval === false) {return}

    getThingReport();

    const interval = setInterval(() => {
      console.log("useThingReport setInterval called input", input, thingReportInterval);
      getThingReport();
    }, thingReportInterval); // 20 Hz was 200.

    return () => clearInterval(interval);
  }, [thingReportInterval]);

  useEffect(() => {
    console.log("useThingReport input changed", input);

    // Some conditions here where a thing report should not be called.
    //if (input == null) {return;}
    //if (input && input.endsWith('\/.json')) {return;}

    getThingReport();
  }, [input]);

  useEffect(() => {
    if (thingReport == null) {
      console.log("useThingReport thingReport undefined");
      return;
    }

console.log("useThingReport thingReport", thingReport);

    if (thingReportResults == null) {
      console.log("useThingReport thingReportResults undefined");
      setThingReportResults([{ ...thingReport, thingReportAt: zuluTime() }]);

      return;
    }

    console.log("useThingReport thingReport", thingReport);

    const count = 0;

    for (const thingReportResult of thingReportResults.reverse()) {
      if (thingReportResult.error) {
        count += 1;
      }
      if (!thingReport.error) {
        break;
      }
      console.log(thingReportResult);
    }
    setSequentialErrorCount(count);
  }, [thingReport]);

  useEffect(() => {
    console.log("sequentialErrorCount", sequentialErrorCount);
  }, [sequentialErrorCount]);

  function getThingReport() {
    console.log("useThingReport getThingReport");
    const startTime = new Date();
    if (flag === "red") {
      return;
    }

    const url = to;

    if (url == null) {
      return Promise.resolve(true);
    }
    if (url && url.endsWith("/.json")) {
      return Promise.resolve(true);
    }

    console.log("useThingReport url", url);
    return getWebJson(url, "")
      .then((result) => {
        console.log("useThingReport getThingReport url result", url, result);

        if (!result) {
          return true;
        }

        if (result && result.thingReport === false) {
          // No thing report. Do not update snapshot.
          return false;
        }

        if (result && result.thingReport) {
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
        console.error("useThingReport getThingReport error", error);
        setFlag("yellow");
        return { ...thingReport, error };
        //return;
      });
  }

  const saveThingReport = (userThingReport) => {
    console.log(
      "useThingReport saveThingReport userThingReport",
      userThingReport
    );
    setThingReport(userThingReport);
  };

  const deleteThingReport = (userThingReport) => {
    // Leave no rubbish behind.
    setThingReport(false);
  };

  return {
//    deleteThingReport: deleteThingReport,
//    setThingReport: saveThingReport,
    getThingReport,
    thingReport,
    flag,
    thingReportGetTime,
    thingReportInterval,
  };
}
