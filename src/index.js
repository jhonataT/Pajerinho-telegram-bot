require('dotenv').config(); // sorito_bot
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;
const admPassword = process.env.TELEGRAM_ADM_PASSWORD;
const PREFIX = '/';
const ADM_PREFIX = `adm ${admPassword} `;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  msg.text.toLowerCase();

  if(msg.text.startsWith(PREFIX)){
    // Get command name and arguments:
    const [CMD_NAME, ...args] = msg.text
    .toLowerCase()
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

    if(CMD_NAME === 'adm'){
      console.log("msg");
      // msg.from -> userInfo | msg.chat -> chatInfo
    }
  } else {
    // Add new adm:
    if(msg.chat.type === 'private' && msg.text.startsWith(ADM_PREFIX)){
      console.log("Notice Group Time");
      const noticeGroup = msg.text.trim().substring(ADM_PREFIX.length);
      bot.sendMessage(chatId, noticeGroup);
    } 
    else {
      console.log("INVALID COMMAND");
      bot.sendMessage(chatId, noticeGroup);
    }

  }


});