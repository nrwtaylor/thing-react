import React, { useEffect, useState, lazy, Suspense } from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import TokenLogin from "../src/components/TokenLogin.js";

import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
import ThingCards from "../src/components/ThingCards.js";

import { getThings, createThing } from "../src/util/database.js";

import ZuluTime from "../src/components/ZuluTime.js";

import Token from "../src/components/Token.js";
import Identity from "../src/components/Identity.js";

// For the snapshot and history routes.
// Refactor to do this programatically.
import Snapshot from "../src/components/Snapshot.js";
import History from "../src/components/History.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from "@mui/material/Container";
import ThingsContainer from "../src/components/ThingContainer.js";

import TemperatureHumidity from "../src/components/TemperatureHumidity.js";

import Collection from "../src/components/Collection.js";
import Host from "../src/components/Host.js";

import MetaStack from "../src/components/MetaStack.js";
import ThingCarousel from "../src/components/ThingCarousel.js";

import { v4 as uuidv4 } from "uuid";

import useThings from "./useThings";
import useToken from "./useToken";
import useIdentity from "./useIdentity";
import useInput from "./useInput";

import axios from "axios";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//export default function App() {
/*
const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};
*/
export default function App({ componentName, ...props }) {
  const DynamicComponent = lazy(() => import(`./components/${componentName}`));

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

  const [uuid, setUuid] = useState();

  const pathname = window.location.pathname;

  const reg =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);

  //  const [things, setThings] = useState([]);

  const { things, getThings, setThings } = useThings();

  const { username, token, setToken, deleteToken, isValidToken } = useToken();
  const { identity, setIdentity, deleteIdentity } = useIdentity();
  const { input, setInput, deleteInput } = useInput();

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

//  useEffect(() => {
//    console.log("App [] start");
    //    loadThings();
//    getThings(token);
//  }, []);

  useEffect(() => {
    console.log("App things", things);
  }, [things]);

//  useEffect(() => {
//    console.log("App token", token);
    //    loadThings();
//    getThings(token);
//  }, [token]);

//  useEffect(() => {
//    console.log("App identity", identity);
//  }, [identity]);

  function handleCollectionChange(things) {
    //   setThings(things);
    if (things && things[0] && things[0].uuid) {
      console.log("App setUuid", things[0].uuid);
      setUuid(things[0].uuid);
      return;
    }

if (things.length === 0) {return;}

    const u = uuidv4();
    setUuid(u);
    setThings(things);
    getThings(token);
    //    loadThings();
  }

  return (
    <>
      THING-REACT 25 December 2022 ec2c
      <br />
      {identity && <Identity identity={identity} />}
      {token && token.message}
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <ThingCarousel token={token} things={things} />
              </>
            }
          >
            SLASH THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/things"
            element={
              <>
                <ThingCards
                  token={token}
                  things={things}
                  onCollectionChange={(c) => {
                    handleCollectionChange(c);
                  }}
                />
              </>
            }
          >
            THINGS
          </Route>

          <Route
            exact
            path="/snapshot/:uuid/temperature-humidity"
            element={
              <Snapshot
                datagram={{
                  to: "agent",
                  subject: pathname
                    .replace("/snapshot/", "")
                    .replace("/temperature-humidity/", ""),
                  webPrefix: webPrefix,
                }}
              />
            }
          >
            SNAPSHOT
          </Route>

          <Route exact path="/snapshot/:text" element={<Snapshot />}>
            SNAPSHOT
          </Route>

          <Route
            exact
            path="/history/:text"
            element={
              <History
                datagram={{
                  to: "agent",
                  subject: pathname.replace("/history/", ""),
                  webPrefix: webPrefix,
                }}
              />
            }
          >
            HISTORY
          </Route>

          <Route
            exact
            path="/:channel/:uuid/:text"
            element={
              <>
                <ThingCarousel
                  token={token}
                  things={[
                    { to: "agent", subject: pathname, webPrefix: webPrefix },
                    ...things,
                  ]}
                />
              </>
            }
          >
            THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/:uuid/:text"
            element={
              <>
                <ThingCarousel
                  token={token}
                  things={[
                    { to: "agent", subject: pathname, webPrefix: webPrefix },
                    ...things,
                  ]}
                />
              </>
            }
          >
            THINGCAROUSEL
          </Route>

          <Route
            exact
            path="/:text"
            element={
              <>
                <ThingCarousel
                  token={token}
                  things={[
                    { to: "agent", subject: pathname, webPrefix: webPrefix },
                    ...things,
                  ]}
                />
              </>
            }
          >
            THINGCAROUSEL
          </Route>
        </Routes>
      </BrowserRouter>
      <ZuluTime />
      <Host />
      <MetaStack />
      {devStack} ms
      <br />
      {token}
      <br />
      {isValidToken ? "VALID TOKEN" : "NOT VALID TOKEN"}
      <br />
      End.
    </>
  );
}
