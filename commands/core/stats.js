module.exports = {
    name: 'stats',
    aliases: ['stat'],
    category: 'Core',
    utilisation: '{prefix}stats',

    async execute(bot, message, args) {
      
      let seconds = Math.floor(message.client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      return message.channel.send({
        embed:{
          color: `RANDOM`,
          title: `STATS`,
          fields: [
            {
              name: `ID`,
              value: `${bot.user.id}`,
              inline: true
            },
            {
              name: `USERS`,
              value: `${bot.users.cache.size}`,
              inline: true
            },
            {
              name: `CHANNELS`,
              value: `${bot.channels.cache.size}`,
              inline: true
            },
            {
              name: `UPTIME`,
              value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
              inline: true
            },
            {
              name: `PING`,
              value: `${bot.ws.ping}ms`,
              inline: true
            },
            {
              name: `SERVERS`,
              value: `${bot.guilds.cache.size}`,
              inline: true
            },
          ]
        }
      })

    }
}