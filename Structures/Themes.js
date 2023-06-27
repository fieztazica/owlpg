const { MessageEmbed } = require('discord.js')
const Icon = require('./Icons')
const Status = require('./Status')
module.exports = [
    {
        name: 'Default',
        execute(First, Second, Battle, embed) {

            if (!embed) {
                embed = new MessageEmbed()
                    .setTitle(`${First.Name.toUpperCase()} vs. ${Second.Name.toUpperCase()}`)
                    .setThumbnail(Second.Image)
                    .addFields(
                        {
                            name: First.Name,
                            value: Status(First),
                            inline: true
                        },
                        {
                            name: Second.Name,
                            value: Status(Second),
                            inline: true
                        },
                        {
                            name: `STANDBY PHASE`,
                            value: Battle.Log,
                        }
                    )
                return embed
            }
            if (Battle.FirstTurn) {
                embed.fields[0].name = First.Name
                embed.fields[1].name = Second.Name
            }
            else {
                embed.fields[0].name = First.Name
                embed.fields[1].name = Second.Name
            }



            if (First.HP <= 0 && Second.HP <= 0) {
                embed.setAuthor(`DRAW`, First.Image)
            }
            if (First.HP <= 0) {
                embed.setAuthor(`${Second.Name.toUpperCase()} WON`, First.Image)
                embed.fields[0].name = `~~${First.Name}~~`
                embed.fields[1].name = `${Icon.firework} ${Second.Name.toUpperCase()} ${Icon.firework}`
            }
            if (Second.HP <= 0) {
                embed.setAuthor(`${First.Name.toUpperCase()} WON`, First.Image)
                embed.fields[0].name = `${Icon.firework} ${First.Name.toUpperCase()} ${Icon.firework}`
                embed.fields[1].name = `~~${Second.Name}~~`
            }
            if (embed) {
                if (!Battle.LastAction) {
                    Battle.LastAction = Battle.Log
                } else if (!Battle.RecentAction) {
                    Battle.RecentAction = Battle.Log
                } else {
                    Battle.LastAction = Battle.RecentAction
                    Battle.RecentAction = Battle.Log
                }
                embed.fields[2].name = `${(Battle.Turn % 2) ? Icon.p1 : Icon.p2} ROUND ${Battle.Round}`
                embed.fields[0].value = Status(First)
                embed.fields[1].value = Status(Second)
                embed.fields[2].value = Battle.LastAction + '\n' + Icon.recent + " " + Battle.RecentAction

            }
            return embed
        }
    },
    {
        name: 'Minimal',
        execute(First, Second, Battle, embed) {

            if (!embed) {
                const embed = new MessageEmbed()
                .addFields(
                  {
                    name : First.Name,
                    value : Status(First, 'Minimal'),
                    inline : true,
                  },
                  {
                    name : Second.Name,
                    value : Status(Second, 'Minimal'),
                    inline : true,
                  },
                  // {
                  //   name : '\u200b',
                  //   value : '\u200b',
                  //   inline : true,
                  // },
                  {
                    name : `STANDBY PHASE`,
                    value : Battle.Log.replace('-','\n').replace('and','\n')
                  }
                )
                // let content = `${First.Name} vs. ${Second.Name}`
                // content += `\n${First.Name}\n${Status(First, 'Minimal')}`
                // content += `\n${Second.Name}\n${Status(Second, 'Minimal')}`
                // content += `\n${Battle.Log}`

                return embed
            }



            
            if (First.HP <= 0 && Second.HP <= 0) {
                embed.setDescription(`\nResult\nDRAW`)
                //embed += `\nResult\nDRAW`

            }
            if (First.HP <= 0) {
              embed.setDescription(`\nResult\n${Second.Name.toUpperCase()} WON`)
                // embed += `\nResult\n${Second.Name.toUpperCase()} WON`
                // embed += `\n${Icon.firework} ${Second.Name.toUpperCase()} ${Icon.firework}`

            }
            if (Second.HP <= 0) {
              embed.setDescription(`\nResult\n${First.Name.toUpperCase()} WON`)
              
                // embed += `\nResult\n${First.Name.toUpperCase()} WON`
                // embed += `\n${Icon.firework} ${First.Name.toUpperCase()} ${Icon.firework}`

            }
            if (embed) {
                if (!Battle.LastAction) {
                    Battle.LastAction = Battle.Log.replace('-','\n').replace('and','\n')
                } else if (!Battle.RecentAction) {
                    Battle.RecentAction = Battle.Log.replace('-','\n').replace('and','\n')
                } else {
                    Battle.LastAction = Battle.RecentAction
                    Battle.RecentAction = Battle.Log.replace('-','\n').replace('and','\n')
                }
                if (Battle.FirstTurn) {
                  embed.setColor('BLUE')
                }
                else {
                  embed.setColor('RED')
                }
                embed.fields[2].name = `ROUND ${Battle.Round}`
                embed.fields[2].value = Battle.RecentAction
                embed.fields[0].name = `${First.Name}`
                embed.fields[0].value = `${Status(First, 'Minimal')}`
                embed.fields[1].name = `${Second.Name}`
                embed.fields[1].value = `${Status(Second, 'Minimal')}`
                // embed = `\n${(Battle.Turn % 2) ? Icon.p1 : Icon.p2} ROUND ${Battle.Round}`
                // embed += `\n${First.Name}\n${Status(First, 'Minimal')}`
                // embed += `\n${Second.Name}\n${Status(Second, 'Minimal')}`
                // embed += '\n' + Battle.LastAction + '\n' + Icon.recent + " " + Battle.RecentAction
                
                return embed
            }
            //return embed
        }
    }
]