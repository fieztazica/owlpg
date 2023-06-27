const User = require('../../Classes/User.js')
module.exports = {
  name: 'points',
  aliases: ['up'],
  category: 'Player',
  utilisation: '{prefix}points',

  async execute(bot, message, args) {
    const Player = new User(bot, message.author, message)
    let Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)
    
    if (!Profile) return message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)
    const alias = {
      atk : [
        "atk",
        "attack",
      ],
      magic : [
        "mg",
        "magic",
      ],
      def : [
        "def",
        "defend",
        "defense",
        "defence"
      ],
      hp : [
        "hp",
        "health point",
        "health"
      ],
      mp : [
        "mp",
        "mana",
        "mana point"
      ],
      luck : [
        "luck",
        "lck",
      ],
      spd : [
        "spd",
        "speed",
      ],
      reg : [
        "reg",
        "regen",
        "regeneration",
      ],
      res : [
        "res",
        "resist",
        "resistance"
      ],
      crit : [
        "crit",
        "critical",
      ],
    }
    if (!args[0]) return message.lineReply(`**[ERROR]** Missing arguments.\nExample: \`${prefix}points attack 5\``)

    const statHave = args[0].toLowerCase()
    if (!statHave) {
      return message.lineReply(`**[ERROR]** Please enter your wish stat to upgrade.\nExample: \`${prefix}points attack 5\``)
    }
    let statName
    Object.keys(alias).forEach((ele) => {
      if (alias[ele].includes(statHave))
        statName = ele
    })
    if (!statName) return message.lineReply(`**[ERROR]** Please enter a suitable stat to upgrade.\nExample: \`${prefix}points attack 5\``)
    let upPoint 
    if (!args[1]) upPoint = 1
    else upPoint = bot.number(args[1], Profile.points)

    if (!upPoint || isNaN(upPoint) || upPoint < 0) {
      return message.lineReply(`**[ERROR]** Please provide a suitable number.\nExample: \`${prefix}points attack 5\``)
    }

    // if (upPoint < 0 ) return message.lineReply(`**[ERROR]** You don't have enought point(s)`)
    const Stats = {
      hp : "HP",
      mp : "MP",
      atk : "Attack",
      magic : "Magic",
      def : "Defend",
      res : "Resistance",
      spd : "Speed",
      reg : "Regeneration",
      crit : "Critical",
      luck : "Luck"
    }
    if (upPoint > Profile.points) return message.lineReply(`**[ERROR]** You don't have enought point(s)`)
    Player.updatePoint(Profile, -upPoint)
    Player.updateStat(Profile, statName, upPoint)
    await Player.updateUser(Profile)
    return message.lineReplyNoMention(`**[SUCCESS]** You just use **${upPoint}** point${upPoint > 1 ? "s" : ""} to increase your \`${Stats[statName]}\`. Now your \`${Stats[statName]}\` is **${Profile.stats[statName]}**.`)
    
  }
}