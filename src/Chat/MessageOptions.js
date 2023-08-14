import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function MessageOptions({ messageId, channelId, userId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openEditDialog = (initialMessage) => {
    setEditedMessage(initialMessage);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const openErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleEditSave = async () => {
    const messageRef = doc(db, "channels", channelId, "messages", messageId);
    try {
      await updateDoc(messageRef, { message: editedMessage });
    } catch (error) {
      console.error("Error updating the message:", error);
      alert("Failed to update the message. Please try again.");
    }
    closeEditDialog();
  };

  const handleEdit = async () => {
    const messageRef = doc(db, "channels", channelId, "messages", messageId);
    const messageDoc = await getDoc(messageRef);
    const messageData = messageDoc.data();

    if (messageData.user.uid === userId) {
      openEditDialog(messageData.message);
    } else {
      openErrorDialog();
    }
    handleClose();
  };

  const handleDelete = async () => {
    const messageRef = doc(db, "channels", channelId, "messages", messageId);
    const messageDoc = await getDoc(messageRef);
    const messageData = messageDoc.data();

    if (messageData.user.uid === userId) {
      await deleteDoc(messageRef);
    } else {
      openErrorDialog();
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="message-options-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Tooltip title="Message options">
          <MoreHorizIcon />
        </Tooltip>
      </IconButton>
      <Menu
        id="message-options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit Message</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Message</MenuItem>
      </Menu>

      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Message</DialogTitle>
        <DialogContent>
          <DialogContentText>Please edit your message below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isErrorDialogOpen} onClose={closeErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can only edit or delete your own messages.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeErrorDialog} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MessageOptions;
