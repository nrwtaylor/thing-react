import React, { useState, useEffect, Fragment } from "react";

// Material UI
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

import { DeleteOutline } from "@mui/icons-material";

function Forget(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Forget useEffect");
  }, []); // notice, no second argument

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteThing() {
    if (props.uuid === undefined) {
      return;
    }

    props.callBack();
    props.handleForgetThing();
    /*
    db.collection("things")
.doc(props.id)
.delete()
.then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
*/

    setOpen(false);
  }

  return (
    <Fragment>
      <Button tip="Forget Thing" onClick={handleOpen}>
        <DeleteOutline color="secondary" />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to forget this Thing ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteThing} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default Forget;
