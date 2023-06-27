const Discord = require('discord.js')
const User = require('../../Classes/User.js')
module.exports = {
    name: 'title',
    aliases: [],
    category: 'Player',
    utilisation: '{prefix}title',

    async execute(bot, message, args) {
      
      const prefix = await bot.getPrefix(message)
      const Player = new User(bot, message.author, message)
      Profile = await Player.getInfo()
      if (Player.checkProfile(Profile, prefix)) return;

      let titles = Profile.backpack.items.filter((item) => item.type === 'title').sort((item1, item2) => item1.name.localeCompare(item2.name))

      if (!args[0]) {
        
        let Item = titles.sort((item1, item2) => item1.type.localeCompare(item2.type)).map((item) => {
          return `\`` + item.name + `\``
        }).join(', ') || 'None'

        const embed = new Discord.MessageEmbed()
        .setColor(Profile.cus.color.name)
        .setTitle(message.author.tag + `\'s title${titles.length > 1 ? 's' : ''}`)
        .setDescription(Item)
        .setFooter(`In use: ${Profile.cus.title.name}`)

        return message.lineReply(embed)
      }
      
      const has = titles.find((item) => item.name.toLowerCase() === args.join(' ').toLowerCase())

      if (!has) return message.lineReply(`**[ERROR]** That title is not in your inventory. Buy one by using \`${prefix}shop\``)

      if (Profile.cus.title[has.name] !== null)
        if ( Profile.cus.title[has.name] === has.name) return message.lineReply(`**[ERROR]** You already equip that title.`)

      Player.title(Profile, has)
      await Player.updateUser(Profile)
      return message.lineReply(`**[SUCCESS]** Successfully changed title. \`${prefix}profile\` to see.`)
    },
};