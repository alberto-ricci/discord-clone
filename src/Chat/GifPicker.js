import React, { useRef } from "react";
import gifs from "./gifs.json";
import "./GifPicker.css";

function GifPicker({ show, onClose, onSelect }) {
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
    <div className="gif-picker-modal" onClick={handleOutsideClick}>
      <div className="gif-picker-dialog" ref={containerRef}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="gif__picker">
          {gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.url}
              alt={gif.title}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(gif.url);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GifPicker;
