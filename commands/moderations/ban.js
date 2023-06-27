module.exports = {
    name: 'ban',
    aliases: [],
    category: 'Moderations',
    utilisation: '{prefix}ban [mention]',

    async execute(bot, message, args) {

      if (!message.member.permissions.has(['BAN_MEMBERS'])) return message.lineReply(`**[ERROR]** ${message.author}! You don't have required permission!`);

      if (!args[0]) return message.lineReply(`**[ERROR]** Missing mention user.`);

      const prefix = await bot.getPrefix(message)
      const member = message.guild.member(bot.getUserFromMention(args))

      if (!member) return message.lineReply(`**[ERROR]** Invalid user.`)

      var banReason;

      if (args[1]) banReason = args[1]
      else banReason = 'No reason.'

      if (member.bannable) {
        member.send({
          embed: {
            color: 'GOLD',
            author: {name: message.guild.name, icon_url: message.guild.iconURL()},
            title: 'YOU HAVE BEEN BANNED',
            fields: [
              {
                name: 'Reason',
                value: banReason,
              },
            ],
            footer: {text: message.author.tag, icon_url: message.author.displayAvatarURL()},
            timestamp: new Date(),
          }
        }).catch((err) => console.log(err))
      }

      await bot.sleep(5000);

      await member.ban({reason: banReason + ' | By ' + message.author.tag}).then(() => {
        message.lineReply(`**[DONE]** Successfully banned ${member.user.tag}. **Reason**: \`${banReason}\``)
      }).catch((err) => {
        message.lineReply(`**[ERROR]** Cannot ban **${member.user.tag}**. I may not have required permissions or their role is higher than me.`)
        console.log(err)
      })
    }
} 