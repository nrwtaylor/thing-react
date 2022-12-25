import { useState, useEffect } from "react";

export default function useIdentity() {


  const getIdentity = () => {
    return identity;
  };

  const [identity, setIdentity] = useState();

  const saveIdentity = (userIdentity) => {
    console.log("useIdentity saveIdentity userIdentity", userIdentity);
    setIdentity(userIdentity);
  };

  const deleteIdentity = (userIdentity) => {
    // Leave no rubbish behind.
    setIdentity(false);
  };

  return {
    deleteIdentity: deleteIdentity,
    setIdentity: saveIdentity,
    identity,
  };
}
