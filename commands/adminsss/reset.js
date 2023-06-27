const qdb = require('quick.db')
module.exports = {
  name: 'reset',
  aliases: ['rs'],
  category: '',
  utilisation: '',
  async execute (bot, message) {

    if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208' || message.author.id === '751742622741037117')) return;

    const cooldown = ['steal','hunt','gift','fish']
    bot.db.delete(`${message.author.id}.player`)
    for await (const cd of cooldown) {
      qdb.delete(`${message.author.id}.${cd}`)
    }
  }
} 