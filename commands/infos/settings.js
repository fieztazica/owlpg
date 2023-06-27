module.exports = {
    name: 'settings',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}settings',

    async execute(bot, message) {
      const guildId = message.guild.id

      message.lineReplyNoMention({
        embed: {
          color: "RANDOM",
          author: { name: `${message.guild.name}'s settings` },
          description: `[Invibe me!](https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot) | [Support Server](https://discord.link/owlvernyte) | [Vote me](https://top.gg/bot/853623967180259369)`,
          fields: [
            {
              name: `Prefix`,
              value: `${await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX}`,
              inline: true,
            },
            {
              name: `Server ID`,
              value: `${guildId}`,
              inline: true,
            },
            {
              name: `Region`,
              value: `${message.guild.region}`,
              inline: true,
            },
          ],
          footer : { text: `Slimaeus#8878 || Fiezt#1492`},
          
        }
      });
    },
};
