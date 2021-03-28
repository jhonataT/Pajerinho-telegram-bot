// Pajerinho
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const AdmWarnings = require('./features/AdmWarnings');

const token = process.env.TELEGRAM_BOT_TOKEN;
const admPassword = process.env.TELEGRAM_ADM_PASSWORD;

const PREFIX = '/';
const ADM_PREFIX = `adm ${admPassword} `;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  msg.text.toLowerCase();

  if(msg.chat.type === 'private'){
    const noticeGroup = msg.text.trim().substring(ADM_PREFIX.length);

    if(msg.text.startsWith(ADM_PREFIX)){
      console.log("Notice Group Time");
      
      const newAdmComand = new AdmWarnings(true, noticeGroup, msg.from.first_name);
    
      bot.sendMessage(chatId, await newAdmComand.response());
    } 
    else {
      console.log("INVALID COMMAND");

      const newAdmComand = new AdmWarnings(false, 0, msg.from.first_name);

      bot.sendMessage(chatId, await newAdmComand.response());
    }
  }
});