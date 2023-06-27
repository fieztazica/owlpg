const User = require('../../Classes/User.js')
module.exports = {
  name: 'admin',
  aliases: ['adm'],
  category: '',
  utilisation: '',
  async execute (bot, message, args) {

    if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208')) return;

    const member = bot.getUserFromMention(args) || message.author;
    // console.log(process.env.REPLIT_DB_URL)
    // const allKey = await bot.db.getAll()
    
    // return console.log(allKey)

    
    const Player = new User(bot, member)
    const Profile = await Player.getInfo()

    // const t = {
    //   name: "Developer",
    //   type: 'title',
    //   cost: 15062021,
    // }
    // const c = {
    //   name: "RANDOM",
    //   type: 'color',
    //   cost: 100000,
    // }
    
    // Profile.cus.title = t
    // Profile.cus.color = c

    Player.updateOwlet(Profile, 1000000)
    // Player.updateLevel(Profile, 1000000000)
    // Player.updatePoint(Profile, 20)
    await Player.updateUser(Profile)
  }
} 