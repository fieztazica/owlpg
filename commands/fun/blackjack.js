const Discord = require('discord.js')
const User = require('../../Classes/User.js')

const blackjack = require("../../Structures/BlackJack.js")
module.exports = {
    name: 'blackjack',
    aliases: ['bj'],
    category: 'Fun',
    utilisation: '{prefix}blackjack [owlet(s)]',
    
    async execute(bot, message, args) {
      const prefix = await bot.getPrefix(message);
      // const member = bot.getUserFromMention(args);
      if (!args[0])
        return message.lineReply('**[ERROR]** Missing owlet(s) to play.\nExample: \`' + prefix +'blackjack 2021\`')

      const Player = new User(bot, message.author, message)
      let profile = await Player.getInfo()
      if (!profile) return message.lineReply(`**[ERROR]** You don't have a profile.`)

      const o = Player.owletShortcut(profile, args[0])

      if (o < 1) return message.lineReply(`**[ERROR]** Invalid bet (owlet). Owlets to bet must be at least 1.`)
      
      if (o > profile.owlet) return message.lineReply(`**[ERROR]** You don't have enough owlets. :<`)
      
      if (isNaN(o))
        return message.lineReply('**[ERROR]** Please provide a number.\nExample: \`' + prefix +'blackjack 2021\`')
      
      let game = await blackjack(message, bot)
      
        switch (game.result) {
            case "Win":
                Player.updateOwlet(profile, o)
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been added to your Inventory.`)
                break;
            case "Double Win":
                Player.updateOwlet(profile, o*2)
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been added to your Inventory.`)
                break;
            case "Lose":
                Player.updateOwlet(profile, -o)
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been taken from your Inventory.`)
                break;
            case "Double Lose":
                Player.updateOwlet(profile, -o*2)
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been taken from your Inventory.`)
                break;
            case "Tie":
                // Player.updateOwlet(profile, -o*2)
                await Player.updateUser(profile)
                message.lineReply(`It's tie! So you receive and taken nothing.`)
                break;
            case "Timeout":
                Player.updateOwlet(profile, Math.floor(o/10))
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been taken from your Inventory because of timeout.`)
                break;
            case "Cancel":
                Player.updateOwlet(profile, Math.floor(o/10))
                await Player.updateUser(profile)
                message.lineReply(`**${o.toLocaleString()} owlet${o > 1 ? 's' : ''}** ha${o !== 1 ? 've' : 's'} been taken from your Inventory because of you have cancelled.`)
                break;    
        }
    }
};