const User = require('../../Classes/User.js')
module.exports = {
  name: 'admintitle',
  aliases: ['amtt'],
  category: '',
  utilisation: '',
  async execute (bot, message) {

    if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208')) return;
    const Player = new User(bot, message.author)
    const Profile = await Player.getInfo()

    const t = {
      name: "Developer",
      type: 'title',
      cost: 15062021,
    }
    const c = {
      name: "RANDOM",
      type: 'color',
      cost: 100000,
    }
    
    Profile.cus.title = t
    Profile.cus.color = c

    await Player.updateUser(Profile)
  }
} 