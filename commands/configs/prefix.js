module.exports = {
  name: 'prefix',
  aliases: [],
  category: 'Configuration',
  utilisation: '{prefix}prefix []',

  async execute(bot, message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR'))
      return message.channel.send("You don't have permission !");

    const prefix = await message.guild.getPrefix()

    if (!args[0]) return message.lineReply({
      embed: {
        color: "RED",
        title: `ERROR`,
        description: `Missing prefix. You must enter the prefix.`,
        footer: { text: `This server current prefix is ${prefix}`},
        timestamp: new Date(),
      }
    })

    message.guild.setPrefix(args[0]).then(data => {
      message.channel.send(
        `From now, your guild's prefix is \`${args[0]}\``
      )
    });
  },
};
