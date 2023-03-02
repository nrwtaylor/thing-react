import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";

import { humanTime } from "./../util/time.js";

export default function Content({ thing, agentInput }) {
  const [content, setContent] = useState();

  const thingReport = agentInput;

  useEffect(() => {
    if (!thingReport) {
      return;
    }

    if (thingReport && thingReport.snippet) {
      setContent(thingReport.snippet);
      return;
    }

    if (thingReport && thingReport.email) {
      setContent(thingReport.email);
      return;
    }

    if (thingReport && thingReport.message) {
      setContent(thingReport.message);
      return;
    }
    if (thingReport && thingReport.sms) {
      setContent(thingReport.sms);
      return;
    }

    setContent("No content found.");
  }, [thingReport]);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </>
  );
}
/*
Content.propTypes = {
  thingReport: PropTypes.func.isRequired,
};
*/
