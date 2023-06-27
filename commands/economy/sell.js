const User = require('../../Classes/User.js')
const Icons = require('../../Structures/Icons.js')
const Format = require('../../Structures/Format.js')
module.exports = {
  name: 'sell',
  aliases: [],
  category: 'Economy',
  utilisation: '{prefix}sell [stuff]',

  async execute(bot, message, args) {
    const Player = new User(bot, message.author, message)
    const Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)

    if (Player.checkProfile(Profile, prefix)) return;

    if (!args[0]) return message.lineReply(`**[ERROR]** What are you trying to sell?\nExample: \`${prefix}sell sword\``)
    // Make sure that it's in your inventory or you will not be able to sell.
    const shortcut = ['all', 'half', 'max', 'quarter']
    const postfix = ['k', 'm', 'b', 't']
    let amount 
    if (shortcut.includes(args[args.length - 1].toLowerCase()) || postfix.includes(args[args.length - 1][args[args.length - 1].length - 1].toLowerCase())) {amount = args[args.length - 1]  
    args = args.splice(0, args.length - 1)}
    const itemName = args.filter((ele) => isNaN(ele)).join(' ')
    // console.log(itemName)
    //wooden log all 123
    
    const item = Profile.backpack.items.find((i) => itemName.toLowerCase() === i.name.toLowerCase())
    // console.log(item)
    if (!item) return message.lineReply(`**[ERROR]** That item is not in your inventory. Make sure it's in your inventory or you will not be able to sell.\nExample: \`${prefix}sell sword\``)

    if (!amount) amount = Number(args.filter((ele) => !isNaN(ele))) || 1
    amount = Format.number(amount, item.amount)
    if (!item.amount && amount) {amount = 1}
    

    if (item.amount < amount) return message.lineReply(`**[ERROR]** Your input amount is bigger than the items amount in your inventory. Check it again with \`${prefix}backpack\`.\nExample for selling things: \`${prefix}sell sword\` for equipments or \`${prefix}sell wooden log 25\` for consumables and materials.`)
    
    const p = (Math.random() * 100) + 25 
    const owlet = Math.round(item.cost*amount*(p/100))
    Player.updateItems(Profile, item, amount, false)
    Player.updateOwlet(Profile, owlet)
    await Player.updateUser(Profile)
    
    return message.lineReply(`**[SUCCESS]** Successfully sold \`${item.name}\`${amount === 1 ? '' : ' **x' + Number(amount).toLocaleString() + '**'} for ${Icons.owlet}**${owlet.toLocaleString()}**!`)
  }
}