const User = require('../../Classes/User.js')
// const talkedRecently = new Set(); 

module.exports = {
  name: 'steal',
  aliases: [],
  category: 'Economy',
  utilisation: '{prefix}steal [mention]',

  async execute (bot, message, args) {

    const prefix = await bot.getPrefix(message);

    const Player1 = new User(bot, message.author, message)
    let Profile1 = await Player1.getInfo()
    if (!Profile1) return message.lineReply(`**[ERROR]** You don't have a profile.\nCreate one by using \`${prefix}start\`.`)

    if (!args[0]) return message.lineReply(`**[ERROR]** Syntax error.\nExample: \`${prefix}steal @Slimaeus\``)

    const member = bot.getUserFromMention(args)
    
    if (!member) return message.lineReplyNoMention('**[ERROR]** Please mention someone.')
    
    if (args[0] !== `<@${member.id}>` && args[0] !== `<@!${member.id}>`) return message.lineReplyNoMention(`**[ERROR]** Wrong mention.\nExample: \`${prefix}give @Slimaeus\``);

    if (member.id === message.author.id) return message.lineReplyNoMention(`**[ERROR]** You can't steal yourself?!?`)
    //
    if (member.id === "445102575314927617" || member.id === "441438270061150208") return message.lineReplyNoMention(`**[ERROR]** Sorry but because we're developers so we have to lock you from stealing us. We added owlet to our inventory for testing command and so on. So please, do not try to steal us anymore.`)

    if (member.bot) return message.lineReply('**[ERROR]** You can\'t steal owlet from a bot!')

    const Player2 = new User(bot, member, message) 
    let Profile2 = await Player2.getInfo()
    if (!Profile2) return message.lineReply(`**${member.tag}** doesn't have profile.\nTell him/her to create one by using \`${prefix}start\`.`)

    const p2Owlet = Profile2.owlet
    if (p2Owlet <= 1) return message.lineReply(`This guy is too poor to steal. Please change your target to someone richer. (greater than 1000 owlets) :<`)

    const checkCd = await Player1.checkCooldown('steal')
    if (!checkCd) await Player1.setCooldown('steal')
    else return
    
    const p = Math.random() * 100
    const o = Math.floor((Math.random() * (20-1)) + 1)
    const Luck = Profile1.stats.luck
    //console.log(Profile1)
    const minSuccessRate = 1
    const maxSuccessRate = 25
    const Accuracy = 7
    const SuccessRate = minSuccessRate + (maxSuccessRate - minSuccessRate) * Math.pow(10, -Accuracy/Luck)
    const FailRate = 100 - SuccessRate
    
    if (p < SuccessRate) {
      const SuccessOwlet = Math.round(p2Owlet * o/100)
      //console.log(SuccessOwlet)
      const xp = Math.floor((Math.random() * (10-3)) + 3);

      await Player1.updateLevel(Profile1, xp)
      Player1.updateOwlet(Profile1, SuccessOwlet)
      Player2.updateOwlet(Profile2, -SuccessOwlet)
      await Player1.updateUser(Profile1)
      await Player2.updateUser(Profile2)
      const emojis = bot.config.emojis.success
      const emoji = emojis[Math.floor(Math.random()*emojis.length)];

      message.channel.send({
        embed: {
          color: "RANDOM",
          thumbnail: {url: member.displayAvatarURL()},
          author: { name: `${Player1.player.tag}`, icon_url: `${Player1.player.displayAvatarURL()}`},
          // title: ``,
          description: `${emoji} | You stole **${SuccessOwlet.toLocaleString()} owlet${SuccessOwlet>1?'s':''}** from **${Player2.player.username}**.`,
          footer: { text: `Success Rate: ${Math.floor(SuccessRate)}% | ${Math.round(o)}% owlets has been disappeared from ${Player2.player.username}\'s inventory.`},
        }
      })
      
      
    } else {
      const emojis = bot.config.emojis.fail
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      message.channel.send({
        embed: {
          color: "BLACK",
          author: { name: `${Player1.player.tag}`, icon_url: `${Player1.player.displayAvatarURL()}`},
          // title: ``,
          description: `${emoji} | You steal nothing from **${Player2.player.username}** :(`,
          footer: { text: `Fail Rate: ${Math.round(FailRate)}%`},
        }
      })
    }
  }
}