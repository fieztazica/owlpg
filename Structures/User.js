const { Structures, MessageEmbed } = require('discord.js')
const db = require('../Databases/mongo.js');

const slimy = db.collection('player');
const stats = db.collection('pstats');

const constants = require('../Utils/constants');
const DiscordPages = require("discord-pages");
const ISLAND = require("../Constants/Island");
const element = require('../Utils/element.js')
const Icon = require('../Constants/Icon')
let setKing = false;

class Player extends Structures.get("User") {
  constructor(client, data) {
    super(client, data)
  }  
  async isExists() {
    const user = await slimy.count({id: this.id}, { limit: 1});
    return user
  }
  async getInfo() {
    return await slimy.findOne({id: this.id})
  }
  async getStats(getId = true) {
    const pStats = await stats.findOne({id: this.id})
    delete pStats._id
    if (!getId) delete pStats.id
    return pStats
  }
  async getFullInfo() {
    const [info, pStats] = await Promise.all([
      await this.getInfo(),
      await this.getStats(false)
    ])
    info.stats = pStats
    return info
  }
  async kingInfo() {
    return await slimy.findOne({king: true})
  }
  async updateCoin(coin) {
    await slimy.updateOne({
      id: this.id
    },
    {
      $inc: {
        coin 
      }
    })
  }
  async start() {
    const elements = [
      'Fire', 'Metal', 'Grass', 'Earth', 'Water',
      'Ice', 'Electric', 'Wind', 'Light', 'Dark'
    ]
    const randomIndex = Math.random() * elements.length
    await Promise.all([
      slimy.insertOne({
        id: this.id,
        coin: 100,
        bank: 0,
        island: 1,
        element: elements[Math.floor(Math.random() * elements.length)],
        start: Date.now(),
      }),
      stats.insertOne({
        id: this.id,
        hp: 100, maxhp: 100,// Health Point
        pow: 5,             // Power
        vit: 5,             // Vitality
        int: 5,             // Intelligent
        men: 5,             // Metality
        spd: 5              // Speed
      })
    ])
  }
  async hasKing() {
    const king = await slimy.find({ king: true}).count();
    return king > 0
  }
  async setKing() {
    if (setKing) return false
    setKing = true
    await slimy.updateOne({
      id: this.id,
    },
    {
      $set: {
        king: true
      }
    })
    setKing = false
    return true
  }
  async updateCoin(amount) {
    amount = Math.round(amount)
    await slimy.updateOne({
      id: this.id,
    },
    {
      $inc: {
        'coin': amount
      }
    })
  }
  age(start) {
    const time = new Number(Date.now() - start)
    return time.msToDay()
  }
  async profile() {
    const info = await this.getFullInfo()
    const age = this.age(info.start)
    const time = [
      { name: 'day', value: age.day},
      { name: 'hour', value: age.hour},
      { name: 'minute', value: age.minute},
      { name: 'second', value: age.seconds},
    ]
    const lived = time
    .map((timeMark) => {
      //return (timeMark<1) ? '': `${plural(timeMark.name, timeMark.value)}`
      return (timeMark<1) ? '': `${timeMark.name.plural(timeMark.value)}`
    })
    .join(', ')
    const pStats = info.stats
    const statsInfo = Object.keys(info.stats).map((name) => {
      if (name === 'hp') return `**${Icon.stats.hp} ${name.toUpperCase()}** - \`${info.stats[name]}/`
      if (name === 'maxhp') return `${info.stats[name]}\`\n`
      return `**${Icon.stats[name]} ${name.toUpperCase()}** - \`${info.stats[name]}\`\n`
    }).join('')
    const inline = true
    const pEle = element(info.element)
    const liveTime = `You lived for ${lived}\nElement: ${pEle.icon}`
    const pEmbed = new MessageEmbed()
      .setColor(constants.BLUE)
      .setAuthor(`${this.username}`, `${this.displayAvatarURL({ dynamic: true })}`)
      .addFields({
        name: 'Information',
        value: liveTime
      },
      {
        name: 'Island',
        value: ISLAND[info.island].name
      },
      {
        name: 'Stats',
        value: statsInfo,
        inline
      },
      {
        name: 'Currency',
        value: `${Icon.owlet} Coin: \`${info.coin}\`\n${Icon.bank} Bank: \`${info.bank}\``,
        inline
      })
      .setThumbnail(`${this.displayAvatarURL({dynamic : true})}`)
      .setFooter('...', this.displayAvatarURL())
    return pEmbed
  }
  async reset() {
    await slimy.deleteOne({ id: this.id})
  }
  async showLeaderboard(bot, channel) {
    var embeds = []

    let lbarray = await slimy
        .find().sort({"coin": -1,"start":1}).toArray()
    const kingInfo = await this.kingInfo()
    
    const length = lbarray.length
    const userIndex = lbarray.findIndex((user) => user.id === this.id)
    const kingIndex = lbarray.findIndex((user) => user.id === kingInfo.id)
    const pageNum = Math.floor(length / 10) + 1
    
    const players = await Promise.all(
      lbarray.map((player) => bot.users.fetch(player.id))
    )
    const king = players[kingIndex]
    for (let num = 1; num <= pageNum; num++) {
      const embed = new MessageEmbed()
      .setTitle(`🏆 LEADERBOARD 🏆`)
      .setColor("RANDOM")

      embed.fields = []

      const pNum = (num === pageNum) ? length % 10 : 10
      embed
      //.setDescription(`👑  **__${king.tag}__** is the King 👑`)
      //.setDescription(`YOUR RANK: ${userIndex+1} | PAGE ${num}`)
      .setTimestamp()

      for (let i = 0; i < pNum; i++ )
      {
        const prep = (num-1)*10+i
        embed.addField(`#${prep+1} ${players[prep].tag}`,`${lbarray[prep].coin.toLocaleString()}`)
      }
      
      embeds.push(embed)
    }
    const embedPages = new DiscordPages({ 
        pages: embeds, 
        channel, 
        restricted: (user) => user.id === this.id || user.id === kingInfo.id
    });
    embedPages.createPages();
    
  }
}

Structures.extend('User', () => Player)