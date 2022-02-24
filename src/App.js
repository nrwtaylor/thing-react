import React from "react";
import Thing from "../src/components/Thing";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const pathname = window.location.pathname;

  const reg = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;

  const matches = pathname.match(reg);
  const input = { uuids: matches };
  const uuid = uuidv4();

  const createdAt = Date.now();

  console.log("REACT THING");
  console.log("Started Thing ", uuid);
  return (
    <>
      whitefox
      <Thing
        subject={pathname}
        createdAt={createdAt}
        uuid={uuid}
        input={input}
      />
    </>
  );
}
