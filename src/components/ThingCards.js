import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Collection from "../components/Collection.js";

export default function ThingCards(props) {
  const { token, things } = props;

  function handleCollectionChange(c) {
    if (props.onCollectionChange) {
      props.onCollectionChange(c);
    }
  }

  if (!things) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Collection
        token={token}
        things={things}
        onCollectionChange={(c) => {
          handleCollectionChange(c);
        }}
      />
    </Container>
  );
}
