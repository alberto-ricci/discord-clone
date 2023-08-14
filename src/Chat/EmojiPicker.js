import React, { useRef } from "react";
import emojis from "./emojis.json";
import "./EmojiPicker.css";

function EmojiPicker({ show, onClose, onSelect }) {
  const containerRef = useRef(null);

  if (!show) {
    return null;
  }

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="emoji-picker-modal" onClick={handleOutsideClick}>
      <div className="emoji-picker-dialog" ref={containerRef}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="emoji__picker">
          {emojis.map((emoji) => (
            <span
              key={emoji.id}
              onClick={() => {
                onSelect(emoji.symbol);
              }}
            >
              {emoji.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmojiPicker;
