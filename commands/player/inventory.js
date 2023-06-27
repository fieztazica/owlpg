const User = require('../../Classes/User.js')

module.exports = {
  name: 'inventory',
  aliases: ['i','inv','backpack','bp'],
  category: 'Player',
  utilisation: '{prefix}inventory',
  async execute (bot, message, args) {
    //https://discordjs.guide/sequelize/currency.html#file-overview
    const member = bot.getUserFromMention(args) || message.author
    const thisUser = new User(bot, member, message)
    const playerProfile = await thisUser.getInfo()
    const prefix = await bot.getPrefix(message)

    if (!message.author.equals(member) && !playerProfile) return message.lineReply({
      embed: {
        color: "RED",
        title: 'ERROR',
        author: { name: `${member.tag}`, icon_url: `${member.displayAvatarURL()}`},
        description: `${bot.config.emojis.fail[Math.floor(Math.random()*bot.config.emojis.fail.length)]} | This player doesn't have profile.`
      }
    })
    
    if (playerProfile) 
      thisUser.sendInv(playerProfile)
    else {
        message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)
    }
  }
}