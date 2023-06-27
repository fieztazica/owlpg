 const User = require('../../Classes/User.js')
var Discord = require("discord.js");
const Battle = require('../../Utils/Battle.js')
const Monsters = require('../../Structures/Monsters.js')
module.exports = {
    name: 'battle',
    aliases: ['bt'],
    category: 'Player',
    utilisation: '{prefix}battle [(ez, med, hard)/mention]',

    async execute(bot, message, args) {
      
      const prefix = await bot.getPrefix(message)
      const Player = new User(bot, message.author, message)
      Player.Profile = await Player.getInfo()
      if (!Player.Profile) {
        return message.lineReply(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)
      }
      const member = bot.getUserFromMention(args)
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username,message.author.displayAvatarURL({dynamic:true}));
      
      // if (!member) return message.lineReplyNoMention('**[ERROR]** Please mention someone.\nExample: \`${prefix}battle @Slimaeus 2021\`')

      if (!args[0]) return message.lineReply(`**[ERROR]** Please mention someone or difficulty of monsters.\nExample: \`${prefix}battle @Slimaeus\` or \`${prefix}battle ez\``)
    
      if (!member) {
        
        const diffs = Object.keys(Monsters)
        let diff;
        var Monster;
        let names;
        let xp;
        Level = Player.Profile.level
        // console.log(diff)
        if (["easy","ez"].includes(args[0])) {
          names = Object.keys(Monsters.easy)
          diff = "easy"
          xp = (Math.floor(Math.random() * (4-2)) + 2) * Level
        } else if (["medium","med"].includes(args[0])) {
          names = Object.keys(Monsters.medium)
          diff = "medium"
          xp = (Math.floor(Math.random() * (6-4)) + 4) * Level
        } else if (["hard"].includes(args[0])) {
          names = Object.keys(Monsters.hard)
          diff = "hard"
          xp = (Math.floor(Math.random() * (8-6)) + 6) * Level
        } else if (["random","rd"].includes(args[0])) {
          diff = diffs[Math.floor(Math.random() * diffs.length)]
          names = Object.keys(Monsters[diff])
          xp = (Math.floor(Math.random() * 6-4) + 4) * Level
        } else return message.lineReply(`**[ERROR]** Please mention someone or difficulty of monsters.\nExample: \`${prefix}battle @Slimaeus\` or \`${prefix}battle ez\``)

        const check = await Player.checkCooldown('battle')
        if (!check) await Player.setCooldown('battle')
        else return
        
        Monster = Monsters[diff][names[Math.floor(Math.random() * names.length)]]

        const Winner = await Battle.execute(bot, message, Player, Monster)
        

        // console.log(Winner)
        
        let p = Math.floor(Math.random() * 100)
        let o,v;
        
        if (p<25) {
          o = (Math.floor(Math.random() * (6-4)) + 4) * Level
          Player.updateOwlet(Player.Profile, o)
          await Player.updateUser(Player.Profile)
        }

        switch (Winner) {
          case 1:
            v = `Nobody can defeat you`
            // Player.updateLevel(Player.Profile, xp)
            break;
          case 2:
            v = `Upgrade your stats or equipments in order to gain your power`
            xp = Math.floor(xp/2)
            break;
          default:
            v = `TIED!`
            xp = 0
        }

        embed
        .setColor('RANDOM')
        .setThumbnail(Monster.image)
        .setDescription(`You received ${o?`**${o}** owlet${o>1?'s':''} and `: ``}**${xp}** xp.`)
        .setFooter(v)
        // .setTimestamp()
        
        if (xp) Player.updateLevel(Player.Profile, xp)
        await Player.updateUser(Player.Profile)
        return message.lineReply({embed: embed})
      }

      if (member) {
        if (args[0] !== `<@${member.id}>` && args[0] !== `<@!${member.id}>`) return message.lineReplyNoMention(`**[ERROR]** Wrong mention.\nExample: \`${prefix}battle @Slimaeus 2021\``);

        if (member.id === message.author.id) return message.lineReplyNoMention(`**[ERROR]** You can't battle to yourself?!?`)

        if (member.bot) return message.lineReply('**[ERROR]** You can\'t battle with bot.')

        let Player2 = new User(bot, member, message)
        Player2.Profile = await Player2.getInfo();
        if (member) {
          if (member.bot) return message.lineReply('**[ERROR]** You can\'t play with bot.')
          if (!Player2.Profile) return message.lineReply(`**[ERROR]** **${member.tag} ** doesn't have profile.\nTell him/her to create one by using \`${prefix}start\`.`)
        }
        if (await Player.checkCooldown('battle')) return
        
        const emojis = ["✅", "❌"]
        const request = await message.channel.send({ embed : {
          color: "RANDOM",
          title : `${message.author.username} challenges you for a battle`,
          description : `Do you accept **${member}** ?`
        }})
        await request.react(emojis[0])
        await request.react(emojis[1])

        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) &&  user.id === member.id
        
        const collector = request.createReactionCollector(filter, { max : 1 , time: 15000});

        collector.on('collect', async (reaction, user) => {
          if (reaction.emoji.name === emojis[0] && user.id !== message.author.id) {
            const check = await Player.checkCooldown('battle')
            if (!check) await Player.setCooldown('battle')
            else return
            
            request.delete()
            Battle.execute(bot, message, Player, Player2)
            
            Player.Profile = await Player.getInfo()
            Player2.Profile = await Player2.getInfo()

            Player.updateLevel(Player.Profile, 4)
            Player2.updateLevel(Player2.Profile, 2)
            await Player.updateUser(Player.Profile)
            await Player2.updateUser(Player2.Profile)
          }
          if (reaction.emoji.name === emojis[1]) {
            request.edit({ embed : {
              color: "RED",
              title : `${member.username} declined !`
            }})
            request.reactions.removeAll()
          }
        })
        collector.on('end', (collected, reason) => {
          if (reason === 'time') {
            request.edit({ embed : {
              color: "RED",
              title : `Timeout !`
            }})
            request.reactions.removeAll()
          }
        })
      }
    }
};
