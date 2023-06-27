const qdb = require('quick.db')
const Discord = require('discord.js')
const Icons = require('../Structures/Icons')
const Classes = require('../Structures/Classes.js')
const { earlyGame, midGame } = require('../Structures/Skills.js')
const Format = require('../Structures/Format')
const Timeout = {
  hunt: 5,
  fish: 5,
  steal: 24 * 60 * 60,
  gift: 12 * 60 * 60,
  battle : 3 * 60,
}
module.exports = class {
  constructor(bot, player, message, ...options) {
    this.bot = bot
    this.db = bot.db
    this.player = player
    this.message = message
  }
  async sendCooldown(prefix) {
    const ResArr = new Array()
    const commands = Object.keys(Timeout)
    commands.forEach(async (key) => {
      ResArr.push(this.getCooldown(key))
    })
    const Result = await Promise.all(ResArr)
    let table = '';
    Result.forEach((cdTime, index) => {
      const cooldown = new Date(cdTime)
      let data = ''
      if (!cooldown) {
        data += '**Ready**'
      }
      else {
        data += `**${cooldown.getHours() ? cooldown.getHours() + "h " : ""}${cooldown.getMinutes() ? cooldown.getMinutes() + "m " : ""}${cooldown.getSeconds() ? cooldown.getSeconds() + "s" : "Ready"}${cooldown < 1000 && cooldown > 0 ? "< 1s" : ""}**`
      }
      table += `\`${prefix}${commands[index].toLowerCase()}\` : ${data}\n`
    })
    this.message.channel.send({
      embed: {
        color: 'BLUE',
        author: {
          name: `${this.player.username}'s cooldown`,
          icon_url: `${this.player.displayAvatarURL()}`,
        },
        description: table,
      }
    })
  }
  async getCooldown(command, timeOut = 0) {
    const cooldown = await qdb.fetch(`${this.player.id}.${command}`)
    if (!cooldown) return 0;
    if (Timeout[command])
      timeOut = Timeout[command]
    const period = timeOut * 1000 - (Date.now() - cooldown)
    if (period < 0) return 0;
    return period;
  }
  async setCooldown(command) {
    const premium = ['441438270061150208', '445102575314927617','748095156103938119','481228754547376128']
    if (premium.includes(this.player.id)) return;


    
    const period = await this.getCooldown(command)
    qdb.set(`${this.player.id}.${command}`, Date.now())
  }
  async checkCooldown(command, timeOut = 0) {
  
    const period = await this.getCooldown(command, timeOut)
    if (!period) return false
    
    if (period && period > 0) {
      const cooldown = new Date(period)
      this.message.lineReply(`**[COOLDOWN]** Sorry you must wait ${cooldown.getHours() ? cooldown.getHours() + "h " : ""}${cooldown.getMinutes() ? cooldown.getMinutes() + "m " : ""}${cooldown.getSeconds() ? cooldown.getSeconds() + "s" : ""}${cooldown < 1000 && cooldown > 0 ? "< 1s" : ""} to keep using \`${command}\`.`)
      return true
    }
  }
  
  owletShortcut(profile, args) {
    var value;

    const Owlet = profile.owlet

    switch (args) {
      case "all":
        value = Number(Owlet)
        break;
      case "half":
        value = Math.floor(Number(Owlet) / 2)
        break;
      default:
        value = Math.round(Number(args));
    }

    const argsPostfix = args.slice(-1)
    const postfix = ['k', 'm', 'b', 't']
    const rate = [1000, 1000000, 1000000000, 1000000000000]
    if (postfix.includes(argsPostfix))
      args = args.slice(0, args.length - 1)

    const postfixFind = (element) => element === argsPostfix;
    if (postfix.includes(argsPostfix)) {
      value = Number(args) * rate[postfix.findIndex(postfixFind)]
    }
    return Math.round(value);
  }
  async getInfo() {
    const data = await this.db.get(`${this.player.id}.player`)
    return JSON.parse(data)
  }
  async updateUser(infoObject) {
    const user = JSON.stringify(infoObject, null, 2)
    await this.db.set(`${this.player.id}.player`, user)
  }

  checkProfile(profile, prefix = process.env.PREFIX, mention = false, embed) {
    if (!profile) {
      let result
      if (mention === true) {
        result = `**[ERROR]** **${this.player.tag}** doesn't have profile.\nTell him/her to create one by using \`${prefix}start\`.`
      } else result = `**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``
      if (embed) result = embed
      return this.message.lineReply(result)
    }
  }

  async startUser(name = 'fighter') {
    const startInfo = {
      owlet: 0,
      exp: 0,
      level: 1,
      points: 0,
      Class: Classes[name].name,
      stats: Classes[name].stats,
      skills: Classes[name].skills,
      equipments: {
        weapon: Classes[name].weapon,
        helmet: null,
        chestplate: null,
        leggings: null,
        boots: null,
      },
      backpack: {
        type: 1,
        slots: 16,
        items: []
      },
      cus: {
        color: {
          name: 'default',
          type: 'color'
        },
        title: {
          name : 'default',
          type : 'title',
        },
        theme: ['Default', 'Minimal'],
      },
      premium: {
        cooldown: {
          bypass: false,
        },
      },
    }
    await this.updateUser(startInfo)
    await this.bot.emit("gamesStart", this)
  }
  updateItems({ backpack }, item, amount = 1, add = true) {
    if (add) {
      if (!item.amount) {
        backpack.items.push(item)
      }
      if (item.amount) {
        let hadItem = backpack.items.find((bpItem) => bpItem.name === item.name)
        if (hadItem) {
          const index = backpack.items.indexOf(hadItem)
          backpack.items[index].amount += amount
        }
        if (!hadItem) {
          item.amount = amount
          backpack.items.push(item)
        }
      }
    } else {
      const indexItem = backpack.items.indexOf(item)
      // console.log(indexItem)
      if (item.amount) {
        const remainAmount = Number(backpack.items[indexItem].amount) - Number(amount)
        if (remainAmount <= 0) {
          backpack.items.splice(indexItem, 1)
        }
        else {
          backpack.items[indexItem].amount = remainAmount
        }
      } else {
        backpack.items.splice(indexItem, 1)
      }
      
    }
    // console.log(backpack.items)
  }
  getPower(profile) {
    let stats = profile.stats
    // Object.keys(stats)
    //   .forEach((stat, index) => {
    //     let Stat = stats[stat]
    //     Object.keys(profile.equipments).forEach((equipment) => {
    //       if (profile.equipments[equipment] !== null)
    //         stats[stats] += (profile.equipments[equipment].stats[stat]) ? profile.equipments[equipment].stats[stat] + 1000000 : 0
    //     })
    //   }
    // )
    let PW
    PW = stats.atk + stats.magic + stats.def + stats.res + stats.hp / 10 + stats.mp / 10 + stats.crit + stats.reg + stats.spd + stats.luck

    return Math.round(PW / 10)
  }
  // async levelUp(amount) {
  //   var profile = await this.getInfo()

  //   await this.updateUser(profile)
  // }
  updateSkill(profile, name, type, add = true) {
    if (add) {
      if (profile.skills[type].includes(name)) return 'HAD'
      // this.message.lineReply(`**[ERROR]** You already learnt that skill.`)
      else {
        profile.skills[type].push(name)
        return 'LEARNT'
        // this.message.lineReplyNoMention(`**[SUCCESS]** Successfully learnt \`${name.toUpperCase()}\`.`)
      }
    } else {
      if (!profile.skills[type].includes(name)) return 'NOTHAVE'
      // this.message.lineReply(`**[ERROR]** ${this.player.username} doesn't have that skill.`)
      else {
        profile = profile.skills[type].filter((skill) => skill !== name)
        return 'REMOVED'
        // this.message.lineReplyNoMention(`**[SUCCESS]** Successfully removed \`${name.toUpperCase()}\` from ${this.player.username}.`)
      }
    }
  }
  maxLevel(mlevel) {
    return Math.round((4 * (Math.pow(mlevel, 3))) / 5)
  }

  updateOwlet(profile, value) {
    var oldOwlet = Number(profile.owlet)
    if (!oldOwlet) oldOwlet = 0
    var newOwlet = oldOwlet + value

    if (newOwlet < 0) newOwlet = 0
    profile.owlet = newOwlet
  }
  updateStat(profile, statName, value) {
    if (!profile.stats[statName] && profile.stats[statName] !== 0) return false

    if (statName === 'hp' || statName === 'mp') {
      value *= 10
    }

    profile.stats[statName] = (profile.stats[statName] < -value) ? 0 : profile.stats[statName] + value
    return true
  }
  updatePoint(profile, value) {
    profile.points = (profile.points < -value) ? 0 : profile.points + value
  }
  //var profile = await this.getInfo()
  updateLevel(profile, exp) {
    var Level = profile.level
    if (!Level) Level = 1
    const oldExp = profile.exp

    var newExp = oldExp + exp
    var LevelUp = 0
    while (newExp >= this.maxLevel(Level)) {
      newExp -= this.maxLevel(Level++)
      LevelUp++
    }

    if (LevelUp && this.message) this.message.reply(`your level ups to **${Level.toLocaleString()}**!`)
    profile.points += LevelUp * 5
    profile.exp = newExp
    profile.level = Level
  }
  title(profile, title) {
    const index = profile.backpack.items.indexOf(title)
    const oldTitle = profile.cus.title
    if (oldTitle.name !== 'default') profile.backpack.items.push(oldTitle)
    profile.cus.title = title
    profile.backpack.items.splice(index, 1)
  }
  color(profile, color) {
    const index = profile.backpack.items.indexOf(color)
    const oldColor = profile.cus.color
    if (oldColor.name !== 'default') profile.backpack.items.push(oldColor)
    profile.cus.color = color
    profile.backpack.items.splice(index, 1)
  }
  equip(profile, equipment) {
    // const Type = Object.keys(profile.equipments).find((pType) => pType.toLowerCase() === type.toLowerCase())
    const oldItem = profile.equipments[equipment.type]
    if (oldItem !== null) {
      profile.backpack.items.push(oldItem)
    }
    profile.backpack.items = profile.backpack.items.filter((item) => item.name !== equipment.name)
    profile.equipments[equipment.type] = equipment
  }
  unequip(profile, type) {
    const currentItem = profile.equipments[type.toLowerCase()]
    profile.backpack.items.push(currentItem)
    profile.equipments[type.toLowerCase()] = null
  }
  sendInv(profile) {

    const equip = ['helmet', 'leggings', 'chestplate', 'boots', 'weapon']
    const custom = ['title', 'color', 'theme']
    let equipItem = profile.backpack.items.filter((item) => equip.includes(item.type)).sort((item1, item2) => item1.name.localeCompare(item2.name))
    let customItem = profile.backpack.items.filter((item) => custom.includes(item.type)).sort((item1, item2) => item1.name.localeCompare(item2.name))
    let remainItem = profile.backpack.items.filter((item) => !equip.includes(item.type) && !custom.includes(item.type)).sort((item1, item2) => item1.name.localeCompare(item2.name))
    let Item1 = equipItem.map((item) => {
      return Icons.equipments[item.type] + `\`` + item.name + `\`` + ((item.amount > 1) ? ' x' + Format.formatNumber(item.amount) : '')
    }).join('\n') || 'Nothing'
    let Item3 = customItem.sort((item1, item2) => item1.type.localeCompare(item2.type)).map((item) => {
      return `\`` + item.name + `\``
    }).join('\n') || 'Nothing'
    let Item2 = remainItem.map((item) => {
      return `\`` + item.name + `\`` + ((item.amount > 1) ? ' x' + Format.formatNumber(item.amount) : '')
    }).join('\n') || 'Nothing'
    
    let embed = new Discord.MessageEmbed()
      .setColor(profile.cus.color.name)
      .setAuthor(`${this.player.username}'s inventory`, this.player.displayAvatarURL({ dynamic: true }))
      .addField('**Items**', Item2, true)
      .addField('**Equipments**', Item1, true)
      .addField('**Customize**', Item3, true)
      .addField(`**Currency**`, Icons.owlet + ' **Owlet' + ((profile.owlet) > 1 ? 's**: ' : '**: ') + Format.formatNumber(profile.owlet))
    this.message.channel.send(embed)
  }
  sendInfo(profile, username, avatar) {
    const power = this.getPower(profile)
    const quotes = require('../config/bot.js').quotes
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    let Title = (profile.cus.title.name === 'default') ? '' : profile.cus.title.name;

    const Skills = [...profile.skills.earlyGame, ...profile.skills.midGame].map((skillName) => {
      const skill = earlyGame.find((sk) => sk.name === skillName) || midGame.find((sk) => sk.name === skillName)
      return `${Icons.skills[skill.type]} ${skillName}`
    }) || 'Nothing'

    const equipText = Object.keys(profile.equipments).map((type) => {
      let info = `${Icons.equipments[type]} **${type.toUpperCase()}** : `
      if (profile.equipments[type])
        info += `${profile.equipments[type].name}`
      else info += `none`
      return info
    })
    let Stats = ''
    let Stats2 = ''
    Object.keys(profile.stats)
      .forEach((stat, index) => {
        let Stat = profile.stats[stat]
        Object.keys(profile.equipments).forEach((equipment) => {
          if (profile.equipments[equipment] !== null)
            Stat += (profile.equipments[equipment].stats[stat]) ? profile.equipments[equipment].stats[stat] : 0
        })

        if (index < 5)
          Stats += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${Stat.toLocaleString()}`
        else if (index < 10)
          Stats2 += `\n${Icons[stat]} **${stat.toUpperCase()}** : ${Stat.toLocaleString()}`
      })
    
    const channel = this.message ? this.message.channel : profile.channel
    channel.send({
      embed: {
        color: profile.cus.color.name,
        author: { name: `${username || this.player.username}`, icon_url: `${avatar || this.player.displayAvatarURL({ dynamic: true })}` },
        //thumbnail : { url : `${this.player.displayAvatarURL({dynamic : true})}`},
        title: Title,
        fields: [
          {
            name: `**PROGRESS**`,
            value: `**${Icons.Classes[profile.Class.toLowerCase()]} Class**: ${profile.Class}\n${Icons.level} **Level**: ${profile.level.toLocaleString()}\n${Icons.xp} **XP**: ${profile.exp.toLocaleString()}/${this.maxLevel(profile.level).toLocaleString()}\n${Icons.point} **Points**: ${profile.points}\n${Icons.power} **Power**: ${power.toLocaleString()}`,
            inline: true
          },
          {
            name: `**EQUIPMENT**`,
            value: equipText,
            inline: true
          },

          {
            name: `**CURRENCY**`,
            value: `${Icons.owlet} **Owlet${profile.owlet > 1 ? 's' : ''}**: ${profile.owlet.toLocaleString()}`,
            inline: true,
          },
          {
            name: `**STATS**`,
            value: `${Stats}`,
            inline: true
          },
          {
            name: `\u200b`,
            value: Stats2,
            inline: true,
          },
          {
            name: '**SKILLS**',
            value: Skills,
            inline: true,
          },


        ],
        footer: { text: `Battle Theme: ` + profile.cus.theme[0] + ' | ' + quote }
      }
    })
  }
}
