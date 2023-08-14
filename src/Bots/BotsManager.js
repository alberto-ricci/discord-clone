import React, { useState, useEffect } from "react";
import Bot from "./Bot";
import { botsData } from "./BotsData";
import { botsBehavior } from "./BotsBehavior";
import { Tooltip } from "@mui/material";

function BotManager({ onBotClick, onBotsRendered }) {
  const [botsOnline, setBotsOnline] = useState([]);

  useEffect(() => {
    const bots = Object.values(botsBehavior);

    bots.forEach((botData) => {
      const { behavior } = botData;

      const scheduleBot = () => {
        const randomOnlineTime =
          Math.random() * (behavior.maxOnlineTime - behavior.minOnlineTime) +
          behavior.minOnlineTime;
        const randomOfflineTime =
          Math.random() * (behavior.maxOfflineTime - behavior.minOfflineTime) +
          behavior.minOfflineTime;

        console.log(
          `${botData.name} will go ONLINE in ${(
            randomOfflineTime / 60000
          ).toFixed(2)} minutes.`
        );
        setTimeout(() => {
          goOnline(botData);
          console.log(
            `${botData.name} will go OFFLINE in ${(
              randomOnlineTime / 60000
            ).toFixed(2)} minutes.`
          );
          setTimeout(() => {
            goOffline(botData);
            scheduleBot();
          }, randomOnlineTime);
        }, randomOfflineTime);
      };

      const goOnline = (bot) => {
        setBotsOnline((prevBots) => {
          if (!prevBots.includes(bot.name)) {
            return [...prevBots, bot.name];
          } else {
            return prevBots;
          }
        });
      };

      const goOffline = (bot) => {
        setBotsOnline((prevBots) =>
          prevBots.filter((name) => name !== bot.name)
        );
      };

      scheduleBot();
    });
  }, []);

  useEffect(() => {
    onBotsRendered(botsOnline.length);
  }, [botsOnline, onBotsRendered]);

  return (
    <>
      {botsOnline.map((botName) => (
        <Tooltip title="Click to open chat" arrow>
          <div>
            <Bot
              key={botName}
              botData={botsData[botName]}
              onBotClick={onBotClick}
            />
          </div>
        </Tooltip>
      ))}
    </>
  );
}

export default BotManager;
