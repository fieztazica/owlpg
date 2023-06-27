//https://discord.com/api/oauth2/authorize?client_id=874183713020330015&permissions=8&scope=bot

const Discord = require("discord.js") 
//https://www.npmjs.com/package/discord-slash-commands
const fs = require('fs')
const Database = require("@replit/database")
const Topgg = require("@top-gg/sdk")
// const disbut = require('discord-buttons')
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGO_CONNECT);
client.connect().then(() => console.log("Mongo Connected!"))

//https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
//https://topgg.js.org/classes/api.html
require('discord-reply')
const keepAlive = require('./server')
const bot = new Discord.Client({
  disableMentions : "everyone",
  shard : "auto",
  restTimeOffset : 0,
  })
// disbut(bot);
require('discord-buttons')(bot)
require('discord-menu-embed')(bot)

// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');


//bot.capitalize = (s) => s[0].toUpperCase() + s.slice(1);

bot.mongo = client.db('owlvernyte');
bot.config = require('./config/bot');
bot.commands = new Discord.Collection()
bot.interactions = new Discord.Collection()
bot.db = new Database()

bot.number = (args, maxValue)=> {
  
  if (args === 'all') {
    return Number(maxValue)
  }
  if (args === 'half') {
    return Math.floor(Number(maxValue)/2)
  }
  if (args === 'max') {
    return Math.floor(maxValue)
  } 
  if (args === 'quarter') {
    return Math.floor(Number(maxValue)/4)
  }
  
  const postfixes = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
  }
  const argsPostfix = args.slice(-1)
  
  if (postfixes[argsPostfix])
    return Number(args.slice(0, args.length - 1)) * postfixes[argPostfix]
    
  return Number(args);
}

bot.getPrefix = async (message) => {
  if (!message) return
  const guildId = message.guild.id

  const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX || `<@${bot.user.id}>` || `<@!${bot.user.id}>`

  return prefix
}

bot.addCommand = (guildId, command) => {
  if (guildId)
    return bot.api.applications(bot.user.id).guilds(guildId).commands.post(command);
  return bot.api.applications(bot.user.id).commands.post(command);
}

bot.deleteCommand = (guildId, commandId) => {
  if (guildId)
    return bot.api.applications(bot.user.id).guilds(guildId).commands(commandId).delete();
  return bot.api.applications(bot.user.id).commands(commandId).delete();
}

bot.getCommand = async (guildId) => {
  if (!guildId)
    return await bot.api.applications(bot.user.id).commands.get()
  return await bot.api.applications(bot.user.id).guilds(guildId).commands.get()
}

bot.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

bot.getUserFromMention = (args) => {
  var mention, id, matches;
  args.forEach((element, index) => {
    if (index > 0 && id) return
    matches = element.match(/^<@!?(\d+)>$/);
	  if (!matches) return;
	  return id = matches[1];
  })
	if (!id) return
	return bot.users.cache.get(id);
}


//====
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        bot.commands.set(command.name.toLowerCase(), command);
    }
});
//====
//===
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    bot.on(file.split(".")[0], event.bind(null, bot));
}

// bot.on("message", (msg) => {
//   require('./Structures/backup.js')(bot,msg)
// })

keepAlive(bot)
bot.login(process.env.TOKEN)
