const Discord = require('discord.js')
const User = require('../../Classes/User.js')
module.exports = {
    name: 'color',
    aliases: ['colỏ'],
    category: 'Player',
    utilisation: '{prefix}color',

    async execute(bot, message, args) {
      
      const prefix = await bot.getPrefix(message)
      const Player = new User(bot, message.author, message)
      Profile = await Player.getInfo()
      if (Player.checkProfile(Profile, prefix)) return;
      let colors = Profile.backpack.items.filter((item) => item.type === 'color').sort((item1, item2) => item1.name.localeCompare(item2.name))
      
      if (!args[0]) {
        
        let Item = colors.sort((item1, item2) => item1.type.localeCompare(item2.type)).map((item) => {
          return `\`` + item.name + `\``
        }).join(', ') || 'None'

        const embed = new Discord.MessageEmbed()
        .setColor(Profile.cus.color.name)
        .setTitle(message.author.tag + `\'s color${colors.length > 1 ? 's' : ''}`)
        .setDescription(Item)
        .setFooter(`In use: ${Profile.cus.color.name}`)

        return message.lineReply(embed)
      }
      
      const has = colors.find((item) => item.name.toLowerCase() === args.join(' ').toLowerCase())

      if (!has) return message.lineReply(`**[ERROR]** That color is not in your inventory. Buy one by using \`${prefix}shop\``)

      if (Profile.cus.color[has.name] !== null)
        if ( Profile.cus.color[has.name] === has.name) return message.lineReply(`**[ERROR]** You already equip that color.`)

      Player.color(Profile, has)
      await Player.updateUser(Profile)
      return message.lineReply(`**[SUCCESS]** Successfully changed color. \`${prefix}profile\` to see.`)
    },
};