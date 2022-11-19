import React, { useEffect, useState } from "react";
import Thing from "./Thing.js";
import { getThings, createThing } from "../util/database.js";
import ThingContainer from "./ThingContainer.js";
import Token from "./Token.js";
import Identity from "./Identity.js";

// For the snapshot and history routes.
// Refactor to do this programatically.
//import Snapshot from "../src/components/Snapshot.js";
//import History from "../src/components/History.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Input from "../src/components/Input.js";

//import Container from "@mui/material/Container";
//import ThingsContainer from "../src/components/ThingContainer.js";

//import Collection from "../src/components/Collection.js";
//import Host from "../src/components/Host.js";

//import MetaStack from "../src/components/MetaStack.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "../useToken";
import useIdentity from "../useIdentity";
import useInput from "../useInput";

import axios from "axios";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ThingCarousel(props) {

 const {things} = props;

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();


  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  //  const input = { uuids: matches };
  //const uuid = uuidv4();


  const { username, token, setToken, deleteToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

  //const [identity, setIdentity] = useState();
  const createdAt = Date.now();

  const [devStack, setDevStack] = useState();
  useEffect(() => {
    if (!identity) {
      //      defaultThings();
      return;
    }
    if (identity === null) {
      //      defaultThings();
      return;
    }

    //    loadThings();
  }, [identity]);

useEffect(() =>{

console.log("ThingCarousel things", things);

}, [things]);

  function handleCollectionChange(things) {
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

    const u = uuidv4();
    setUuid(u);
  }

/*
  return (
    <>

<Carousel showThumbs={false} showIndicators={false} showStatus={false}>

    <ThingContainer things={things} onCollectionChange={handleCollectionChange} token={token} />



</Carousel>

    </>
  );
*/




  return (
    <>

<Carousel showThumbs={false} showIndicators={false} showStatus={false}>

{things.map((thing)=>(

<div>
                <Thing
flavour={"item"}
                  token={token}
                  things={things}
                  uuid={thing.uuid}
datagram={thing}
//                  datagram={{
//                    to: thing.to,
//                    subject: thing.subject,
//                    webPrefix: webPrefix,
//                  }}

                />
</div>


))}



</Carousel>

    </>
  );


}
