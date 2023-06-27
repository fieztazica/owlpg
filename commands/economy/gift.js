const User = require('../../Classes/User.js')
module.exports = {
    name: 'gift',
    aliases: [],
    category: 'Economy',
    utilisation: '{prefix}gift [metion]',

    async execute(bot, message, args) {
      const prefix = await bot.getPrefix(message)
    
    const Player1 = new User(bot, message.author, message)
    let Profile1 = await Player1.getInfo()
    if (!Profile1) return message.lineReply(`**[ERROR]** You don't have a profile.\nCreate one by using \`${prefix}start\`.`)

    if (!args[0]) return message.lineReply(`**[ERROR]** Please mention someone.\nExample: \`${prefix}gift @Slimaeus 2021\``)
    
    const member = bot.getUserFromMention(args)
    
    if (!member) return message.lineReplyNoMention('**[ERROR]** Please mention someone.\nExample: \`${prefix}gift @Slimaeus 2021\`')
    
    if (args[0] !== `<@${member.id}>` && args[0] !== `<@!${member.id}>`) return message.lineReplyNoMention(`**[ERROR]** Wrong mention.\nExample: \`${prefix}gift @Slimaeus 2021\``);

    if (member.id === message.author.id) return message.lineReplyNoMention(`**[ERROR]** You can't send a gift to yourself?!?`)

    if (member.bot) return message.lineReply('**[ERROR]** You can\'t send a gift to bot.')

    // if (!args[1]) return message.lineReplyNoMention(`**[ERROR]** You need to provide amount of owlets.\nExample: \`${prefix}give @Slimaeus 2021\``)

    const Player2 = new User(bot, member, message) 
    let Profile2 = await Player2.getInfo()
    if (!Profile2) return message.lineReply(`**[ERROR]** **${member.tag} ** doesn't have profile.\nTell him/her create one by using \`${prefix}start\`.`)

    const checkCd = await Player1.checkCooldown('gift')
    if (!checkCd) await Player1.setCooldown('gift')
    else return
    const o = Math.floor(Math.random() * 99) + 1
    Player2.updateOwlet(Profile2, o)
    
    await Player2.updateUser(Profile2)

    return message.channel.send({
      embed: {
        color: "RANDOM",
        author: {name: message.author.tag, icon_url: message.author.displayAvatarURL()},
        thumbnail: {url: member.displayAvatarURL()},
        title: `Sending Success!`,
        description: `**${member.username}** is opening the gift. There ${o>1?'are':'is'} **${o.toLocaleString()} owlet${o>1?'s':''}**.\n**${o.toLocaleString()} owlet${o>1?'s':''}** ha${o>1?'ve':'s'} been given into **${member.username}**'s inventory.`,
      }
    })

    },
};