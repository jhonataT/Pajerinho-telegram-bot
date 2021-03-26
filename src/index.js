require('dotenv').config(); // sorito_bot
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const PREFIX = '/';
  const chatId = msg.chat.id;

  if(msg.text.startsWith(PREFIX)){
    // Get command name and arguments:
    const [CMD_NAME, ...args] = msg.text
    .toLowerCase()
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

    // Commands:

    if(CMD_NAME === 'c'){
      const data = 'await FileData.formattingData()';
      console.log(data);
    }
  }
});