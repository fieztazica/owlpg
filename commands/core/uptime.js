module.exports = {
    name: 'uptime',
    aliases: [],
    category: '',
    utilisation: '{prefix}uptime',
    profile: true,
    async execute(bot, message, args) {

      let seconds = Math.floor(message.client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      return message.channel.send(`${days}d, ${hours}h, ${minutes}m, ${seconds}s`)
        
    }
}