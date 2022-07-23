import React from "react";
import Thing from "../src/components/Thing.js";
import Login from "../src/components/Login.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Input from "../src/components/Input.js";

import { v4 as uuidv4 } from "uuid";

import useToken from './useToken';

export default function App() {
  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  const input = { uuids: matches };
  const uuid = uuidv4();

  const { token, setToken } = useToken();

const things=[
{
        to:'ash',
        subject:pathname,
        createdAt:createdAt,
        uuid:uuidv4(),
        input:input,
        webPrefix:'http://localhost:3000/'

},
{
        to:'ash',
        subject:'weather',
        createdAt:createdAt,
        uuid:uuidv4(),
        input:'weather',
        webPrefix:'http://localhost:3000/'

},

{
        to:'whitefox',
        subject:pathname,
        createdAt:createdAt,
        uuid:uuidv4(),
        input:input,
        webPrefix:webPrefix

},
{
        to:'whitefox',
        subject:'weather',
        createdAt:createdAt,
        uuid:uuidv4(),
        input:'weather',
        webPrefix:webPrefix

},

{
to:'kokopelli',
        subject:pathname,
        createdAt:createdAt,
        uuid:uuidv4(),
        input:input,
        webPrefix:"http://192.168.10.10/"


},
{
to:'kokopelli',
        subject:'snapshot',
        createdAt:createdAt,
        uuid:uuidv4(),
        input:input,
        webPrefix:"http://192.168.10.10/"


}


]

  const createdAt = Date.now();

  const webPrefix = process.env.REACT_APP_WEB_PREFIX;

  console.log("REACT THING");
  console.log("Started Thing ", uuid);

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <>
      <BrowserRouter>
THING-REACT 22 July 2022

<Input />

{things && things.map((thing) =>{
return (<>
      <Thing
        to={thing.to}
        subject={thing.subject}
        createdAt={thing.createdAt}
        uuid={thing.uuid}
        input={thing.input}
        webPrefix={thing.webPrefix}
      />

</>)
}) }
{/*
      whitefox<br />
      <Thing
        subject={pathname}
        createdAt={createdAt}
        uuid={uuid}
        input={input}
        webPrefix={webPrefix}
      />

      kokopelli<br />
      <Thing
        subject={pathname}
        createdAt={createdAt}
        uuid={uuid}
        input={input}
        webPrefix={"http://192.168.10.10/"}
      />
*/}
</BrowserRouter>
    </>
  );
}
