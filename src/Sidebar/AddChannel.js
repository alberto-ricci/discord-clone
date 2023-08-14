import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AddChannel.css";

export default function AddChannel() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddChannel = async (e) => {
    e.preventDefault();
    if (channelName) {
      try {
        await addDoc(collection(db, "channels"), {
          channelName: channelName,
        });
        setOpen(false);
        setChannelName("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div>
      <Tooltip title="Add Channel">
        <AddIcon onClick={handleClickOpen} className="sidebar__addChannel" />
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleAddChannel}>
          <DialogTitle id="form-dialog-title">New Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter a new channel name:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Channel Name"
              type="text"
              fullWidth
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="dialogInput"
            />
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button
              onClick={handleClose}
              color="primary"
              className="dialogButton"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" className="dialogButton">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
