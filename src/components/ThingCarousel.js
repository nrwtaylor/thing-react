import React, { useEffect, useState } from "react";
import Thing from "./Thing.js";
import { getThings, createThing } from "../util/database.js";

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

export default function ThingCarousel() {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();

  const defaultThings = [
    {
      index: 20,
      to: "localhost",
      subject: "start",
      createdAt: Date.now(),
      uuid: uuidv4(),
      input: "start",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
    {
      index: 21,
      to: "localhost",
      subject: "snapshot 03bf6037-3644-48da-999b-c3bdc6cee39f kokopelli",
      createdAt: Date.now(),
      uuid: testUuid0,
      input: "start",
      //      webPrefix: "http://192.168.10.10/snapshot.json",
    },
  ];

  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  //  const input = { uuids: matches };
  //const uuid = uuidv4();

  const [things, setThings] = useState(defaultThings);

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

  useEffect(() => {
    //      defaultThings();
  }, []);

  function loadThings() {
    console.log("App loadThings token", token);
    console.log("App loadThings apiPrefix", apiPrefix);
    getThings(apiPrefix, token)
      .then((result) => {
        console.log("App loadThings result", result);

        if (result.things.length === 0) {
          // Load the defaultThings into stack

          things.map((thing) => {
            const doNotWait = createThing(webPrefix, thing, token)
              .then((result) => {
                console.log("App createThing result", result);

                return;
              })
              .catch((error) => {
                console.log("App createThing error", error);
                return;
              });
          });

          return;
        }

        //const combinedThings = [...things, ...result.things];

        const combinedThings = [...result.things];

        console.log("App combinedThings", combinedThings);

        const uuids = combinedThings.map((o) => o.uuid);
        const deduplicatedThings = combinedThings.filter(
          ({ uuid }, index) => !uuids.includes(uuid, index + 1)
        );

        const conditionedThings = deduplicatedThings.map((thing, index) => {
          return { ...thing, index: index };
        });

        //const deduplicatedThings = combinedThings.filter((value, index, self) =>
        //  index === self.findIndex((t) => (
        //    t.uuid === value.uuid
        //  ))
        //)

        console.log("App conditionedThings", conditionedThings);

        setThings(conditionedThings);
      })
      .catch((error) => {
        console.log("App loadThings error", error);
      });
  }

  useEffect(() => {
    console.log("App token", token);

    if (!token) {
      return;
    }
    if (token === null) {
      return;
    }

    loadThings();
  }, [token]);

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

  return (
    <>

<Carousel showThumbs={false} showIndicators={false} showStatus={false}>

{things.map((thing)=>(

<div>
                <Thing
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
