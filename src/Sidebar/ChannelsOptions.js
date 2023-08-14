import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import "./ChannelsOptions.css";
import Tooltip from "@mui/material/Tooltip";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function ChannelsOptions({ channelId }) {
  const [isLocked, setIsLocked] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteChannel = async () => {
    const channelRef = doc(db, "channels", channelId);
    await deleteDoc(channelRef);
  };

  return (
    <div className="channelsOptions">
      <Tooltip title="Delete Channel">
        <span>
          <DeleteIcon
            className="channelsOptions__icon"
            onClick={() => !isLocked && setDeleteDialogOpen(true)}
            style={{
              cursor: isLocked ? "not-allowed" : "pointer",
              opacity: isLocked ? 0.5 : 1,
            }}
          />
        </span>
      </Tooltip>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          {"Are you sure you want to delete this channel?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              deleteChannel();
              setDeleteDialogOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {isPinned ? (
        <Tooltip title="Unpin Channel">
          <PushPinIcon
            className="channelsOptions__icon"
            onClick={() => setIsPinned(false)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Pin Channel">
          <PushPinOutlinedIcon
            className="channelsOptions__icon"
            onClick={() => setIsPinned(true)}
          />
        </Tooltip>
      )}
      {isLocked ? (
        <Tooltip title="Unlock Channel">
          <LockIcon
            className="channelsOptions__icon"
            onClick={() => setIsLocked(false)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Lock Channel">
          <LockOpenIcon
            className="channelsOptions__icon"
            onClick={() => setIsLocked(true)}
          />
        </Tooltip>
      )}
    </div>
  );
}

export default ChannelsOptions;
