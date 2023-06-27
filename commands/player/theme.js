const User = require('../../Classes/User')
module.exports = {
    name: 'theme',
    aliases: [],
    category: 'Player',
    utilisation: '{prefix}theme',

    async execute(bot, message, args) {

      const prefix = await bot.getPrefix(message)
      const Player = new User(bot, message.author, message)
      Profile = await Player.getInfo()
      Player.checkProfile(Profile,prefix)
      Profile.cus.theme.reverse()
      Player.updateUser(Profile)
      message.lineReply('Theme successfully changed!')
      
    },
};