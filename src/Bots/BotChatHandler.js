import BotBehavior from "./BotsBehavior";
import { botsData } from "./BotsData";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class BotChatHandler {
  constructor(userName) {
    this.userName = userName;
    this.currentQuotesIndices = {};
    this.shuffledQuotes = {};
  }

  greetUser() {
    return `Hello ${this.userName}!`;
  }

  getReplyFromBot(message, botName) {
    const botData = botsData[botName];
    if (!botData) {
      return "Sorry, I don't recognize that bot!";
    }

    if (BotBehavior.isBotOnline(botName)) {
      if (!this.shuffledQuotes[botName]) {
        this.shuffledQuotes[botName] = shuffleArray([...botData.quotes]);
        this.currentQuotesIndices[botName] = 0;
      }

      const currentIdx = this.currentQuotesIndices[botName];

      if (currentIdx >= this.shuffledQuotes[botName].length - 1) {
        this.shuffledQuotes[botName] = shuffleArray([...botData.quotes]);
        this.currentQuotesIndices[botName] = 0;
      } else {
        this.currentQuotesIndices[botName] = currentIdx + 1;
      }

      return this.shuffledQuotes[botName][this.currentQuotesIndices[botName]];
    } else {
      return `Sorry, ${botName} is currently offline.`;
    }
  }
}

export default BotChatHandler;
