const fs = require('fs')
var Discord = require("discord.js");
const Buttons = require('discord-buttons')
const ButtonsMenu = require("discord-menu-embed");
module.exports = {
    name: 'help',
    aliases: [],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    async execute(bot, message, args) {
        const guildId = message.guild.id 
        const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX;

        if (!args[0]) {
            
            // fs.readdirSync('./commands').forEach(dirs => {console.log(dirs)})

            const fun = bot.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
            const economy = bot.commands.filter(x => x.category == 'Economy').map((x) => '`' + x.name + '`').join(', ');
            const play = bot.commands.filter(x => x.category == 'Player').map((x) => '`' + x.name + '`').join(', ');
            const infos = bot.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const mod = bot.commands.filter(x => x.category == 'Moderations').map((x) => '`' + x.name + '`').join(', ');
            const configs = bot.commands.filter(x => x.category == 'Configuration').map((x) => '`' + x.name + '`').join(', ');

            Discord.MessageMenu = Buttons.MessageMenu;
            Discord.MessageMenuOption = Buttons.MessageMenuOption;
            Discord.MessageActionRow = Buttons.MessageActionRow;

            var embeds = [], menu = {};
            const content = ['Home', 'Commands', 'Informations', 'Fun', 'Player', 'Economy', 'Moderations', 'Configuration'];

            const odes = `You can use \`${prefix}help <command>\` to have more informantion.\nYou can also mention me as a prefix.\n\n`
            let des, field, valued;

            for (var i = 0; i < content.length; i++) {
              const embed = new Discord.MessageEmbed()
              .setColor(`RANDOM`)
              .setTitle(`Help Panel`)
              .setFooter(`${isNaN(content[i])?'':'Page'} ${content[i]} | Requested by ${message.author.tag} | Using ${prefix}help`)
              .setTimestamp()

              switch (content[i]) {
                case 'Informations':
                  des = `Provides you to show more informations about anything (I hope so).`
                  valued = infos
                  break;
                case 'Fun':
                  des = `TRY NOT TO SPEND ALL YOU MONEY ON THIS CATEGORY!`
                  valued = fun
                  break;
                case 'Player':
                  des = `You can customize your profile with color and title which can be bought in shop.`
                  valued = play
                  break;
                case 'Economy':
                  des = `Hustle, hustle, hustle all day long.`
                  valued = economy
                  break;
                case 'Moderations':
                  des = `Those commands relate to this category is just for basic cases.`
                  valued = mod
                  break;
                case 'Configuration':
                  des = `Configuration commands are limited. The developers are working to create more and more functions for this category.`
                  valued = configs
                  break;
              }

              if (!valued) {
                des = `**Devs Note**: We're still developing this bot, there may be bugs in some command that we can't find out and fix. Let us know at [here](https://discord.gg/542zNAUsPU).\n\nChoose your wish category from selections menu below to continue.`
                field = [
                    {
                      name: 'Connections',
                      value: `**[Youtube](https://www.youtube.com/channel/UCEG5sgFKieaUuHsu5VG-kBg)** | **[Discord](https://discord.io/owlvernyte)** | **[Facebook](https://www.facebook.com/owlvernyte)**`
                    },
                    {
                      name: `Vote`,
                      value: `**[Vote our server](https://top.gg/servers/830110554604961824/vote)** | **[Vote me here](https://top.gg/bot/853623967180259369/vote)**`,
                    },
                    {
                      name: `Buy me a coffee`,
                      value: `**[Playerduo](https://playerduo.com/owlvernyte)**`
                    },
                    { 
                      name: 'Invite me here', 
                      value: `\*\*[CLICK HERE](https://top.gg/bot/853623967180259369/invite)\*\*`
                    },
                  ]
              } else field = {name: content[i], value: valued}

              if (content[i] === 'Commands') {
                  des = `This page shows you a full list of commands that I have.`
                  field = [
                    { name: 'Informations', value: infos },
                    { name: 'Fun', value: fun },
                    { name: 'Player', value: play },
                    { name: 'Economy', value: economy },
                    { name: 'Moderations', value: mod },
                    { name: 'Configuration', value: configs },
                  ]
              }

              embed
              .setDescription(des = (des ? odes + des : odes))
              .addFields(field)
              embeds.push(embed);
            }

            menu.id = "menuyea";
            menu.placeholder = "Choose a category...";
            menu.selects = [];
            for (var i = 0; i < content.length; i++) {
              const select = { 
              id: `select_${content[i]}`, 
              label: `${isNaN(content[i])?'':'Page'} ${content[i]} `,
              description: `${content[i]} - select...`
              };
              menu.selects.push(select);
            }

            if (message.author) {
                message.channel.menu(message.author.id, {
                embeds: embeds,
                menu: menu
              });
            }


        } else {
            const command = bot.commands.get(args.join(" ").toLowerCase()) || bot.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            // console.log(command)

            if (!command) return message.lineReply(`**[ERROR]** INVALID COMMAND.`);
            
            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: `Requested by ${message.author.tag} | Using ${prefix}help ${command.name}` },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', process.env.PREFIX), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                },
                components: [{
                  type: 1,
                  components: [
                    {
                      type: 2,
                      style: 5,
                      label: `Support Server`,
                      url: `https://discord.link/owlvernyte`
                    }
                  ]
                }]
            });
            
        };
    },
};
