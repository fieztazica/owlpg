const cron = require('cron')
const User = require('../Classes/User.js')

module.exports = async (bot, message) => {
  let scheduledMessage = new cron.CronJob('0 0 8-20/12 * * *', async () => {
    const chosen = bot.users.cache.get('445102575314927617')
    const Player = new User(bot, chosen)
    
    const allkey = await bot.db.list()
    let array = []
    for (const key of allkey) {
      array.push(bot.db.get(key))
    }

    const guild = await bot.guilds.cache.get(process.env.GUILD_ID)
    
    const channel = guild.channels.cache.get(process.env.CHANNEL_ID_BOT_TEST)
    
    const now = new Date()
    channel.send(now.toUTCString())
    const data = await Promise.all(array)
    data.forEach(async (player, index) => {
      const info = JSON.parse(player)
      // data[index] = JSON.parse(player)
      const user = await bot.users.fetch(allkey[index].replace('.player', ''))
      // const string = Object.keys(info).map((key) => `${key} : ${info[key]}`)
      // channel.send(`${user.username} has `)
      info.channel = channel
      channel.send(user.id)
      Player.sendInfo(info, user.username, user.displayAvatarURL())
    })

  },null,true,'Asia/Ho_Chi_Minh');

  // message.channel.send("Wait")
  // When you want to start it, use:
  // scheduledMessage.start()

  // let uptimeTest = new cron.CronJob('*/5 0-6 * * *', async () => {
  //   const guild = await bot.guilds.cache.get(process.env.GUILD_ID) //* 0-6 * * *
  //   const channel = guild.channels.cache.get("888822390283436112")
  //   const now = new Date()
    
  //   let seconds = Math.floor(message.client.uptime / 1000);
  //   let minutes = Math.floor(seconds / 60);
  //   let hours = Math.floor(minutes / 60);
  //   let days = Math.floor(hours / 24);

  //   seconds %= 60;
  //   minutes %= 60;
  //   hours %= 24;

  //   channel.send(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    
  // },null,true,'Asia/Ho_Chi_Minh')
  // uptimeTest.start()
}