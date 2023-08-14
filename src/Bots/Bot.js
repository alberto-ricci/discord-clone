import React from "react";

function Bot({ botData, onBotClick }) {
  return (
    <div className="userOnline" onClick={() => onBotClick(botData)}>
      <div className="userOnline__content">
        <img src={botData.avatar} alt={botData.name} />
        <h4>{botData.name}</h4>
      </div>

      <div className="greenDot"></div>
    </div>
  );
}

export default Bot;
