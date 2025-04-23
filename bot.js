
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const userId = process.env.USER_ID;
let isPaused = false;
let budget = 5;
let takeProfit = 2.0;
let stopLoss = 0.3;

bot.onText(/\/start/, (msg) => {
    if (msg.chat.id.toString() === userId) {
        bot.sendMessage(msg.chat.id, "Bienvenue sur ton bot memcoin_x2_bot !");
    }
});

bot.onText(/\/pause/, (msg) => {
    if (msg.chat.id.toString() === userId) {
        isPaused = true;
        bot.sendMessage(msg.chat.id, "Bot en pause.");
    }
});

bot.onText(/\/resume/, (msg) => {
    if (msg.chat.id.toString() === userId) {
        isPaused = false;
        bot.sendMessage(msg.chat.id, "Bot relancé.");
    }
});

bot.onText(/\/budget (\d+)/, (msg, match) => {
    if (msg.chat.id.toString() === userId) {
        budget = parseFloat(match[1]);
        bot.sendMessage(msg.chat.id, "Nouveau budget défini : " + budget + "€");
    }
});

bot.onText(/\/tp (\d+(\.\d+)?)/, (msg, match) => {
    if (msg.chat.id.toString() === userId) {
        takeProfit = parseFloat(match[1]);
        bot.sendMessage(msg.chat.id, "Nouveau TP : x" + takeProfit);
    }
});

bot.onText(/\/sl (\d+(\.\d+)?)/, (msg, match) => {
    if (msg.chat.id.toString() === userId) {
        stopLoss = parseFloat(match[1]);
        bot.sendMessage(msg.chat.id, "Nouveau SL : -" + (stopLoss * 100) + "%");
    }
});
