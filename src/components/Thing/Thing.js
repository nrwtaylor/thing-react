import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Thing(props) {
  const [thingreport, setThingReport] = useState(false);
  const subject = props.subject;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  function getResponse() {
    console.log("Axios call.");
    axios.get(`https://stackr.ca/` + subject + `.json`).then((res) => {
      let thingy = res.data;
      setData({ thing: thingy.thing, thing_report: thingy.thing_report });
    });
  }

  useEffect(() => {
    getResponse();
  }, [getResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  // Call getResponse on a Timer.
  useEffect(() => {
    //getResponse();

    const interval = setInterval(() => {
      getResponse();
      console.log("This will run every second!");
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>Thing</div>
      <div>{data.thing.uuid}</div>
      <div>{data.thing.created_at}</div>

      <div>{data.thing_report.sms}</div>
    </>
  );
}

/*
      <ul>
        { persons.map(person => <li>{person.name}</li>)}
      </ul>
*/
