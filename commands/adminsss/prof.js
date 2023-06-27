const User = require('../../Classes/User.js')

module.exports = {
  name: 'prof',
  aliases: ['pr'],
  async execute (bot, message, args) {
    
    if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208')) return;

    // if (isNaN(args[0])) return;
    let memberid = String(args[0])
    let member = await bot.users.fetch(memberid)
    const thisUser = new User(bot, member, message)
    const playerProfile = await thisUser.getInfo()
    const prefix = await bot.getPrefix(message)

    if (!message.author.equals(member) && thisUser.checkProfile(playerProfile, prefix, true)) return 
    if (thisUser.checkProfile(playerProfile, prefix)) return;
    
    thisUser.sendInfo(playerProfile)
  }
}