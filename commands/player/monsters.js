const Discord = require('discord.js')
const Monsters = require('../../Structures/Monsters.js')
const Search = require('../../Utils/Search.js')
const Icons = require('../../Structures/Icons.js')
const { earlyGame, midGame } = require('../../Structures/Skills.js')
module.exports = {
  name: 'monsters',
  aliases: ['dex', 'monster'],
  category: 'Player',
  utilisation: '{prefix}monsters',

  async execute(bot, message, args) {
    const prefix = await bot.getPrefix(message)
    const dexembed = new Discord.MessageEmbed()
    .setTitle('Monsters Wiki')
    .setColor("RANDOM")
    .setFooter(`${prefix}monsters <monster's name> to show more information`);
    
    if (!args[0]) {
      Object.keys(Monsters).forEach((diff, index) => {
        dexembed.addField(diff.toUpperCase())
        let value = ''
        for (var i = 0; i < Monsters[diff].length; i++) {
          value += '\`' + Monsters[diff][i].name + `\`${(i === Monsters[diff].length - 1) ? '' : ', '}`
        }
        dexembed.fields[index].value = value + ''
      })
    }
    
    if (args[0]) {
      const monsterName = args.join(' ')
      const foundMonster = Search.monsters(monsterName)
      if (!foundMonster) return message.lineReply(`**[ERROR]** Cannot find that monster.\nTry to check the full list with \`${prefix}monsters\``)
      let Stats = ''
      let Stats2 = ''
      Object.keys(foundMonster.stats)
        .forEach((stat, index) => {
          let Stat = foundMonster.stats[stat]

          if (index < 5)
            Stats += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${Stat.toLocaleString()}`
          else
            Stats2 += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${Stat.toLocaleString()}`
        })
      const Skills = [...foundMonster.skills.earlyGame, ...foundMonster.skills.midGame].map((skillName) => {
        const skill = earlyGame.find((sk) => sk.name === skillName) || midGame.find((sk) => sk.name === skillName)
        return `${Icons.skills[skill.type]} ${skillName}`
      }) || 'Nothing'

      dexembed.setTitle(foundMonster.name + ' (' + foundMonster.level + ')')
      .addFields(
          {
            name: 'STATS',
            value: Stats,
            inline: true
          },
          {
            name: '\u200b',
            value: Stats2,
            inline: true
          },
          {
            name: 'SKILLS',
            value: Skills,
            inline: true 
          },
        )
      .setImage(foundMonster.image)
      
    }
    
    return message.channel.send(dexembed)
  },
}