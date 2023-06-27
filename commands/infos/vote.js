module.exports = {
    name: 'vote',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}vote',

    execute(bot, message) {
        return message.channel.send({
        embed: {
          color: "RANDOM",
          title: "Vote me here, "+message.author.tag+"!",
          description: `You can vote me every 12 hours to get reward!`,
          url: `https://top.gg/bot/853623967180259369/vote/`,
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
                label: `Vote me here!`,
                style: 5,
                url: `https://top.gg/bot/853623967180259369/vote/`
              },
            ]
          }
        ]
        });   
    },
};
