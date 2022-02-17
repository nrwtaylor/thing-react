import React, { useState, useEffect } from "react";
import Agent from "../components/Agent";
import axios from "axios";
import { Get } from "../components/Database";

export default function Thing(props) {
  //  const [thingreport, setThingReport] = useState(false);
  const subject = props.subject;

  const [data, setData] = useState({
    thing: { uuid: "X" },
    thing_report: { sms: "No response. Yet." },
  });

  function getResponse() {
    var t = { subject: subject };
    var thingy = { thing: null, thing_report: null };

    // TODO Call Get from Database.js and return.
    thingy = Get(t);

    console.log("Axios call " + subject);

    //const webPrefix = `https://stackr.ca/`;
    const webPrefix = "https://localhost/api/whitefox/";

//    axios.get(webPrefix + subject + `.json`).then((res) => {
    axios.get(`https://stackr.ca/` + subject + `.json`).then((res) => {
      let thingy = res.data;
      console.log("Thing res.data", res.data);

      // agent etime info json:null thing etc

      //setData({ thing: thingy.thing, thing_report: thingy.thing_report });
      setData(res.data);
    });
  }

  function Create() {}

  function Forget() {}

  // TODO Rename
  //function Get() {getResponse();}

/*
Call for another response immediately when the last requested one comes back.
*/
  useEffect(() => {
    getResponse();
  }, [getResponse]); // eslint-disable-line react-hooks/exhaustive-deps


  // Call getResponse on a Timer.
  useEffect(() => {
    const interval = setInterval(() => {
      getResponse();
      console.log("This will run every five minutes!");
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      THING
      <Agent user={null} thing={data.thing} agent_input={null} />

      <div>Datagram</div>
      {subject}

      <div>Thing</div>

{/* Note */}

<div>{data && data.sms}</div>


<div dangerouslySetInnerHTML={{__html: data && data.web}} />


<div>{data && data.thing && data.thing.uuid}</div>
<div>{data && data.thing && data.thing.created_at}</div>

      <div>{data && data.thing_report && data.thing_report.sms}</div>
    </>
  );
}
