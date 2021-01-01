import React, { useState, useEffect } from "react";
import Agent from "../../components/Agent/Agent";
import axios from "axios";
import { Get } from "../../components/Database/Database";

export default function Thing(props) {
  //  const [thingreport, setThingReport] = useState(false);
  const subject = props.subject;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  function getResponse() {
    var t = { subject: "start" };
    var thingy = { thing: null, thing_report: null };

    // TODO Call Get from Database.js and return.
    thingy = Get(t);

    console.log("Axios call " + subject);
    axios.get(`https://stackr.ca/` + subject + `.json`).then((res) => {
      let thingy = res.data;
      setData({ thing: thingy.thing, thing_report: thingy.thing_report });
    });
  }

  function Create() {}

  function Forget() {}

  // TODO Rename
  //function Get() {getResponse();}

  useEffect(() => {
    getResponse();
  }, [getResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  // Call getResponse on a Timer.
  useEffect(() => {
    const interval = setInterval(() => {
      getResponse();
      console.log("This will run every second!");
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Agent user={null} thing={data.thing} agent_input={null} />
      <div>Thing</div>
      <div>{data.thing_report.sms}</div>
    </>
  );
}
