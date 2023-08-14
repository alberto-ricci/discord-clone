import React, { useState, useRef, useEffect } from "react";
import "./ChatInput.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Tooltip from "@mui/material/Tooltip";
import emojis from "./emojis.json";
import gifs from "./gifs.json";
import { selectChannelName } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "../Firebase/Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmojiPicker from "./EmojiPicker";
import GifPicker from "./GifPicker";
import CloseIcon from "@mui/icons-material/Close";

function ChatInput({ channelId }) {
  const user = useSelector(selectUser);

  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);

  const emojiPickerRef = useRef();
  const gifPickerRef = useRef();
  const emojiIconRef = useRef();
  const gifIconRef = useRef();
  const chatInputRef = useRef();

  useEffect(() => {
    console.log(channelId);
  }, [channelId]);

  const handleEmojiSelect = (emoji) => {
    setInput(input + emoji);
    setShowEmojiPicker(false);
  };

  const onGifSelect = (gif) => {
    setSelectedGif(gif);
    setShowGifPicker(false);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      !emojiIconRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }

    if (
      gifPickerRef.current &&
      !gifPickerRef.current.contains(event.target) &&
      !gifIconRef.current.contains(event.target)
    ) {
      setShowGifPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId || !channelName) {
      alert("Please select a channel before sending a message.");
      return;
    }

    let messageContent = input.trim();

    if (!messageContent && !selectedGif) {
      alert("You cannot send an empty message.");
      return;
    }

    if (selectedGif) {
      messageContent = selectedGif;
    }

    addDoc(collection(db, "channels", channelId, "messages"), {
      message: messageContent,
      user: user,
      timestamp: serverTimestamp(),
    }).catch((error) => {
      console.error("Error sending message:", error);
    });

    setInput("");
    setSelectedGif(null);
  };

  return (
    <div className="chat__input" ref={chatInputRef}>
      <Tooltip title="Send message">
        <AddCircleIcon fontSize="large" onClick={sendMessage} />
      </Tooltip>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            selectedGif ? "" : `Message ${channelName ? "#" + channelName : ""}`
          }
        />
        {selectedGif && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={selectedGif}
              alt="Selected gif"
              style={{ width: "50px", height: "50px" }}
            />
            <CloseIcon
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
              onClick={() => setSelectedGif(null)}
            />
          </div>
        )}
        <button
          className="chat__inputButton"
          type="submit"
          style={{ display: "none" }}
        >
          Send Message
        </button>
      </form>

      <div className="chat__inputIcons">
        <Tooltip title="Send gif">
          <GifIcon
            className={showGifPicker ? "active" : ""}
            fontSize="large"
            ref={gifIconRef}
            onClick={() => {
              setShowGifPicker(!showGifPicker);
              setShowEmojiPicker(false);
            }}
          />
        </Tooltip>
        <GifPicker
          show={showGifPicker}
          onSelect={onGifSelect}
          gifs={gifs}
          onClose={() => setShowGifPicker(false)}
        />

        <Tooltip title="Send emoji">
          <EmojiEmotionsIcon
            fontSize="large"
            ref={emojiIconRef}
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowGifPicker(false);
            }}
          />
        </Tooltip>
        <EmojiPicker
          className={showGifPicker ? "active" : ""}
          ref={emojiPickerRef}
          show={showEmojiPicker}
          onSelect={handleEmojiSelect}
          emojis={emojis}
          onClose={() => setShowEmojiPicker(false)}
        />
      </div>
    </div>
  );
}

export default ChatInput;
