module.exports = {
    name: 'kick',
    aliases: [],
    category: 'Moderations',
    utilisation: '{prefix}kick [mention]',

    async execute(bot, message, args) {
      if (!message.member.permissions.has(['KICK_MEMBERS'])) return message.lineReply(`**[ERROR]** ${message.author}! You don't have required permission!`);

      if (!args[0]) return message.lineReply(`**[ERROR]** Missing mention user.`);

      const prefix = await bot.getPrefix(message)
      const member = message.guild.member(bot.getUserFromMention(args))

      if (!member) return message.lineReply(`**[ERROR]** Invalid user.`)

      var kickReason;

      if (args[1]) kickReason = args[1]
      else kickReason = 'No reason.'

      if (member.kickable) {
        member.send({
          embed: {
            color: `RED`,
            author: {name: message.guild.name, icon_url: message.guild.iconURL()},
            title: 'YOU HAVE BEEN KICKED',
            fields: [
              {
                name: 'Reason',
                value: kickReason,
              }
            ],
            footer: {text: message.author.tag, icon_url: message.author.displayAvatarURL()},
            timestamp: new Date(),
          }
        }).catch((err) => console.log(err))
      }

      await bot.sleep(5000);
    
      await member.kick(kickReason + ' | By ' + message.author.tag).then(async () => {
        message.lineReply(`**[DONE]** Successfully kicked **${member.user.tag}**. **Reason**: \`${kickReason}\``)
        
      }).catch((err) => {
        message.lineReply(`**[ERROR]** Cannot kick **${member.user.tag}**. I may not have required permissions or their role is higher than me.`)
        console.log(err)
      }).finally(() => {})
    }
}