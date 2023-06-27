const User = require('../../Classes/User.js')
const Search = require('../../Utils/Search.js')
const Icons = require('../../Structures/Icons.js')
module.exports = {
    name: 'buy',
    aliases: [],
    category: 'Economy',
    utilisation: '{prefix}buy [stuff]',

    async execute(bot, message, args) {
      const prefix = await bot.getPrefix(message)
    
      const Player = new User(bot, message.author, message)
      let Profile = await Player.getInfo()
      if (!Profile) return message.lineReply(`**[ERROR]** You don't have a profile.\nCreate one by using \`${prefix}start\`.`)

      if (!args[0]) return message.lineReply(`**[ERROR]** Please provide an item name.\nExample: \`${prefix}buy wooden sword\` or \`${prefix}buy health potion 10\``)
      
      const itemName = args.filter((ele) => isNaN(ele)).join(' ')
      
      const item = Search.items({name : itemName})
      if (!item) return message.lineReply(`**[ERROR]** Can not found this item`)

      let amount = Number(args.find((ele) => !isNaN(ele))) || 1

      // if () return message.lineReply(`**[ERROR]** Sorry, it's an equipment. You can only buy one.`)
      if (Profile.equipments[item.type])
        if (!item.amount && Profile.equipments[item.type].name === item.name)
        return message.lineReply(`**[ERROR]** You already have \`${item.name}\`!`)
      if (!item.amount && Profile.backpack.items.some((bpItem) => bpItem.name === item.name)) return message.lineReply(`**[ERROR]** You already have \`${item.name}\`!`)
      
      let payOwlet = item.cost

      if (item.amount && amount !== 1) {
        payOwlet = item.cost * Number(amount)
      } else {amount = 1}
      if (Profile.owlet < payOwlet) return message.lineReply(`**[ERROR]** You don't have enough owlets!`)
      Player.updateItems(Profile, item, amount)
      Player.updateOwlet(Profile, -payOwlet)
      await Player.updateUser(Profile)
      return message.lineReply(`**[SUCCESS]** Successfully bought \`${item.name}\`${amount === 1 ? '' : ' **x' + Number(amount).toLocaleString() + '**'} for ${Icons.owlet}**${payOwlet.toLocaleString()}**!`)

    },
};