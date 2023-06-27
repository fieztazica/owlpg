const User = require('../../Classes/User.js')
// const cron = require('cron')
module.exports = {
  name: 'database',
  aliases: ['db'],
  category: '',
  utilisation: '',
  async execute (bot, message) {

    //console.log(allkey)
    
    //console.log(data)
    // let scheduledMessage = new cron.CronJob('0 0 */12 * * *', async () => {
      const chosen = bot.users.cache.get('445102575314927617')
      const Player = new User(bot, chosen)

      const allkey = await bot.db.list()
      console.log(allkey)
      let array = []
      for (const key of allkey) {
        await array.push(bot.db.get(key))
      }

      console.log(allkey)
      console.log(array)

      const guild = await bot.guilds.cache.get(process.env.GUILD_ID)
      const channel = guild.channels.cache.get(process.env.CHANNEL_ID_BOT_TEST)
      const now = new Date()
      channel.send(`${now.toUTCString()} from **${message.guild.name}**(${message.guild.id}) in **${message.channel.name}**(${message.channel.id}) by **${message.author.tag}**(${message.author.id})`)
      const data = await Promise.all(array)
      await data.forEach(async (player, index) => {
        const info = JSON.parse(player)
        // data[index] = JSON.parse(player)
        const user = await bot.users.fetch(allkey[index].replace('.player', ''))
        //const string = Object.keys(info).map((key) => `${key} : ${info[key]}`)
        // channel.send(`${user.username} has `)
        info.channel = channel
        channel.send(user.id)
        Player.sendInfo(info, user.username, user.displayAvatarURL())
      })
    // });

    // message.channel.send("Wait")
    // When you want to start it, use:
    // scheduledMessage.start()
    
  }
} 