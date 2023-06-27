const express = require('express')
const Discord = require("discord.js")
const Topgg = require('@top-gg/sdk')
const Icons = require('./Structures/Icons.js')
const User = require('./Classes/User')
const webhook = new Topgg.Webhook(process.env.TOPGG_AUTH)
const server = express()

module.exports = (bot) => {
  server.all("/", (req, res) => {
    res.send(`Bot is running.<br>Default Prefix: ${process.env.PREFIX}<br>Bot ID: ${process.env.BOT_ID}`)
  })

  server.post('/dblwebhook', webhook.listener(async vote => {

    const user = await bot.users.fetch(vote.user)
    const Player = new User(bot, user)
    const Profile = await Player.getInfo()
    const Level = await Profile.level
    const o = 50 * Level

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle('Thanks for voting me, ' + user.tag + '!')

    if (!Profile) {
      embed
        .setDescription(`Because you haven't start your profile, you will not receive anything except my love ${Icons.hp}\n\nTry to start your profile in a server that have me or at [here](https://discord.link/owlvernyte)`)
        .setFooter('Start a profile before vote again to get reward!')
    }
    else {
      embed.setDescription(`You reward ${Icons.owlet}**${o}** owlets!`)
      Player.updateOwlet(Profile, o)
      await Player.updateUser(Profile)
    }

    user.send(embed)
  }))
  keepAlive()
}

var keepAlive = () => {
  server.listen(3000, () => {
    console.log('Server is ready.')
  })
}