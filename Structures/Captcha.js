const { CaptchaGenerator } = require('captcha-canvas')
module.exports = async (bot, message) => {

    const prefix = await bot.getPrefix(message)
    const captcha = new CaptchaGenerator();

    const optionsc = {characters: 4, font: "Arial", size: 60, color: "pink"}
    const optionsd = {font: "Arial", size: 40, opacity: 0.5}
    const optionst = {size: 5, color: "pink"}
    captcha.setCaptcha(optionsc)
    captcha.setDecoy(optionsd)
    captcha.setTrace(optionst)
    const buffer = await captcha.generate()

    let msg = await message.lineReply({content: `**[SPAM CHECKPOINT]** Solve this captcha to continue.\n**30** sec countdown.`, files:[buffer]})
    let CAPCHECK
    const filter = x => {
      return (x.author.id === message.author.id && !x.content.startsWith(prefix))
    }
    // const collector = msg.channel.createMessageCollector(filter, { time: 30000})
    // collector.on('collect', async (m) => {
    //   if (m.content.toLowerCase() == captcha.text.toLowerCase()) {
        
    //     await msg.delete()
    //     await m.react("✅")
    //     CAPCHECK = 1
    //     collector.stop()
    //   } 
    // })
    // collector.on('end', async (m, reason) => {
    //   if (reason === 'time') {
    //     await msg.delete()
    //     await message.react("🔴")
    //     CAPCHECK = -1
    //   }
    // })
    await msg.channel.awaitMessages(filter,
      { max: 1, time: 30000 }
    )
    .then(async res => {
      if (!res.size) {
        await msg.delete()
        await message.react("🔴")
        return CAPCHECK = -1
      }
      
      const ans = res.first()

      if (ans.content.toLowerCase() == captcha.text.toLowerCase()) {
        
        await msg.delete()
        await ans.react("✅")
        return CAPCHECK = 1
      } 
      else {
        await msg.delete()
        await ans.react("❌")
        return CAPCHECK = 0
      } 
    })
    return CAPCHECK
}