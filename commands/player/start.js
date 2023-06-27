const User = require('../../Classes/User.js')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')
const Icons = require('../../Structures/Icons.js')
const Discord = require('discord.js')
const Classes = require('../../Structures/Classes.js')

module.exports = {
  name: 'start',
  aliases: [],
  category: 'Player',
  utilisation: '{prefix}start',
  async execute (bot, message, args) {
    
    const prefix = await bot.getPrefix(message)
    const player = new User(bot,message.author, message)
    const info = await player.getInfo()
    if (info) return message.lineReply(`**[ERROR]** You already have a profile.\n\`${prefix}profile\` to see.`)

    const startembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Welcome our hero, ' + message.author.username + '!')
    .setFooter('Select your class in the menu below')

    let Options = []
    for (const [key, classInfo] of Object.entries(Classes)) {
        Options.push(
      new MessageMenuOption()
      .setLabel(classInfo.name)
      .setDescription(classInfo.description)
      .setEmoji(classInfo.icon)
      .setValue(key)
      )
    }
    // const FighterOption = new MessageMenuOption()
    //   .setLabel("Fighter")
    //   .setDescription("Most basic class to redeem.")
    //   .setEmoji(Icons.Classes.fighter)
    //   .setValue("fighter")
    
    // const WitchOption = new MessageMenuOption()
    //   .setLabel("Witch")
    //   .setDescription("Witches are powerful with their wand.")
    //   .setEmoji(Icons.Classes.witch)
    //   .setValue("witch")
    
    // const FisherOption = new MessageMenuOption()
    //   .setLabel("Fisher")
    //   .setDescription("Fishers need lots of luck")
    //   .setEmoji(Icons.Classes.fisher)
    //   .setValue("fisher")

    // const AssassinOption = new MessageMenuOption()
    //   .setLabel("Assassin")
    //   .setDescription("A real assassin")
    //   .setEmoji(Icons.Classes.assassin)
    //   .setValue("assassin")

    // const HunterOption = new MessageMenuOption()
    //   .setLabel("Hunter")
    //   .setDescription("The hero of the jungle.")
    //   .setEmoji(Icons.Classes.hunter)
    //   .setValue("hunter")

    const CancelOption = new MessageMenuOption()
      .setLabel("Cancel")
      .setDescription("Cancel this game.")
      .setEmoji('❌')
      .setValue("cancel")

    let ClassesMenu = new MessageMenu()
      .setID('menu1')
      .setPlaceholder('Choose your class')
    Options.forEach((Class) => {
      ClassesMenu.addOption(Class)
    })
      // 
      // .addOption(WitchOption)
      // .addOption(FisherOption)
      // .addOption(AssassinOption)
      // .addOption(HunterOption)
      ClassesMenu.addOption(CancelOption)
      
    const Row1 = new MessageActionRow()
      .addComponent(ClassesMenu)

    const Message = await message.channel.send({ embed: startembed, components : [Row1] })


    const filter = (chosen) => chosen.clicker.id === message.author.id

    const Collector = Message.createMenuCollector(filter, { max : 1, time : 30000})

    Collector.on('collect', async (chosen) => {
      if (chosen.values[0] === 'cancel') {
        Collector.stop()
      }
      else {
        await player.startUser(chosen.values[0]) 
        
        
        let Stats = ''
        let Stats2 = ''
        const ChosenClass = Classes[chosen.values[0]]
        Object.keys(ChosenClass.stats)
        .forEach((stat, index) => {
          if (index < 5)
            Stats += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${ChosenClass.stats[stat].toLocaleString()}`
          else Stats2 += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${ChosenClass.stats[stat].toLocaleString()}`
        })
        
        let Skills = [...ChosenClass.skills.earlyGame, ...ChosenClass.skills.midGame].join('\`, \`') || 'Nothing'


        startembed.setFooter('You chose ' + ChosenClass.name + '.')
        .addFields(
        {
          name: ChosenClass.icon +' **'+ ChosenClass.name + '**\'s weapon',
          value: '\`'+ChosenClass.weapon.name+'\`',
        },
        {
          name: ChosenClass.icon + ' **'+ ChosenClass.name + '**\'s stats',
          value: Stats,
          inline : true
        },
        {
          name : '\u200b',
          value : Stats2,
          inline : true
        },
        {
          name : '\u200b',
          value : '\u200b',
          inline : true
        },
        {
          name: ChosenClass.icon +' **'+ ChosenClass.name + '**\'s skills',
          value: '\`'+Skills+'\`',
        },  
        )
        .setDescription(`Use \`${prefix}profile\` to see your profile.\n- You can earn owlet with \`${prefix}hunt\` and \`${prefix}fish\`.\n- Battle with monsters or your friends by using \`${prefix}battle\`.\n\nFind out more with \`${prefix}help\`.`);
        
        Message.edit({embed: startembed,
        components : []})
      }
    })
    Collector.on('end', (collected, reason) => {
      
      if (reason === 'time') {
        startembed.setColor('RED').setTitle('TIME OUT!').setFooter(`Requested by ${message.author.tag}`).setTimestamp()
        Message.edit({embed: startembed, components : []})
      }
      if (reason === 'user') {
        startembed.setColor('RED').setTitle('CANCELLED').setFooter(`Requested by ${message.author.tag}`).setTimestamp()
        Message.edit({embed: startembed, components : []})
      }
    })
    // await player. .startUser('fighter')
    
    // return message.lineReply(`**[SUCCESS]** You now have a profile!\n\`${prefix}profile\` to see.`)
    //10 000 000 000 000 000 000

    
  }
}