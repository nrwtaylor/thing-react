import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import Variable from "../components/Variable.js";

import useHybridEffect from "../useHybridEffect.js";


export default function Associations({ thing }) {
  const [associations, setAssociations] = useState();
  // Display token.

  useHybridEffect(() => {
    //console.log("Associations thing", thing);
    if (!thing) {
      return;
    }

    if (thing === null) {
      return;
    }

    if (!thing.associations) {
      return;
    }

    setAssociations(thing && thing.associations);
  }, [thing]);

  useEffect(() => {
    console.log("Associations associations", associations);
  }, [associations]);

  return (
    <>
      ASSOCIATIONS
      <Variable variable={associations} />
      {associations && Array.isArray(associations) && (
        <>
          {associations.map((association) => {
            return <>X</>;
          })}
        </>
      )}
      <br />
    </>
  );
}

//Associations.propTypes = {
  //  token: PropTypes.func.isRequired
//};
