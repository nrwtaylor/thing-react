import React, { useEffect, useState } from "react";
//import './Login.css';
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import UpdateIcon from '@mui/icons-material/Update';

import { humanTime, humanAge, humanRuntime } from "./../util/time.js";

export default function MetaStack({ metaStack, onRefresh }) {

  useEffect(() => {
    if (!metaStack) {
      return;
    }

    if (metaStack === null) {
      return;
    }
  }, [metaStack]);

  return (
    <>

<div class="meta-stack">

<div class="id-image">
<img src="https://stackr.ca/pixel_sml.png" />
</div>


#devstack {metaStack}
</div>

    </>
  );
}

MetaStack.propTypes = {
  //  token: PropTypes.func.isRequired
};
