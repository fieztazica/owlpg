const User = require('../../Classes/User.js')
const Items = require('../../Structures/Items.js')
const Search = require('../../Utils/Search.js')
module.exports = {
  name: 'equip',
  aliases: ['eq'],
  category: 'Player',
  utilisation: '{prefix}equip',

  async execute(bot, message, args) {
    const Player = new User(bot, message.author, message)
    let Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)

    if (!Profile) return message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)

    if (!args[0]) return message.lineReply(`**[ERROR]** Missing equipment's name.\nExample: \`${prefix}equip dagger\``)

    const has = Profile.backpack.items.find((item) => item.name.toLowerCase() === args.join(' ').toLowerCase())

    if (!has) return message.lineReply(`**[ERROR]** You don't have that equipment in your inventory. Buy one by using \`${prefix}shop\``)

    if (!Profile.equipments[has.type] && Profile.equipments[has.type] !== null) return message.lineReply(`**[ERROR]** This item can not equip`)
    if (Profile.equipments[has.type] !== null)
      if ( Profile.equipments[has.type].name === has.name) return message.lineReply(`**[ERROR]** You already equip that equipment.`)
    
    Player.equip(Profile, has)

    await Player.updateUser(Profile)
    return message.lineReplyNoMention(`**[SUCCESS]** Successfully equipped \`${has.name}\``)

  }
}