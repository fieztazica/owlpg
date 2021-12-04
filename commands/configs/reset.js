module.exports = {
    name: 'reset',
    aliases: [],
    category: 'Config',
    utilisation: '{prefix}reset',

    async execute(bot, message) {
      await message.author.reset()
      message.lineReplyNoMention("Reset Successful!!");
    },
};
