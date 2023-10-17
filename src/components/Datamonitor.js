import React, { useState } from "react";

import {
  //  getThingReport,
  databaseStatistics,
  //  setThing,
  txCount,
  rxCount,
  rxBytes,
  txData,
  rxData,
  txBytes,
  rxErrorCount,
  txErrorCount,
} from "../util/database.js";

import useHybridEffect from "../useHybridEffect.js";

export default function DataMonitor({ thing, agentInput }) {
  const [statistics, setStatistics] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    //    const token = await loginUser({
    //      username,
    //      password
    //    });
    const credentials = null;
    console.log("Logout handleSubmit");
    //    reauthorizeUser(credentials);
    //    const token = false;
    //    deleteToken(token);
  };

  useHybridEffect(() => {
console.log("DataMonitor databaseStatistics", databaseStatistics);
    if (databaseStatistics == null) {
      return;
    }

    //    const txCountThing = databaseStatistics[uuid].txCount;
    //const rxCountThing = databaseStatistics[uuid].rxCount + databaseStatistics[uuid].rxErrorCount;
    //    const rxCountThing = databaseStatistics[uuid].rxCount;

    const sumArray = Object.values(databaseStatistics).reduce(
      (
        accumulator,
        {
          txCount,
          rxCount,
          txData,
          rxData,
          rxErrorCount,
          txErrorCount,
          rxBytes,
          txBytes,
        }
      ) => {
        accumulator.txCount += txCount;
        accumulator.rxCount += rxCount;

        accumulator.txData += txData;
        accumulator.rxData += rxData;

        accumulator.txErrorCount += txErrorCount;
        accumulator.rxErrorCount += rxErrorCount;

        accumulator.txBytes += txBytes;
        accumulator.rxBytes += rxBytes;

        return accumulator;
      },
      {
        txCount: 0,
        rxCount: 0,
        txData: 0,
        rxData: 0,
        txErrorCount: 0,
        rxErrorCount: 0,
        rxBytes: 0,
        txBytes: 0,
      }
    );

    setStatistics(sumArray);
  }, [databaseStatistics]);

  return (
    <>
<div>
PASSED<br />
            TXPACKETS {txCount}
            <br />
            RXPACKETS{" "}
            {rxCount + rxErrorCount}
            <br />
            TXDATA {txData}
            <br />
            RXDATA {rxData}
            <br />
            RXERRORCOUNT {rxErrorCount}
            <br />
            TXERRORCOUNT {txErrorCount}
            <br />
            RXBYTES {rxBytes} estimated
            <br />
            TXBYTES {txBytes} estimated
            <br />
            PACKETS {txCount}
            {"/"}
            {rxCount}
            <br />

</div>
<br />
      <div>
        {thing && thing.uuid && databaseStatistics.hasOwnProperty(thing.uuid) && (
          <>
{thing.uuid}<br />
            TXPACKETS {databaseStatistics[thing.uuid].txCount}
            <br />
            RXPACKETS{" "}
            {databaseStatistics[thing.uuid].rxCount +
              databaseStatistics[thing.uuid].rxErrorCount}
            <br />
            TXDATA {databaseStatistics[thing.uuid].txData}
            <br />
            RXDATA {databaseStatistics[thing.uuid].rxData}
            <br />
            RXERRORCOUNT {databaseStatistics[thing.uuid].rxErrorCount}
            <br />
            TXERRORCOUNT {databaseStatistics[thing.uuid].txErrorCount}
            <br />
            RXBYTES {databaseStatistics[thing.uuid].rxBytes} estimated
            <br />
            TXBYTES {databaseStatistics[thing.uuid].txBytes} estimated
            <br />
            PACKETS {databaseStatistics[thing.uuid].txCount}
            {"/"}
            {databaseStatistics[thing.uuid].rxCount}
            <br />
          </>
        )}
      </div>
<br/>
      <div>
        {true && (
          <>
STACK<br />
            TXPACKETS {statistics && statistics.txCount}
            <br />
            RXPACKETS{" "}
            {statistics && statistics.rxCount + statistics.rxErrorCount}
            <br />
            TXDATA {statistics && statistics.txData}
            <br />
            RXDATA {statistics && statistics.rxData}
            <br />
            RXERRORCOUNT {statistics && statistics.rxErrorCount}
            <br />
            TXERRORCOUNT {statistics && statistics.txErrorCount}
            <br />
            RXBYTES {statistics && statistics.rxBytes} estimated
            <br />
            TXBYTES {statistics && statistics.txBytes} estimated
            <br />
            PACKETS {statistics && statistics.txCount}
            {"/"}
            {statistics && statistics.rxCount}
            <br />
          </>
        )}
      </div>
    </>
  );
}
