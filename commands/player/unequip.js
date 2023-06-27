const User = require('../../Classes/User.js')
const Items = require('../../Structures/Items.js')
const Search = require('../../Utils/Search.js')
module.exports = {
  name: 'unequip',
  aliases: ['uneq'],
  category: 'Player',
  utilisation: '{prefix}unequip [equipment type]',

  async execute(bot, message, args) {
    const Player = new User(bot, message.author, message)
    let Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)

    if (!Profile) return message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)

    
    if (!args[0]) return message.lineReply(`**[ERROR]** Missing equipment's type.\nExample: \`${prefix}unequip helmet\``)
    
    const typeNames = ['weapon', 'helmet', 'chestplate', 'leggings', 'boots']
    const typeName = args.join(' ').toLowerCase()
    if (!typeNames.includes(typeName)) return message.lineReply(`**[ERROR]** Wrong type's name.\nType's names : \`${typeNames.join('\`, \`').toUpperCase()}\``)

    const has = Profile.equipments[args.join(' ').toLowerCase()]

    if (!has) {
      return message.lineReply(`**[ERROR]** You did't equip that type of equipment yet!`)
    }

    // const equipmentName;
    // let Type
    // Object.keys(Items).forEach((type) => {
    //   if (Items[type].some((item) => item.name === has.name))
      
    //   Type = Object.keys(Profile.equipments).find((kind) => kind.toLowerCase() === type.toLowerCase())
    // })
    // console.log(Type)
    // if (Profile.equipments[has.type] !== null )
    //   if ( Profile.equipments[has.type].name === has.name) return message.lineReply(`**[ERROR]** You already equip that equipment.`)

    Player.unequip(Profile, typeName)

    await Player.updateUser(Profile)
    return message.lineReplyNoMention(`**[SUCCESS]** Successfully unequipped \`${has.name}\``)

  }
}