import React from "react";
import Thing from "../src/components/Thing";

export default function App() {
  const pathname = window.location.pathname;

  return (
    <>
      whitefox
      <Thing subject={pathname} />
    </>
  );
}
