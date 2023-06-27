module.exports = {
  name: 'prefix',
  aliases: [],
  category: 'Configuration',
  utilisation: '{prefix}prefix []',

  async execute(bot, message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR'))
      return message.channel.send("You don't have permission !");

    const prefix = await bot.getPrefix(message)
    const guildId = message.guild.id
    // await prefix = bot.db.get(`${guildId}.prefix`)

    if (!args[0]) return message.lineReply({
      embed: {
        color: "RED",
        title: `ERROR`,
        description: `Missing prefix. You must enter the prefix.`,
        footer: { text: `This server current prefix is ${prefix}`},
        timestamp: new Date(),
      }
    })

    bot.db.set(`${guildId}.prefix`, `${args[0]}`).then(value => {
      message.channel.send(
        `From now, your guild's prefix is \`${args[0]}\``
      )
    });
  },
};
