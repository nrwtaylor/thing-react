import React from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import Logout from "../src/components/Logout.js";
import Token from "../src/components/Token.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "../src/components/Input.js";

import Container from '@mui/material/Container';
import ThingsContainer from "../src/components/ThingContainer.js";

import Collection from "../src/components/Collection.js";

import { v4 as uuidv4 } from "uuid";

import useToken from "./useToken";

export default function App() {
  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  const input = { uuids: matches };
  const uuid = uuidv4();

  const { token, setToken, deleteToken } = useToken();

  const createdAt = Date.now();

  // dev here user supplied channels.
  //const channel0 = process.env.REACT_APP_CHANNEL_0;
  const webPrefix = process.env.REACT_APP_WEB_PREFIX;
  const testUuid0 = process.env.REACT_APP_THING_0;
  const testUuid1 = process.env.REACT_APP_THING_1;

  const things = [
    {
      index: 8,
      to: "stack",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 9,
      to: "agent",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: "http://192.168.10.10/stack/",
    },
    {
      index: 10,
      to: "agent",
      subject: "day twilight tmlr",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "day twilight tmlr",
      webPrefix: "http://192.168.10.10/stack/",
    },
{
      index: 11,
      to: "agent",
      subject: "roll d20",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "roll",
      webPrefix: "http://192.168.10.10/stack/",
    },

{
      index: 12,
      to: "agent",
      subject: "roll",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "roll",
      webPrefix: "http://192.168.10.10/stack/",
    },
{
      index: 13,
      to: "agent",
      subject: "card",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "card",
      webPrefix: "http://192.168.10.10/stack/",
    },
{
      index: 14,
      to: "agent",
      subject: "day-twilight-tmlr",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: null,
      webPrefix: "http://192.168.10.10/stack/",
    },

    {
      index: 15,
      to: "agent",
      subject: "snapshot",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/stack/",
    },

{
      to: "coop",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://localhost:3000/",
      pollInterval: 60000,
    },
    {
      index: 1,
      to: "coop",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: "http://localhost:3000/",
      pollInterval: 5 * 60000,
    },

    {
      index: 2,
      to: "whitefox",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: webPrefix,
      pollInterval: 60000,
    },
    {
      index: 3,
      to: "whitefox",
      subject: "weather",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: "weather",
      webPrefix: webPrefix,
      pollInterval: 10 * 60000,
    },

    {
      index: 4,
      to: "kokopelli",
      subject: pathname,
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/",
      pollInterval: 50,
    },
    {
      index: 5,
      to: "kokopelli",
      subject: "snapshot",
      createdAt: createdAt,
      uuid: uuidv4(),
      input: input,
      webPrefix: "http://192.168.10.10/",
      pollInterval: 50,
    },
    {
      index: 6,
      to: 'kokopelli',
      subject: 'snapshot',
      uuid:testUuid0,
      input: "snapshot",
      webPrefix: webPrefix + 'snapshot/' + testUuid0 + '/',
      pollInterval: 60000,
    },
    {
      index: 7,
      to: 'coop',
      subject: 'snapshot',
      uuid:testUuid1,
      input: "snapshot",
      webPrefix: webPrefix + 'snapshot/' + testUuid1 + '/',
      pollInterval: 60000,
    },

  ];


  console.log("REACT THING");
  console.log("Started Thing ", uuid);

  return (
    <>
      <Token token={token} />

      <BrowserRouter>
        THING-REACT 29 July 2022
        {!token && <Login setToken={setToken} />}
        <Input />
        {token && (
          <>
            <Logout deleteToken={deleteToken} />
<Container maxWidth="sm" >
<Collection things={things} onCollectionChange={()=>{}}/>

{/*
            {things &&
              things.map((thing) => {
                return (
                  <div key={thing.uuid} >
                    <Thing
                      to={thing.to}
                      subject={thing.subject}
                      createdAt={thing.createdAt}
                      uuid={thing.uuid}
                      input={thing.input}
                      webPrefix={thing.webPrefix}
                    />
                  </div>
                );
              })}
*/}
</Container>
          </>
        )}
      </BrowserRouter>
    </>
  );
}
