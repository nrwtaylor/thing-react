import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";
import Variable from "../components/Variable.js";

export default function Associations({ datagram }) {
  const [associations, setAssociations] = useState();
  // Display token.

  useEffect(() => {
    console.log("Associations datagram", datagram);
    if (!datagram) {
      return;
    }

    if (datagram === null) {
      return;
    }

    if (!datagram.associations) {
      return;
    }

    setAssociations(datagram && datagram.associations);
  }, [datagram]);

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

Associations.propTypes = {
  //  token: PropTypes.func.isRequired
};
