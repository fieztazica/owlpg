module.exports = async (bot, user) => {

  const profile = await user.getInfo()
  const guild = await bot.guilds.cache.get('830110554604961824')
  const channel = guild.channels.cache.get(process.env.CHANNEL_ID_OWLVERNYTE)
  channel.send(`\`${profile.Class}\` **${user.player.tag}** joined our world!`)

};
