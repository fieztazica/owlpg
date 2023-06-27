module.exports = {
    name: 'invite',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}invite',

    execute(bot, message) {
      // message.channel.send({
      //   embed: {
      //     color: 'RANDOM',
      //     author: {name: 'Invibe me!', url: 'https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot'}
      //   }
      // })

      message.channel.send({
        embed: {
          color: 'RANDOM',
          title: `Invite me here, ${message.author.tag}!`,
          url: `https://top.gg/bot/853623967180259369/invite/`,
          fields: [
            {
              name: 'Connect with us',
              value: `[Youtube](https://www.youtube.com/channel/UCEG5sgFKieaUuHsu5VG-kBg) | [Discord](https://discord.io/owlvernyte) | [Facebook](https://www.facebook.com/owlvernyte)`
            },
            {
              name: `Buy me a coffee`,
              value: `[Playerduo](https://playerduo.com/owlvernyte)`
            }
          ],
        },
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: `Invibe me!`,
                style: 5,
                url: `https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot`
              },
            ]
          }
        ]
      });
      
    },
};
