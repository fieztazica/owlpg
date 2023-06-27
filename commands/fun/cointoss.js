const User = require('../../Classes/User.js')
module.exports = {
    name: 'cointoss',
    aliases: ['ct','cointossing'],
    category: 'Fun',
    utilisation: '{prefix}cointoss <(h)ead/(t)ail [owlet(s)]>',

    async execute(bot, message, args) {
      const prefix = await bot.getPrefix(message)
      var u, o;
      let ht = ['head','tail','h','t']
      if (args[0]) {
        const player = new User(bot, message.author, message)
        const profile = await player.getInfo()

        if (!profile) return message.lineReply(`**[ERROR]** You don't have a profile.`)

        if (!ht.includes(args[0].toLowerCase())) return message.lineReply("**[ERROR]** Invalid choice. Only `(h)ead/(t)ail` are allowed.")

        u = args[0];
        if (!args[1]) return message.lineReply(`**[ERROR]** Missing owlets to play.\nExample: \`${prefix}cointoss head 2021\``)
        
        o = player.owletShortcut(profile,args[1])

        if (o < 1) return message.lineReply(`**[ERROR]** Invalid bet (owlet). Owlets to bet must be at least 1.`)

        if (o > profile.owlet) return message.lineReply(`**[ERROR]** You don't have enough owlets. :<`)
     
        if (isNaN(o)) return message.lineReply(`**[ERROR]** Please provide a specific number.\nExample: \`${prefix}cointoss head 2021\``)
      }

      coin = [
        'Head',
        'Tail',
      ];

      let c = coin[Math.floor(Math.random() * coin.length)]

      if (u && o && c) {
        const Player = new User(bot, message.author, message)

        // message.channel.send({
        //   embed: {
        //     color: "RANDOM",
        //     title: `SPINNING`,
        //     image: {url: 'https://media4.giphy.com/media/gK6L3woXfEALy3cmHV/giphy.gif'},
        //     footer: { text: `Requested by ${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}`},
        //   }
        // })       
        let profile = await Player.getInfo()
        if (u[0] == c[0].toLowerCase()) {
          Player.updateOwlet(profile, o)
          await Player.updateUser(profile)
          message.lineReply(`**[WIN]** You won **${o.toLocaleString()} owlet${o > 1 ? 's' : ''}**`)
        }
        else {
          Player.updateOwlet(profile, -o)
          await Player.updateUser(profile)
          message.lineReply(`**[LOSE]** You lose **${o.toLocaleString()} owlet${o > 1 ? 's' : ''}**`)
        }
      }

      if (c === 'Head') {
        var i = 'https://sc04.alicdn.com/kf/H326ffabbe7d440b39d5103a619b6e5f2Y.jpg'
      }
      else {
        var i = 'http://i.imgur.com/IcigPaK.gif'
      }

      return message.channel.send({
        embed: {
          color: 'RANDOM',
          title: c,
          image: {url: i},
          footer: { text: `Requested by ${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}`},
          timestamp: new Date(),
        }
      })

    }

};