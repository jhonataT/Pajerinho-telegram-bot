// Pajerinho
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const AdmWarnings = require('./features/AdmWarnings');
const SaveGroupData = require('./features/init'); 

const token = process.env.TELEGRAM_BOT_TOKEN;
const admPassword = process.env.TELEGRAM_ADM_PASSWORD;

const PREFIX = '/';
const ADM_PREFIX = `${PREFIX}adm ${admPassword} `;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  msg.text = msg.text.toLowerCase();
  
  console.log(`\n${msg.from.first_name} says in ${msg.chat.type}: ${msg.text}\n`);

  console.log(msg);

  if(msg.chat.type === 'private'){
    const noticeGroup = msg.text.trim().substring(ADM_PREFIX.length).toUpperCase();

    if(msg.text.startsWith(ADM_PREFIX)){
      console.log("Notice Group Time");
      
      const newAdmComand = new AdmWarnings(true, noticeGroup, msg.from.first_name);
      const response = await newAdmComand.response();
      bot.sendMessage(chatId, response);
    } 
    else {
      console.log("INVALID COMMAND");

      const newAdmComand = new AdmWarnings(false, '', msg.from.first_name);

      const response = await newAdmComand.response();
      bot.sendMessage(chatId, response);
      bot.sendMessage(chatId, await newAdmComand.response());
    }
  }
  else if(msg.chat.type === 'group'){
    console.log('Group message\n');

    if(msg.text.toLocaleLowerCase().startsWith('/init')){
      const groupData = {
        id: msg.chat.id,
        name: msg.chat.title
      }
      const initGroup = new SaveGroupData(groupData);
    }
  }
});