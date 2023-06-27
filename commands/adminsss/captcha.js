const { CaptchaGenerator } = require('captcha-canvas')

module.exports = {
  name: 'captcha',
  aliases: [],
  category: '',
  utilisation: '{prefix}captcha',

  async execute(bot, message, args) {

    const prefix = await bot.getPrefix(message)

    const captcha = new CaptchaGenerator();
    const optionsc = {characters: 4, font: "Arial", size: 60, color: "pink"}
    const optionsd = {font: "Arial", size: 40, opacity: 0.5}
    const optionst = {size: 5, color: "pink"}
    captcha.setCaptcha(optionsc)
    captcha.setDecoy(optionsd)
    captcha.setTrace(optionst)
    const buffer = await captcha.generate()

    const msg = await message.reply({content: `**Captcha Practice** ||${captcha.text}||`, files:[buffer]})

    const filter = x => {
      return (x.author.id === message.author.id && !x.content.startsWith(prefix))
    }

    await msg.channel.awaitMessages(filter,
      { max: 1, time: 10000 }
    )
    .then(res => {
      if (!res.size) {
        
        return message.lineReply("**Captcha Timeout**")
      }

      const ans = res.first()
      if (ans.content.toLowerCase() == captcha.text.toLowerCase()) {
        
        return ans.lineReply("**CORRECT**")
      } 
      else {
        
        return ans.lineReply("**INCORRECT**")
      }
    })
  }
};