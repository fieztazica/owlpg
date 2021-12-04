const { MessageEmbed, ReactionCollector } = require('discord.js')
const { healthBar } = require('../../Utils/status.js')
const Icon = require('../../Constants/Icon')
const Creature = require('../../src/Classes/Creature')
const Terrian = require('../../src/Classes/Terrian')
const Weather = require('../../src/Classes/Weather')
const Round = require('../../src/Classes/Round')
const Battle = require ('../../src/Classes/Battle')
module.exports = {
    name: 'test',
    aliases: [],
    category: '',
    utilisation: '{prefix}test',

    async execute(bot, message, args) {
      console.log(args[0])
      console.log(await args[0].getInfoByID())
      return

      const joinMess = await message.channel.send('React to join the battle!')
      
      await joinMess.react(Icon.accept)
        
      
      const filter = (reaction, user) => reaction.emoji.name === Icon.accept //|| reation.emoji.name === Icon.decline

      const collector = new ReactionCollector(joinMess, filter, { time: 15000 });
      
      const  rbData = {
        name: bot.user.tag,
        stats: {
          hp: 1000000, maxhp: 1000000000,
          pow: 1, vit: 1, int: 1, men:1, spd:40
        },
        element: 'Dark',
        status: 'Sleep'
      }
      const robot = new Creature(rbData)
      ceds = [
        robot
      ]
      // const  terrian = {
      //   name: 'Volcano',
      //   value: 'Lost 1 hp every turn',
      //   inline: true
      // }
      const plain = new Terrian('Plain')
      const rain = new Weather('Rain')
      const round = new Round()
      //const terrian = plain.getField()
      
      
      
      const env = [plain, round, rain]
      
      const cers = []
      collector.on('collect', async (reaction, user) => {
        const cer = await bot.users.fetch(user.id)
        const data = await cer.getFullInfo()
        if (!data) return message.channel.send(`${user.tag} can't join`)
        data.name = cer.tag
        const player = new Creature(data)
        message.channel.send(`${user.tag} join the battle`);
        cers.push(player)
      });
      collector.on('end', async (collected, reason) => {
        if (reason === 'time')
          message.channel.send('The battle is going to start!');
        else return message.channel.send('The battle canceled');
        const battleRoyal = new Battle(cers, ceds, env, message.channel)
        await battleRoyal.start();
      });

      
      
      
    },
};
