module.exports = {
    name: 'leaderboard',
    aliases: ['lboard'],
    category: 'Infos',
    utilisation: '{prefix}leaderboard',

    async execute(bot, message, args) {
      
      message.author.showLeaderboard(bot, message.channel)
    },
};
