const User = require('../../Classes/User.js')

module.exports = {
    name: 'redeem',
    aliases: [],
    category: 'Player',
    utilisation: '{prefix}redeem [code]',

    async execute(bot, message, args) {
      const prefix = await bot.getPrefix(message)
      const codes = bot.mongo.collection("codes")
      const claimedPlayer = bot.mongo.collection("claimed")
      
      const Player = new User(bot, message.author, message)
      let Profile = await Player.getInfo()
      if (!Profile) return message.lineReply(`**[ERROR]** You don't have a profile.\nCreate one by using \`${prefix}start\`.`)

      if (!args[0]) return message.lineReply(`**[ERROR]** Please enter the code.\nExample: \`${prefix}redeem CODE\``)
      
      const codeName = String(args[0].toLowerCase())
      const code = await codes.findOne({name: codeName})
      if (!code) return message.lineReply("**[ERROR]** Wrong giftcode!");
      if (!code.remain) return message.lineReply("**[ERROR]** Out of giftcode!");
      const claimed = await claimedPlayer.findOne({id: message.author.id, code: codeName})
      if (claimed) return message.lineReply("**[ERROR]** You had already redeemed this code!");
      
      let o = code.owlet || 10
      
      Player.updateOwlet(Profile, o)
      
      await Player.updateUser(Profile)

      await claimedPlayer.insertOne({id: message.author.id, code: codeName})

      if (code.remain === 1) await codes.deleteOne({name: codeName})
      else  
        await codes.updateOne({
          name: code.name
        },
        {
            $inc: {
              remain: -1
            }
        })

      return message.lineReply({
        embed: {
          color: "RANDOM",
          author: {name: message.author.tag, icon_url: message.author.displayAvatarURL()},
          thumbnail: {url: message.author.displayAvatarURL()},
          title: code.quote.toUpperCase(),
          description: `**${message.author.username}** is opening the gift. There ${o>1?'are':'is'} **${o.toLocaleString()} owlet${o>1?'s':''}**.\n**${o.toLocaleString()} owlet${o>1?'s':''}** ha${o>1?'ve':'s'} been given into **${message.author.username}**'s inventory.`,
        }
      })

    },
};