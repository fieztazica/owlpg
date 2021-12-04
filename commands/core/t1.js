const Discord = require('discord.js')
const Creature = require('../../src/Classes/Creature')
const Terrian = require('../../src/Classes/Terrian')
const Weather = require('../../src/Classes/Weather')
const Round = require('../../src/Classes/Round')
const Battle = require ('../../src/Classes/Battle')
module.exports = {
    name: 't1',
    aliases: [],
    category: '',
    utilisation: '{prefix}t1',
    profile: true,
    async execute(bot, message, args) {
      
      const data = await message.author.getFullInfo()
      data.name = message.author.tag
      const fiezt = await bot.users.fetch('445102575314927617')
      const fieztData = await fiezt.getFullInfo()
      fieztData.name = fiezt.tag

      const you = new Creature(data)
      const opp = new Creature(fieztData)
      
      const plain = new Terrian('Plain')
      const rain = new Weather('Rain')
      const round = new Round()
      const battle = new Battle([you], [opp], [plain, round, rain], message.channel)
      
      await battle.start()
      // battle.send(message.channel)
      
    },
};
