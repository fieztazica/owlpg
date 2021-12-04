module.exports = {
    name: 'profile',
    aliases: ['p'],
    category: 'Player',
    utilisation: '{prefix}profile',
    profile: true,
    async execute(bot, message, args) {
      const member = bot.getUserFromMention(args) || message.author
      const profileInfo = await member.getInfo()
      
      if (!profileInfo) 
        return message.lineReplyNoMention(`**[ERROR]** **${member.tag}** doesn't have profile.\nTell him/her to create one by using \`${await message.guild.getPrefix()}start\`.`)
      const profile = await member.profile()
      return message.lineReplyNoMention(profile)
    },
};
