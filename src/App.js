import React, { useEffect, useState } from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import Logout from "../src/components/Logout.js";
import Signup from "../src/components/Signup.js";
import { getThings, createThing } from "../src/util/database.js";

import Token from "../src/components/Token.js";
import Identity from "../src/components/Identity.js";
import Snapshot from "../src/components/Snapshot.js";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from "@mui/material/Container";
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";
import useIdentity from "./useIdentity";
import useInput from "./useInput";

import axios from "axios";

export default function App() {
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  const stack0Prefix = process.env.REACT_APP_STACK_0;

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
  const uuid = uuidv4();

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
    console.log("token", token);
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

//setThings(things);


}

  return (
    <>
      <Identity identity={identity} />
      <BrowserRouter>


           <Routes>
                 <Route exact path='/' element={<>


        THING-REACT 6 September 2022
        {!token && (
          <>
            <Login setToken={setToken} setIdentity={setIdentity} />
            <Signup />
          </>
        )}
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
<Token token={token} setToken={setToken} setIdentity={setIdentity} />
<br />
        {token && things && (
          <>
            <Logout deleteToken={deleteToken} />

            <Container maxWidth="sm">
              <Collection
                token={token}
                things={things}
                onCollectionChange={(c) => {handleCollectionChange(c)}}
              />
            </Container>
          </>
        )}

 </>}></Route>

           <Route exact path='/thing/:text' element={< Thing datagram={{to:"agent", subject:"thing", webPrefix:webPrefix }} />}></Route>
{/*<Route exact path = '/thing/:text' render={(routeParams) => <Thing datagram={{to:"thing", subject:"hello", subject2:routeParams.text}} width={200} />} />*/}
{/*<Route exact path = '/thing/:text' render={(props) => {<Thing datagram={{to:"thing", subject:props.match.params.text}} />} }/>*/}
{/*<Route exact path="/thing/" render={(props) => (
<>
foo
    <Thing agentInput={""}/>
bar
</>
)} />*/}

                 <Route exact path='/snapshot/:text' element={< Snapshot />}></Route>
          </Routes>

      </BrowserRouter>
End.
    </>
  );
}

