import React, {useState} from "react";

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



export default function DataMonitor({thing, agentInput}) {
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

useHybridEffect(() =>{
if (databaseStatistics == null) {return;}


//    const txCountThing = databaseStatistics[uuid].txCount;
    //const rxCountThing = databaseStatistics[uuid].rxCount + databaseStatistics[uuid].rxErrorCount;
//    const rxCountThing = databaseStatistics[uuid].rxCount;

const sumArray = Object.values(databaseStatistics).reduce((accumulator, { txCount, rxCount }) => {
  accumulator.txCount += txCount;
  accumulator.rxCount += rxCount;
  return accumulator;
}, { txCount: 0, rxCount: 0 });

setStatistics(sumArray);

}, [databaseStatistics]);

  const DataReport = () => {

    return (
      <>
            TXPACKETS {txCount}
            <br />
            RXPACKETS {rxCount + rxErrorCount}
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
            PACKETS {statistics && statistics.txCount}
            {"/"}
            {statistics && statistics.rxCount}
            <br />
      </>
    );
  };


  return (
<>
Flop
    <div className="logout-wrapper">
<DataReport />
    </div>
</>  );
}

