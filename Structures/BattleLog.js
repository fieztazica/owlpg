const Icon = require('./Icons')
module.exports = {
  attack (Who, Target, Battle, {name, stat, summoned}) {
    return `**${Who.Name}** used \`${name}\` - ${(!summoned) ? '': `summoned ${summoned} and `}dealed ${!Who.TotalDamage ? `no damage` : `**${Who.TotalDamage}** ${(Who.CriticalDamage) ? `${Icon.crit} (x${(Who.TotalDamage / Who.Damage).toFixed(2)})` : ''} ${Icon[stat]} damage${Who.TotalDamage > 1 ? "s" : ''} to **${Target.Name}**`}`

  },
  heal (Who, Target, Battle, {name, note}) {
    return `**${Who.Name}** used \`${name}\` ${!Who.Healed ? '- nothing happen...' : ` - healed **${Who.Healed}** ${Icon.hp} ${note}`}`
  },
  buff (Who, Target, Battle , {name, stat, value}) {
    return `**${Who.Name}** used \`${name}\` ${!value ? '- nothing happen...' : ` - ${Who.Name}'s ${Icon[stat]} increase ${value}`}`
  },
  // summon (Who, Target, Battle, {name, stat ,summoned}) {
  //   return `**${Who.Name}** used \`${name}\` - summoned ${summoned} and dealed ${!Who.TotalDamage ? `no damage` : `**${Who.TotalDamage}** ${(Who.CriticalDamage) ? `${Icon.crit} (x${(Who.TotalDamage / Who.Damage).toFixed(2)})` : ''} ${Icon[stat]} damage${Who.TotalDamage > 1 ? "s" : ''} to **${Target.Name}**`}`

    
  // },
}