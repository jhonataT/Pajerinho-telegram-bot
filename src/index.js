// Pajerinho
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const AdmWarnings = require('./features/AdmWarnings');
const SaveGroupData = require('./features/init'); 
const SendNoticeInGroup = require('./features/SendNoticeInGroup');
const GetRandomJoke = require('./features/SendJoke');
const GetRandomHistory = require('./features/SendHistory');
const Help = require('./features/Help');

const token = process.env.TELEGRAM_BOT_TOKEN;
const admPassword = process.env.TELEGRAM_ADM_PASSWORD;

const PREFIX = '/';
const ADM_PREFIX = `${PREFIX}adm ${admPassword} `;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // if contents is a media
  if(msg.text === undefined) return; 

  msg.text = msg.text.toLowerCase();
  
  console.log(`\n${msg.from.first_name} says in ${msg.chat.type}: ${msg.text}\n`);


  if(msg.chat.type === 'private'){
    const noticeGroup = msg.text.trim().substring(ADM_PREFIX.length).toUpperCase();

    if(msg.text.startsWith(ADM_PREFIX)){
      console.log("Notice Group Time");
      
      const newAdmComand = new AdmWarnings(true, noticeGroup, msg.from.first_name);
      const response = await newAdmComand.response();
      bot.sendMessage(chatId, response);

      const formatedNotice = await SendNoticeInGroup.getNotice(bot);
    } 
    else if(msg.text.toLowerCase().startsWith('/start')) {
      bot.sendMessage(chatId, "Iniciando o meu trabalho!");
    }
    else if(msg.text.toLowerCase().startsWith('/help')) {
      const helpText = await Help();
      bot.sendMessage(chatId, helpText);
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
      const groupData = { id: msg.chat.id, name: msg.chat.title };

      const initGroup = new SaveGroupData(groupData);
      const initReturn = await initGroup.register();
      bot.sendMessage(chatId, initReturn);
    } 
    else if(msg.text.toLowerCase().startsWith('/help')) {
      const helpText = await Help();
      bot.sendMessage(chatId, helpText);
    }
    else if(msg.text.toLocaleLowerCase().indexOf("pajerinho") != -1 && msg.text.toLocaleLowerCase().indexOf("piada") != -1){
      const randomJoke = await GetRandomJoke();
      bot.sendMessage(chatId, randomJoke);
    }
    else if(msg.text.toLocaleLowerCase().indexOf("pajerinho") != -1 && msg.text.toLocaleLowerCase().indexOf("historia") != -1){
      const randomHistory = await GetRandomHistory();
      bot.sendMessage(chatId, randomHistory);
    }
    else if(msg.text.toLocaleLowerCase().indexOf("pajerinho") != -1 && msg.text.toLocaleLowerCase().indexOf("historias") != -1){
      const randomHistory = await GetRandomHistory();
      bot.sendMessage(chatId, randomHistory);
    }
    else if(msg.text.toLocaleLowerCase().indexOf("pajerinho") != -1 && msg.text.toLocaleLowerCase().indexOf("história") != -1){
      const randomHistory = await GetRandomHistory();
      bot.sendMessage(chatId, randomHistory);
    }
    else if(msg.text.toLocaleLowerCase().indexOf("pajerinho") != -1 && msg.text.toLocaleLowerCase().indexOf("histórias") != -1){
      const randomHistory = await GetRandomHistory();
      bot.sendMessage(chatId, randomHistory);
    }
  }
});