const Discord = require('discord.js')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')
const User = require('../../Classes/User.js')
module.exports = {
    name: 'rockpaperscissors',
    aliases: ['rps'],
    category: 'Fun',
    utilisation: '{prefix}rockpaperscissors [mention <owlet(s)> / choice = (r)ock, (p)aper, (s)cissors]',

    async execute(bot, message, args) {
      //const member = message.mentions.members.first()
      const member = bot.getUserFromMention(args);
      if (!args[0])
        return message.lineReply('**[ERROR]** Please mention someone or pick your choice. `<(r)ock, (p)aper, (s)cissors>`')
      
      selections = [
        'rock',
        'paper',
        'scissors',
        'r','p','s',
      ]

      choices = ['rock','paper','scissors']
      
      if (!member) {
        let u = args[0].toLowerCase()

        if (selections.includes(u)) {
          
          if (selections.indexOf(u) > 2)
            u = selections[selections.indexOf(u) - 3]
          
          let c = choices[Math.floor(Math.random() * choices.length)]

          // function getRandomIntInclusive(min, max) {
          //   min = Math.ceil(min);
          //   max = Math.floor(max);
          //   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
          // }
          
          let xp = Math.floor(Math.random() * 3) + 1;

          // console.log('com ' + c)
          // console.log('user ' + u)
          const player = new User(bot, message.author, message)
          let Profile = await player.getInfo()
          // await player.updateOwlet(10000)
          // const win = await player.updateCurrency(2)
          // const tie = await player.updateCurrency(1)
          if (u === c) {
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** TIE :/`);
          }
          
          if ((u == "r" || u == "rock") && c == "paper") {
            player.updateOwlet(Profile, -1)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          }
          if ((u == "r" || u == "rock") && c == "scissors") {
            player.updateOwlet(Profile, 2)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          } 
          

          if ((u == "p" || u == "paper") && c == "rock") {
            player.updateOwlet(Profile, 2)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          } 
          if ((u == "p" || u == "paper") && c == "scissors") {
            player.updateOwlet(Profile, -1)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          }
          

          if ((u == "s" || u == "scissors") && c == "paper") {
            player.updateOwlet(Profile, 2)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          }
          if ((u == "s" || u == "scissors") && c == "rock")  {
            player.updateOwlet(Profile, -1)
            player.updateLevel(Profile, xp)
            await player.updateUser(Profile)
            return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          }
        }
        else {
          const prefix = await bot.getPrefix(message)
          return message.lineReply(`**[ERROR]** Invalid choice. Type ${prefix}help rps for more infomation.`)
        }
        // if (args[0].toLowerCase() !== 'rock' || args[0].toLowerCase() !== 'paper' || args[0].toLowerCase() !== 'scissors' )
        
        
      } 
      
      if (member) {
        
        if (args[1]) {

          const player1 = new User(bot, message.author, message)
          let profileP1 = await player1.getInfo()
          if (!profileP1) return message.lineReply(`**[ERROR]** You don't have a profile.`)

          var bet = player1.owletShortcut(profileP1,args[1])

          if (bet > profileP1.owlet) return message.lineReply(`**[ERROR]** You don't have enough owlets. :<`)
          
          const player2 = new User(bot, member, message)
          let profileP2 = await player2.getInfo()
          if (!profileP2) return message.lineReply(`**[ERROR]** **${member.tag}** doesn't have profile.`)
          
          if (bet < 1) return message.lineReply(`**[ERROR]** Invalid bet (owlet). Owlets to bet must be at least 1.`)
        
          if (bet > profileP2.owlet) return message.lineReply(`**[ERROR]** **${member.tag}** doesn't have enough owlets. :<`)

          if (isNaN(bet)) {
          const prefix = await bot.getPrefix(message)
          return message.lineReply(`**[ERROR]** Invalid bet (owlet). Type ${prefix}help rps for more infomation.`)
          }
        }
        
        if (member.bot) return message.lineReply('**[ERROR]** You can\'t play with bot.')
        
        if (member.id === bot.user.id) return;

        if (member.id === message.author.id) {
          return message.lineReply("**[ERROR]** Duh, you can't play with your own, can you?  ");
        }

        const RockOption = new MessageMenuOption()
          .setLabel("Rock")
          .setDescription("Choose Rock ?")
          .setEmoji('🌑')
          .setValue("rock")
        
        const PaperOption = new MessageMenuOption()
          .setLabel("Paper")
          .setDescription("Choose Paper ?")
          .setEmoji('📄')
          .setValue("paper")
        
        const ScissorsOption = new MessageMenuOption()
          .setLabel("Scissors")
          .setDescription("Choose Scissors ?")
          .setEmoji('✂️')
          .setValue("scissors")

        const CancelOption = new MessageMenuOption()
          .setLabel("Cancel")
          .setDescription("Cancel this game.")
          .setEmoji('❌')
          .setValue("cancel")

        const Menu = new MessageMenu()
          .setID('menu1')
          .setPlaceholder('Choose your weapon')
          .addOption(RockOption)
          .addOption(PaperOption)
          .addOption(ScissorsOption)
          .addOption(CancelOption)
        const Row1 = new MessageActionRow()
          .addComponent(Menu)

        message.channel.send(`${message.author} \`vs.\` ${member}`,
        {components : [Row1]})
          .then(async msg => {
            const thisTimeout = setTimeout(() => {
              return msg.edit({
                content: `**TIMEOUT**`,
                components : []
              })
            }, 3 * 60 *  1000)

            // clearTimeout(thisTimeout)

            var id;
            const filter = (m) => (m.clicker.id === message.author.id || m.clicker.id === member.id) && m.clicker.id !== id
            let collector = msg.createMenuCollector(filter, { max : 2})
            let index = 0;
            let player = new Map()
            
            collector.on('collect', async (menu) => {
              // console.log(menu.clicker.id)
              id = menu.clicker.id
              menu.reply.defer()

              // console.log(menu.clicker)

              if (menu.values.includes('cancel')) {
                await msg.edit({
                  embed: {
                    color: 'RED',
                    title: 'Cancelled',
                    footer: {text: `${menu.clicker.user.tag} has cancelled this game`}
                  },
                  components: []
                })
                return clearTimeout(thisTimeout)
              }
            })

            collector.on('end', async (MenuCollector) => {
              // if (MenuCollector.length < 2) return msg.edit('Timeout')
              MenuCollector.forEach((value, key)=> {
                //msg.delete()
                if (value.clicker.id === message.author.id || value.clicker.id === member.id)
                  player.set(`${value.clicker.id}`, value.values[0])
              })

              const p1 = player.get(message.author.id)
              const p2 = player.get(member.id)
              
              var winner;
            
              if ( p1 === p2) {
                winner = 0
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** TIED! `,
                  components : []
                })
              }
                
              if (p1 == "rock" && p2 == "paper") {
                winner = 2
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.username} won!`,
                  components : []
                });
              } 
              if (p1 == "rock" && p2 == "scissors") {
                winner = 1
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : []
                });
              }

              if (p1 == "paper" && p2 == "rock") {
                winner = 1
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : []
                });
              }
              if (p1 == "paper" && p2 == "scissors") {
                winner = 2
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.username} won!`,
                  components : []
                });
              }

              if (p1 == "scissors" && p2 == "paper") {
                winner = 1
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : []
                });
              }
              if (p1 == "scissors" && p2 == "rock") {
                winner = 2
                msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.username} won!`,
                  components : []
                });
              }
              
              clearTimeout(thisTimeout)
              
              if (!bet) return;
              const Player1 = new User(bot, message.author, message)
              const Player2 = new User(bot, member, message)
              let Profile1 = await Player1.getInfo()
              let Profile2 = await Player2.getInfo()
              if (winner === 1) {
                // const Player
                // message.channel.send(`$`)
                // await Promise.all([
                //   Player1.updateOwlet(bet),
                //   Player2.updateOwlet(-bet)
                // ])
                Player1.updateOwlet(Profile1, bet)
                Player2.updateOwlet(Profile2, -bet)
                await Promise.all([
                  Player1.updateUser(Profile1),
                  Player2.updateUser(Profile2)
                ])
                
                message.channel.send(`**${message.author.username}** get **${bet} owlet${bet>1?'s':''}** from **${member.username}**.`)
              } else if (winner === 2) {
                
                Player1.updateOwlet(Profile1, -bet)
                Player2.updateOwlet(Profile2, bet)
                await Promise.all([
                  Player1.updateUser(Profile1),
                  Player2.updateUser(Profile2)
                ])
                
                message.channel.send(`**${member.username}** get **${bet} owlet${bet>1?'s':''}** from **${message.author.username}**.`)
              } else if (winner === 0) {
                message.channel.send(`**${message.author.username}** and **${member.username}**, both of you receive nothing from each other.`)
              }
            })
            //Collection [Map]
          })


        // bot.on('clickMenu', menu => {
        //   console.log(menu.clicker.user.username)
        //   if (menu.values[0] == 'rock') console.log('1')
        // })


      }
    },
};