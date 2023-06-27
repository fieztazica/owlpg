const User = require('../../Classes/User.js')
const Shop = require('../../Structures/Shop.js')
module.exports = {
    name: 'shop',
    aliases: [],
    category: 'Economy',
    utilisation: '{prefix}shop',

    async execute(bot, message, args) {
      const member = message.author
      const Player = new User(bot, member, message)
      const Profile = await Player.getInfo()
      const prefix = await bot.getPrefix(message)
      
      if (Player.checkProfile(Profile, prefix, false)) return;

      Shop.sendShop(message, prefix)
    },
};