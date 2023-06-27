const Captcha = require('captcha-generator-better');

module.exports = {
  name: 'captchaold',
  aliases: [],
  category: '',
  utilisation: '{prefix}captchaold',

  async execute(bot, message, args) {

    const prefix = await bot.getPrefix(message)

    const captcha = new Captcha()

    const msg = await message.channel.send({content: `**Captcha Practice**`, files:[captcha.PNGStream]})

    const filter = x => {
      return (x.author.id === message.author.id)
    }

    await msg.channel.awaitMessages(filter,
      { max: 1, time: 10000 }
    )
    .then(res => {
      if (!res.size) {
        
        return message.lineReply("**Captcha Timeout**")
      }

      const ans = res.first()
      if (ans.content.toLowerCase() === captcha.value.toLowerCase()) {
        
        return ans.lineReply("**CORRECT**")
      } 
      else {
        
        return ans.lineReply("**INCORRECT**")
      }
    })
  }
};