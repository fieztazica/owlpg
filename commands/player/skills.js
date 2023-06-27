const User = require('../../Classes/User.js')
const Skills = require('../../Structures/Skills.js')
const Icons = require('../../Structures/Icons')
const Discord = require('discord.js')
module.exports = {
  name: 'skills',
  aliases: ['learn','sk','skill'],
  category: 'Player',
  utilisation: '{prefix}skills',

  async execute(bot, message, args) {
    const Player = new User(bot, message.author, message)
    let Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)
    
    if (!Profile) return message.lineReplyNoMention(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)

    const skills = [...Skills.earlyGame, ...Skills.midGame]
    let haveSkills = [...Profile.skills.earlyGame, ...Profile.skills.midGame]
    const available = skills.filter((skill) => skill.classes.includes(Profile.Class) && !haveSkills.includes(skill.name))
    
    //available.forEach((skill) => console.log(skill))
    
    let Board = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Skills Panel')
    .setFooter(`Requested by ${message.author.tag}`)
    .setTimestamp()
    
    if (!args[0]) {
      const sk = available.map((skill) => skill.name).join('\`, \`')
      Board
      .setDescription(`Use \`${prefix}skills -i [skill name]\` to have more information about that skill.\n\nIt costs 10 points to learn a new one in available list.`)
      .addField('Your skills','\`'+haveSkills.join('\`, \`')+'\`')
      .addField('Available to learn', sk ? '\`'+ sk +'\`' : `Nothing`);
      return message.lineReplyNoMention(Board)
    }

    if (args[0].startsWith('-')) {
      const option = args[0].slice(1).toLowerCase()

      if (['i', 'info'].includes(option)) {
        if (!args[1]) return message.lineReply(`**[ERROR]** Please enter your wish skill name to have more information.\nExample: \`${prefix}skills -i set trap\``) // ['i', 'ste', trap]
        args.shift()
        const skillName = args.join(' ')
        const foundSkill = skills.find((skill) => (skill.name) ? skill.name.toLowerCase() === skillName.toLowerCase() : false)
        if (!foundSkill) return message.lineReply(`**[ERROR]** Cannot find that skill.\nTry to check the full list with \`${prefix}skills\``)
        const hasSkill = haveSkills.includes(foundSkill.name)
        Board
        .setTitle(foundSkill.name)
        .setDescription(foundSkill.description)
        .addField('Already have', (hasSkill) ? 'Yes' : 'No', true)
        .addField('Mana', foundSkill.mana, true)
        .addField(`Available Class${foundSkill.classes.length > 1 ? 'es' : ''}`,foundSkill.classes.length ? `\`${foundSkill.classes.join(`\`, \``)}\`` : `All`, true)
        .addField('Type', foundSkill.type.toUpperCase(), true)
        .addField((foundSkill.cooldown === -2) ? `EarlyGame Skill` : `MidGame Skill`, (foundSkill.cooldown === -2) ? `Used at Start` : `Cooldown : ${Math.abs(foundSkill.cooldown)} round${foundSkill.cooldown > 1 ? 's' : ''}`, true)
        .addField(`\u200b`,`\u200b`, true)
        return message.lineReplyNoMention(Board)
      } 
    }

    const skill = skills.find((skill) => (skill.name) ? skill.name.toLowerCase() === args.join(' ').toLowerCase() : false)
    if (!skill) {
      return message.lineReplyNoMention(`**[ERROR]** Please enter a suitable skill name to learn.\nExample: \`${prefix}skills set trap\``)
    }
    
    const Points = Profile.points
    if (Points < 10) return message.lineReply(`**[ERROR]** You don't have enough points to learn.`)
    
    const skillType = (skill.cooldown === -2) ? 'earlyGame' : 'midGame'
    const Result = Player.updateSkill(Profile, skill.name, skillType)
    await Player.updateUser(Profile)

    switch (Result) {
      case 'LEARNT':
        message.lineReplyNoMention(`**[SUCCESS]** Successfully learnt \`${skill.name.toUpperCase()}\`.`)
        Player.updatePoint(Profile, -10)
        break;
      default:
        message.lineReplyNoMention('**[ERROR]** You already learnt that skill!')
    }
    return
  }
}