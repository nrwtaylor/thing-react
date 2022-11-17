import React, { useEffect, useState } from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
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

import Collection from "../src/components/Collection.js";
import Host from "../src/components/Host.js";

import MetaStack from "../src/components/MetaStack.js";
import ThingCarousel from "../src/components/ThingCarousel.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";
import useIdentity from "./useIdentity";
import useInput from "./useInput";

import axios from "axios";

//import { useSwipeable } from "react-swipeable";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
export default function App() {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;
/*
  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    ...config,
  });
*/
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

  // dev here user supplied channels.
  //  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  //  const testUuid0 = process.env.REACT_APP_THING_0;
  //  const testUuid1 = process.env.REACT_APP_THING_1;
  // const apiPrefix = process.env.REACT_APP_API_PREFIX;
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

  //useEffect(() =>{

  //const n = Date.now() - createdAt;
  //setDevStack(Date.now());

  //});

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

                //          newThing.associations = {
                //            ...newThing.associations,
                //            uuid: result.uuid,
                //          };

                //          setThings(
                //            update(things, {
                //              $splice: [[index, 0, newThing]],
                //            })
                //          );

                //          props.onCollectionChange(things);
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

    /*;

    const u = apiPrefix + "things/";
    axios
      .get(u, {
        headers: {
          Authorization: "my secret token",
          "x-access-token": token,
        },
      })

      .then((res) => {
        let thingy = res.data;
        console.log("Things axios res", res);
        console.log("Things axios res.data", res.data);



        //setThings({...things, ...thingy});

        // agent etime info json:null thing etc
        //        setData(res.data);

        //        const elapsedTime = Date.now() - requestedAt;
      })
      .catch((error) => {
        console.log("Thing error", u, error);
        //        setError({ ...error, message: "Problem" });
      });

*/
  }

  useEffect(() => {
    console.log("App token", token);
    //setIdentity(token);
    //console.log("identity",identity);

    if (!token) {
      return;
    }
    if (token === null) {
      return;
    }

    loadThings();
  }, [token]);

  useEffect(() => {
    console.log("App identity", identity);
  }, [identity]);

  //  function defaultThings() {}
  //function defaultThings() {

  //console.log("defaultThings");

  //  setThings(defaultThings);
  //}
  //  console.log("REACT THING");
  //  console.log("Started Thing ", uuid);

  //}

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
      THING-REACT 17 November 2022 701d
      <br />
      <Identity identity={identity} />
    {/*  <Token token={token} setToken={setToken} setIdentity={setIdentity} /> */}
<Carousel showThumbs={false} showStatus={false} useKeyboardArrows >
{token && (
<div>
      <Token token={token} setToken={setToken} setIdentity={setIdentity} />

</div>)}
{!token && (
<div>
            <Login setToken={setToken} setIdentity={setIdentity} />
</div>)}

{!token &&(
<div>

            <Signup />
</div>)}
</Carousel>




{token && token.message}




      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Input setInput={setInput} />

                {/*
        <div key={"2"}>
          <Thing
            token={token}
            datagram={{
              to: "agent",
              subject: input,
              createdAt: 0,
              input: "web",
              webPrefix: webPrefix,
            }}
            //                      webPrefix={webPrefix}
          />
        </div>
*/}
                <br />
                {/*            <Logout deleteToken={deleteToken} /> */}

                <Container maxWidth="sm">
                  <Collection
                    token={token}
                    things={things}
                    onCollectionChange={(c) => {
                      handleCollectionChange(c);
                    }}
                  />
                </Container>
              </>
            }
          ></Route>

          <Route
            exact
            path="/thing/:text"
            element={
              <Thing
                token={token}
                things={things}
                datagram={{
                  to: "agent",
                  subject: "thing",
                  webPrefix: webPrefix,
                }}
              />
            }
          ></Route>

          <Route
            exact
            path="/thing"
            element={
              <>

<ThingCarousel />
{/*
                {things.length - 1} more thing.
                <Thing
                  token={token}
                  things={things}
                  uuid={uuid}
                  datagram={{
                    to: "agent",
                    subject: "thing",
                    webPrefix: webPrefix,
                  }}
                />
*/}
              </>
            }
          ></Route>

          {/*<Route exact path = '/thing/:text' render={(routeParams) => <Thing datagram={{to:"thing", subject:"hello", subject2:routeParams.text}} width={200} />} />*/}
          {/*<Route exact path = '/thing/:text' render={(props) => {<Thing datagram={{to:"thing", subject:props.match.params.text}} />} }/>*/}
          {/*<Route exact path="/thing/" render={(props) => (
<>
foo
    <Thing agentInput={""}/>
bar
</>
)} />*/}

          <Route exact path="/snapshot/:text" element={<Snapshot />}></Route>

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
          ></Route>

          {/*
  <Route exact path="/history/:text" element={props => <History
                datagram={{
                  to: "agent",
                  subject: "thing",
                  webPrefix: webPrefix
                }}
 /> } />
*/}
        </Routes>
      </BrowserRouter>
      <ZuluTime />
      <Host />
      <MetaStack />
      {devStack} ms End.
    </>
  );
}
