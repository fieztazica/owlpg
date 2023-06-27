const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'giftcode',
  aliases: ['gc'],
  category: '',
  utilisation: '',
  async execute (bot, message, args) {

    // if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208')) return;

    const prefix = await bot.getPrefix(message)
    const codes = bot.mongo.collection("codes")

    if (!args[0]) return message.lineReply(`**[ERROR]** Please enter the code.\nExample: \`${prefix}redeem CODE\``)
    
    const codeName = String(args[0].toLowerCase())

    const code = await codes.findOne({name: codeName})

    if (!code) return message.lineReply("**[ERROR]** Wrong giftcode!");

    const embed = new MessageEmbed()
    .setTitle(code.name)
    .setColor("RANDOM")
    .setDescription(`**Prize**: ${code.owlet} owlet${code.quote ? `\n**Quote**: ${code.quote}` : ''}`)
    .setFooter("Remaining: " + code.remain)

    return message.lineReply(embed)
  }
} 