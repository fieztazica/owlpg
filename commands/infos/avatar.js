module.exports = {
    name: 'avatar',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}avatar <mention>',

    execute(bot, message, args) {
      const member = bot.getUserFromMention(args) || message.author;

      const URL = member.displayAvatarURL({dynamic:true,size:256})
      const uRL = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.gif`
      
      let imageButtons = [
              {
                type: 2,
                label: `WEBP`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.webp`,
              },
              {
                type: 2,
                label: `PNG`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`,
              },
              {
                type: 2,
                label: `JPG`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.jpg`
              },
            ]
        if (URL.includes(uRL)) imageButtons.push({
          type: 2,
          label: `GIF`,
          style: 5,
          url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.gif`
        })
      message.channel.send({
        embed: {
          color: "RANDOM",
          author: {
            name: `${member.tag}'s avatar`
          },
          image: {
            url: URL
          },
        },
        components: [
          {
            type: 1,
            components: imageButtons
          }
        ]
      });
    },
};
