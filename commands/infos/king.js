
module.exports = {
    name: 'king',
    aliases: [],
    category: 'Player',
    utilisation: '{prefix}king',
    profile: true,
    async execute(bot, message, args) {
      
      const profileInfo = await message.author.kingInfo()
      
      if (!profileInfo)
        return message.lineReplyNoMention(`**[ERROR]** **There is no king**.`)
      const king = await bot.users.fetch(profileInfo.id)
      const profile = await king.profile(bot, profileInfo)
      message.lineReplyNoMention({content: `This is profile of the King 👑`,embed : profile})
      
    },
};
