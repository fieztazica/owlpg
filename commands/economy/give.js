const User = require('../../Classes/User.js')
module.exports = {
  name: 'give',
  aliases: [],
  category: 'Economy',
  utilisation: '{prefix}give [mention] [amount]',
  
  async execute (bot, message, args) {
    const prefix = await bot.getPrefix(message)
    
    const Player1 = new User(bot, message.author, message)
    let p1Profile = await Player1.getInfo()
    if (!p1Profile) return message.lineReply(`**[ERROR]** You don't have a profile.\nCreate one by using \`${prefix}start\`.`)

    if (!args[0]) return message.lineReply(`**[ERROR]** Please mention someone and provide amount of owlets.\nExample: \`${prefix}give @Slimaeus 2021\``)
    
    const member = bot.getUserFromMention(args)
    
    if (!member) return message.lineReplyNoMention('**[ERROR]** Please mention someone.\nExample: \`${prefix}give @Slimaeus 2021\`')
    
    if (args[0] !== `<@${member.id}>` && args[0] !== `<@!${member.id}>`) return message.lineReplyNoMention(`**[ERROR]** Wrong mention.\nExample: \`${prefix}give @Slimaeus 2021\``);

    if (member.id === message.author.id) return message.lineReplyNoMention(`**[ERROR]** You can't give owlet(s) to yourself?!?`)

    if (member.bot) return message.lineReply('**[ERROR]** You can\'t give owlet to bot.')

    if (!args[1]) return message.lineReplyNoMention(`**[ERROR]** You need to provide amount of owlets.\nExample: \`${prefix}give @Slimaeus 2021\``)
    
    //const o = Number(args[1])
    
    
    const o = Player1.owletShortcut(p1Profile, args[1])
    // if (!Number.isInteger(o)) return message.channel.send(`**[ERROR]** Wrong systax of number. Please provide an integer. :/\nExample: \`${prefix}give @Slimaeus 2021\``)
   //...
    
    if (o < 1) return message.lineReply(`**[ERROR]** Invalid owlet. Owlets to give must be at least 1.`)

    if(isNaN(o)) return message.lineReplyNoMention(`**[ERROR]** You need to provide a suitable amount of owlets.\nExample: \`${prefix}give @Slimaeus 2021\``)
    
    

    const p1Owlet = p1Profile.owlet
    //if (args[1] > p1Owlet) return message.lineReply(`Fail to give owlet. You don't have enough owlets. :<`)
    if (o > p1Owlet) return message.lineReply(`**[ERROR]** Fail to give owlet. You don't have enough owlets. :<`)
    
    const Player2 = new User(bot, member, message) 
    let p2Profile = await Player2.getInfo()
    if (!p2Profile) return message.lineReply(`**[ERROR]** **${member.tag} ** doesn't have profile.\nTell him/her create one by using \`${prefix}start\`.`)

   
    
    // await Promise.all([
    //   Player1.updateOwlet(-o),
    //   Player2.updateOwlet(o)
    // ])
    Player1.updateOwlet(p1Profile, -o)
    Player2.updateOwlet(p2Profile, o)
    await Player1.updateUser(p1Profile)
    await Player2.updateUser(p2Profile)
    return message.channel.send({
      embed: {
        color: "RANDOM",
        author: {name: message.author.tag, icon_url: message.author.displayAvatarURL()},
        thumbnail: {url: member.displayAvatarURL()},
        title: `Payment Success!`,
        description: `**${o.toLocaleString()}** owlet${o>1?'s':''} ha${o>1?'ve':'s'} been given into **${member.username}**'s inventory.`,
      }
    })
  }
}