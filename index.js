//https://discord.com/api/oauth2/authorize?client_id=751439015739392050&permissions=8&scope=bot

const Discord = require("discord.js") 
const keepAlive = require('./server')
const fs = require('fs')

const structures = fs
.readdirSync('./Structures')
.filter(file => file.endsWith('.js'));
for (const file of structures) {
  require(`./Structures/${file}`);
  console.log(file)
}

const bot = new Discord.Client({
  disableMentions : "everyone",
  shard : "auto",
  restTimeOffset : 0,
})
require('discord-buttons')(bot)
require('discord-menu-embed')(bot)
require('./botFunc.js')(bot)
bot.config = require('./config/bot');
bot.commands = new Discord.Collection()




fs.readdirSync('./commands')
.forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`)
  .filter(files => files.endsWith('.js'));
  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    
    bot.commands.set(command.name.toLowerCase(), command);
    console.log(file)
  }
});

const events = fs.readdirSync('./events')
.filter(file => file.endsWith('.js'));
for (const file of events) {
  const event = require(`./events/${file}`);
  bot.on(file.split(".")[0], event.bind(null, bot));
  console.log(file)
}


keepAlive()
bot.login(process.env.TOKEN)
