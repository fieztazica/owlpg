// const cron = require("cron")
const User = require('../Classes/User.js')
const CAPTCHA = require('../Structures/Captcha.js')
const Icons = require('../Structures/Icons')
// const Discord = require('discord.js')
const doing = new Set()
module.exports = async (bot, message) => {

  if (message.author.bot || message.channel.type === 'dm') return;
  
  const guildId = message.guild.id

  const mentionPrefix = message.content.match(new RegExp(`^<@!?${bot.user.id}>`));

  const mentionUser = bot.getUserFromMention([message.content])
  if (mentionUser)
    if (mentionUser.id === `${bot.user.id}`) return message.lineReplyNoMention({
      embed: {
        color: "RANDOM",
        author: { name: `${message.guild.name}'s settings` },
        description: `[Invibe me!](https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot) | [Support Server](https://discord.link/owlvernyte) | [Vote me](https://top.gg/bot/853623967180259369)`,
        fields: [
          {
            name: `Prefix`,
            value: `${await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX}`,
            inline: true,
          },
          {
            name: `Server ID`,
            value: `${guildId}`,
            inline: true,
          },
          {
            name: `Region`,
            value: `${message.guild.region}`,
            inline: true,
          },
        ],
        footer: { text: `j2c.cc/owlvernyte-bot` },

      }
    })

  const prefix = mentionPrefix ? `${mentionPrefix[0]}` : await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX

  if (message.content.indexOf(prefix) !== 0) return;

  if (doing.has(message.author.id)) return message.lineReply("**[ERROR]** You need to finish the previous command.")

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));


  if (cmd)
    try {
      let player;
      let profile;
      if (cmd.maintain) {
        return message.lineReply(`**[MAINTAIN]** Sorry but this command is being maintained. Please try it later.`)
      }
      
      if (cmd.profile) {
        player = new User(bot, message.author, message)
        profile = await player.getInfo()
        if (!profile) return message.lineReply(`**[ERROR]** You don't have profile. Please use {prefix}start to create a profile.`)
      }
      if (cmd.captcha) {

        const cooldown = bot.mongo.collection('cooldown')
        const jailed = await cooldown.findOne({
          userID: message.author.id,
          name: 'Jail'
        })
        if (jailed) {
          const jailCooldown = 300 * 1000
          const time = Date.now() - jailed.time
          const remain = jailCooldown - time
          const cd = new Date(remain)
          if (remain > 0) return message.lineReply(`**[JAIL]** You must wait **${cd.getHours() ? cd.getHours() + "h " : ""}${cd.getMinutes() ? cd.getMinutes() + "m " : ""}${cd.getSeconds() ? cd.getSeconds() + "s" : "Ready"}${cd < 1000 && cd > 0 ? "< 1s" : ""}** to continue.`);
          else await cooldown.deleteMany({ userID: message.author.id})
        }
          
          let c = Math.random() * 100;
          if (c<1) {
            doing.add(message.author.id, true)
            const CAPTCHECK = await CAPTCHA(bot, message)
            if (CAPTCHECK == 0)
            {
              await cooldown.insertOne({
                userID: message.author.id,
                name: 'Jail',
                time: Date.now()
              }) 
              doing.delete(message.author.id)
              return message.lineReply("**[JAIL]** Sorry but you're ROBOT :<");
            }
                
            else if (CAPTCHECK == -1) {
              await cooldown.insertOne({
                userID: message.author.id,
                name: 'Jail',
                time: Date.now()
              })
              doing.delete(message.author.id)
              return message.lineReply("**[JAIL]** CAPTCHA TIMEOUT.")
            }
                
            else if (CAPTCHECK == 1) 
            {
              let o = Math.ceil((Math.random() * 100) + (Math.random() * profile.level))
              player.updateOwlet(profile, o)
              await player.updateUser(profile)
              doing.delete(message.author.id)
              message.lineReply("**[PASSED]** You're free to go and claimed " + Icons.owlet + "**"+ o + "**")
            }
          }
      }
      

      cmd.execute(bot, message, args)
    }
    catch (error) {
      console.log(error)
    }

};
