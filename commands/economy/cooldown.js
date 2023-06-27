const User = require('../../Classes/User.js')
module.exports = {
  name: 'cooldown',
  aliases: ['cd'],
  category: 'Economy',
  utilisation: '{prefix}cooldown',
  async execute (bot, message, args) {
    
    const member = bot.getUserFromMention(args) || message.author
    const prefix = await bot.getPrefix(message)
    const Player = new User(bot, member, message)
    const Profile = await Player.getInfo()
    if (!Profile) return message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)
    
    Player.sendCooldown(prefix)
    //10 000 000 000 000 000 000
  }
}