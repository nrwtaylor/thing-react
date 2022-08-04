import { useState, useEffect } from "react";

export default function useIdentity() {

  const getIdentity = () => {
    return identity;
  };

  const [identity, setIdentity] = useState();

  const saveIdentity = (userIdentity) => {
    console.log("useToken saveToken userToken", userIdentity);

    //localStorage.setItem("token", JSON.stringify(userIdentity));

    setIdentity("hey");
  };

  const deleteIdentity = (userIdentity) => {
    // Leave no rubbish behind.

    //localStorage.clear();
    setIdentity(false);
  };

  return {
    deleteIdentity: deleteIdentity,
    setIdentity: saveIdentity,
    identity,
  };
}
