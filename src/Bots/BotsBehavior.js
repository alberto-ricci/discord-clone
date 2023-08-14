import michaelData from "./json/michael.json";
import jimData from "./json/jim.json";
import dwightData from "./json/dwight.json";
import pamData from "./json/pam.json";
import stanleyData from "./json/stanley.json";
import andyData from "./json/andy.json";
import janData from "./json/jan.json";
import tobyData from "./json/toby.json";
import darrylData from "./json/darryl.json";
import hollyData from "./json/holly.json";
import erinData from "./json/erin.json";
import gabeData from "./json/gabe.json";
import davidData from "./json/david.json";
import joData from "./json/jo.json";
import angelaData from "./json/angela.json";
import creedData from "./json/creed.json";
import kellyData from "./json/kelly.json";
import kevinData from "./json/kevin.json";
import oscarData from "./json/oscar.json";
import phyllisData from "./json/phyllis.json";
import ryanData from "./json/ryan.json";

export const botsBehavior = {
  "Michael Scott": {
    ...michaelData,
    behavior: {
      minOnlineTime: 12 * 60000,
      maxOnlineTime: 25 * 60000,
      minOfflineTime: 3 * 60000,
      maxOfflineTime: 7 * 60000,
    },
  },
  "Jim Halpert": {
    ...jimData,
    behavior: {
      minOnlineTime: 8 * 60000,
      maxOnlineTime: 18 * 60000,
      minOfflineTime: 3 * 60000,
      maxOfflineTime: 8 * 60000,
    },
  },
  "Dwight Schrute": {
    ...dwightData,
    behavior: {
      minOnlineTime: 5 * 60000,
      maxOnlineTime: 20 * 60000,
      minOfflineTime: 4 * 60000,
      maxOfflineTime: 15 * 60000,
    },
  },
  "Pam Beesly": {
    ...pamData,
    behavior: {
      minOnlineTime: 5 * 60000,
      maxOnlineTime: 15 * 60000,
      minOfflineTime: 7 * 60000,
      maxOfflineTime: 25 * 60000,
    },
  },
  "Stanley Hudson": {
    ...stanleyData,
    behavior: {
      minOnlineTime: 10 * 60000,
      maxOnlineTime: 20 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 15 * 60000,
    },
  },
  "Andy Bernard": {
    ...andyData,
    behavior: {
      minOnlineTime: 6 * 60000,
      maxOnlineTime: 15 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 12 * 60000,
    },
  },
  "Jan Levinson": {
    ...janData,
    behavior: {
      minOnlineTime: 11 * 60000,
      maxOnlineTime: 24 * 60000,
      minOfflineTime: 4 * 60000,
      maxOfflineTime: 9 * 60000,
    },
  },
  "Toby Flenderson": {
    ...tobyData,
    behavior: {
      minOnlineTime: 10 * 60000,
      maxOnlineTime: 20 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 10 * 60000,
    },
  },
  "Darryl Philbin": {
    ...darrylData,
    behavior: {
      minOnlineTime: 9 * 60000,
      maxOnlineTime: 19 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 11 * 60000,
    },
  },
  "Holly Flax": {
    ...hollyData,
    behavior: {
      minOnlineTime: 8 * 60000,
      maxOnlineTime: 17 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 13 * 60000,
    },
  },
  "Erin Hannon": {
    ...erinData,
    behavior: {
      minOnlineTime: 7 * 60000,
      maxOnlineTime: 15 * 60000,
      minOfflineTime: 7 * 60000,
      maxOfflineTime: 12 * 60000,
    },
  },
  "Gabe Lewis": {
    ...gabeData,
    behavior: {
      minOnlineTime: 6 * 60000,
      maxOnlineTime: 14 * 60000,
      minOfflineTime: 8 * 60000,
      maxOfflineTime: 14 * 60000,
    },
  },
  "David Wallace": {
    ...davidData,
    behavior: {
      minOnlineTime: 8 * 60000,
      maxOnlineTime: 16 * 60000,
      minOfflineTime: 7 * 60000,
      maxOfflineTime: 12 * 60000,
    },
  },
  "Jo Bennett": {
    ...joData,
    behavior: {
      minOnlineTime: 9 * 60000,
      maxOnlineTime: 18 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 11 * 60000,
    },
  },
  "Angela Martin": {
    ...angelaData,
    behavior: {
      minOnlineTime: 10 * 60000,
      maxOnlineTime: 20 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 10 * 60000,
    },
  },
  "Creed Bratton": {
    ...creedData,
    behavior: {
      minOnlineTime: 7 * 60000,
      maxOnlineTime: 16 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 13 * 60000,
    },
  },
  "Kelly Kapoor": {
    ...kellyData,
    behavior: {
      minOnlineTime: 8 * 60000,
      maxOnlineTime: 15 * 60000,
      minOfflineTime: 7 * 60000,
      maxOfflineTime: 14 * 60000,
    },
  },
  "Kevin Malone": {
    ...kevinData,
    behavior: {
      minOnlineTime: 6 * 60000,
      maxOnlineTime: 14 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 14 * 60000,
    },
  },
  "Oscar Martinez": {
    ...oscarData,
    behavior: {
      minOnlineTime: 7 * 60000,
      maxOnlineTime: 16 * 60000,
      minOfflineTime: 5 * 60000,
      maxOfflineTime: 13 * 60000,
    },
  },
  "Phyllis Vance": {
    ...phyllisData,
    behavior: {
      minOnlineTime: 7 * 60000,
      maxOnlineTime: 16 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 13 * 60000,
    },
  },
  "Ryan Howard": {
    ...ryanData,
    behavior: {
      minOnlineTime: 6 * 60000,
      maxOnlineTime: 15 * 60000,
      minOfflineTime: 6 * 60000,
      maxOfflineTime: 12 * 60000,
    },
  },
};

class BotBehavior {
  constructor() {
    this.botStates = {};

    for (let botName in botsBehavior) {
      this.botStates[botName] = {
        isOnline: true, // Assuming every bot starts online
        remainingTime: this.getRandomTime(
          botsBehavior[botName].behavior.minOnlineTime,
          botsBehavior[botName].behavior.maxOnlineTime
        ),
      };
    }
  }

  getRandomTime(minTime, maxTime) {
    return Math.random() * (maxTime - minTime) + minTime;
  }

  isBotOnline(botName) {
    const botState = this.botStates[botName];
    if (!botState) {
      return false;
    }

    // Decrease remaining time
    botState.remainingTime -= 1000; // Assuming this method is called every second

    // If time's up for current state, toggle the state and reset time
    if (botState.remainingTime <= 0) {
      if (botState.isOnline) {
        botState.remainingTime = this.getRandomTime(
          botsBehavior[botName].behavior.minOfflineTime,
          botsBehavior[botName].behavior.maxOfflineTime
        );
      } else {
        botState.remainingTime = this.getRandomTime(
          botsBehavior[botName].behavior.minOnlineTime,
          botsBehavior[botName].behavior.maxOnlineTime
        );
      }
      botState.isOnline = !botState.isOnline;
    }

    return botState.isOnline;
  }
}

const botBehaviorInstance = new BotBehavior();

export default botBehaviorInstance;
