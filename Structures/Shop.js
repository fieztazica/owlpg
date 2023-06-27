const Items = require('./Items')
const Icons = require('./Icons')
const Search = require('../Utils/Search.js')
const Discord = require('discord.js')
const Buttons = require('discord-buttons')
const ButtonsMenu = require("discord-menu-embed");
module.exports = {
  sendShop(message, prefix, Player) {
    
    const weapons = Items['weapon'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((weapon) => {
      const stats = Object.keys(weapon.stats)
      const statString = `**[` + stats.map((stat) => Icons[stat] + ' ' + (weapon.stats[stat] < 0 ? + weapon.stats[stat] : '+' + weapon.stats[stat])).join(', ') + `]**`
      const classes = '\`' + weapon.classes.join('\`, \`') + '\`'

      return '\`' + weapon.name + '\`' + ` | **Price**: ${Icons.owlet}** ${weapon.cost}**  | ` + statString + ` | **Suggested**: ` + classes
    }).join('\n')

    const helmets = Items['helmet'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((helmet) => {
      const stats = Object.keys(helmet.stats)
      const statString = `**[` + stats.map((stat) => Icons[stat] + ' ' + (helmet.stats[stat] < 0 ? + helmet.stats[stat] : '+' + helmet.stats[stat] )).join(', ') + `]**`
      const classes = '\`' + helmet.classes.join('\`, \`') + '\`'

      return '\`' + helmet.name + '\`' + ` | **Price**: ${Icons.owlet}** ${helmet.cost}** | ` + statString + ` | **Suggested**: ` + classes
    }).join('\n')

    // Icons[Object.keys(helmet.stats)[0]] + '\`' + helmet.name + '\`' + ` | **Price**: ${Icons.owlet}**${helmet.cost}**`)

    const chestplates = Items['chestplate'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((chestplate) => {
      const stats = Object.keys(chestplate.stats)
      const statString = `**[` + stats.map((stat) => Icons[stat] + ' ' + (chestplate.stats[stat] < 0 ? +chestplate.stats[stat] : '+' + chestplate.stats[stat] )).join(', ') + `]**`
      const classes = '\`' + chestplate.classes.join('\`, \`') + '\`'

      return '\`' + chestplate.name + '\`' + ` | **Price**: ${Icons.owlet}** ${chestplate.cost}** | ` + statString + ` | **Suggested**: ` + classes
    }).join('\n')
    // Icons[Object.keys(chestplate.stats)[0]] + '\`' + chestplate.name + '\`' + ` | **Price**: ${Icons.owlet}**${chestplate.cost}**`).join('\n')

    const leggingses = Items['leggings'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((leggings) => {
      const stats = Object.keys(leggings.stats)
      const statString = `**[` + stats.map((stat) => Icons[stat] + ' ' + (leggings.stats[stat] < 0 ? +leggings.stats[stat] : '+' + leggings.stats[stat] )).join(', ') + `]**`
      const classes = '\`' + leggings.classes.join('\`, \`') + '\`'

      return '\`' + leggings.name + '\`' + ` | **Price**: ${Icons.owlet}** ${leggings.cost}** | ` + statString + ` | **Suggested**: ` + classes
    }).join('\n')
    // Icons[Object.keys(leggings.stats)[0]] + '\`' + leggings.name + '\`' + ` | **Price**: ${Icons.owlet}**${leggings.cost}**`).join('\n')

    const bootses = Items['boots'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((boots) => {
      const stats = Object.keys(boots.stats)
      const statString = `**[` + stats.map((stat) => Icons[stat] + ' ' + (boots.stats[stat] < 0 ? +boots.stats[stat] : '+' + boots.stats[stat] )).join(', ') + `]**`
      const classes = '\`' + boots.classes.join('\`, \`') + '\`'

      return '\`' + boots.name + '\`' + ` | **Price**: ${Icons.owlet}** ${boots.cost}** | ` + statString + ` | **Suggested**: ` + classes
    }).join('\n')
    // Icons[Object.keys(boots.stats)[0]] + '\`' + boots.name + '\`' + ` | **Price**: ${Icons.owlet}**${boots.cost}**`).join('\n')

    const consumables = Items['consumable'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((consumable) => {
      const stats = Object.keys(consumable.stats)
      const statString = stats.map((stat) => Icons[stat] + ' ' + (consumable.stats[stat] < 0 ? +consumable.stats[stat] : '+' + consumable.stats[stat] )).join(', ')

      return '\`' + consumable.name + '\`' + ` | **Price**: ${Icons.owlet}** ${consumable.cost}** | ` + statString
    }).join('\n')
    // Icons[Object.keys(consumable.stats)[0]] + '\`' + consumable.name + '\`' + ` | **Price**: ${Icons.owlet}**${consumable.cost}**`).join('\n')

    const materials = Items['material'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((material) => '\`' + material.name + '\`' + ` | **Price**: ${Icons.owlet}** ${material.cost}**`).join('\n')
    // Icons[Object.keys(material.stats)[0]] + '\`' + material.name + '\`' + ` | **Price**: ${Icons.owlet}**${material.cost}**`).join('\n')

    const colors = Items['color'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((color) => '\`' + color.name + '\`' + ` | **Price**: ${Icons.owlet}** ${color.cost}**`).join('\n')

    const titles = Items['title'].sort((item1, item2) => item1.name.localeCompare(item2.name)).map((title) => '\`' + title.name + '\`' + ` | **Price**: ${Icons.owlet}** ${title.cost}**`).join('\n')

    Discord.MessageMenu = Buttons.MessageMenu;
    Discord.MessageMenuOption = Buttons.MessageMenuOption;
    Discord.MessageActionRow = Buttons.MessageActionRow;

    var embeds = [], menu = {};
    const content = ['Home', 'Weapon', 'Helmet', 'Chestplate', 'Leggings', 'Boots', 'Consumable', 'Material','Customize'];

    for (var i = 0; i < content.length; i++) {
      const embed = new Discord.MessageEmbed();
      embed.setColor(`RANDOM`);
      embed.setAuthor(`Shop Panel`);
      embed.setDescription(`Use \`${prefix}buy [item name]\` to buy item.`);
      embed.setFooter(`${isNaN(content[i])?'':'Page'} ${content[i]} | Requested by ${message.author.tag} | Using ${prefix}shop`);
      embed.setTimestamp();

      if (content[i] === 'Home') {
        embed
        .setTitle(content[i].toUpperCase())
        .addFields(
          {
            name: 'Connections',
            value: `**[Youtube](https://www.youtube.com/channel/UCEG5sgFKieaUuHsu5VG-kBg)** | **[Discord](https://discord.link/owlvernyte)** | **[Facebook](https://www.facebook.com/owlvernyte)**`
          },
          {
            name: `Vote`,
            value: `**[Vote our server](https://top.gg/servers/830110554604961824/vote)** | **[Vote me here](https://top.gg/bot/853623967180259369/vote)**`,
          },
          {
            name: `Buy me a coffee`,
            value: `**[Playerduo](https://playerduo.com/owlvernyte)**`
          },
          { name: 'Invite me here', value: `\*\*[CLICK HERE](https://top.gg/bot/853623967180259369/invite)\*\*`},
          { name: `Selections`, value: `Choose your wish category above to continue` }
        )
      }

      if (content[i] === 'Weapon') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + weapons)
      }

      if (content[i] == 'Helmet') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + helmets)
      }

      if (content[i] == 'Chestplate') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + chestplates)
      }

      if (content[i] == 'Leggings') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + leggingses)
      }

      if (content[i] == 'Boots') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + bootses)
      }

      if (content[i] == 'Consumanble') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + consumables)
      }

      if (content[i] == 'Material') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + materials)
      }

      if (content[i] == 'Customize') {
        embed
        .setTitle(content[i].toUpperCase())
        .setDescription(`Use \`${prefix}buy [item name]\` to buy item.\n\n` + '⬐ **[Colors]** ⬎\n' + colors + '\n⬐ **[Titles]** ⬎\n' + titles)
      }

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

  }
}