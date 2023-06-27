bconst Discord = require('discord.js')
const config = require('../config/bot.js')
module.exports = async (bot) => {
  
  console.log(`Logged in as ${bot.user.username}. Ready on ${bot.guilds.cache.size} servers, for a total of ${bot.users.cache.size} users`);

  bot.user.setActivity(config.discord.activity.stt, { type: config.discord.activity.type })

  // const actvs = config.discord.activity.name(bot);
  // let i = 0;

  // setInterval(() => {
  //   if (i === actvs.length) i = 0;
  //   const stt = actvs[i];
  //   bot.user.setActivity(stt, { type: config.discord.activity.type }).catch(console.error)
  //   i++;
  // }, 300000);

};