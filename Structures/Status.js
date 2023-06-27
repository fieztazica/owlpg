const Icon = require('./Icons')
const Bar = Icon.Bar
const status = (level) => `${Icon.level} **Level ${level}**\n`

const HealthBar = (Current, Max) => {
    const MaxEmoji = 8
    const HalfEmoji = Math.round(MaxEmoji / 2)
    const Percent = Current / Max
    const Amount = Math.round(Percent * MaxEmoji)
    if (Current <= 0 && Amount === 0)
        return Bar.Empty.Left + Bar.Empty.Mid.repeat(MaxEmoji - 2) + Bar.Empty.Right
    if (Current > 0 && Amount === 0)
        return Bar.Red.Left + Bar.Empty.Mid.repeat(MaxEmoji - 2) + Bar.Empty.Right
    if (Current === Max || Amount === MaxEmoji)
        return Bar.Green.Left + Bar.Green.Mid.repeat(MaxEmoji - 2) + Bar.Green.Right
    if (Amount < HalfEmoji)
        return Bar.Yellow.Left + Bar.Yellow.Mid.repeat(Amount - 1) + Bar.Empty.Mid.repeat(MaxEmoji - 1 - Amount) + Bar.Empty.Right
    return Bar.Green.Left + Bar.Green.Mid.repeat(Amount - 1) + Bar.Empty.Mid.repeat(MaxEmoji - 1 - Amount) + Bar.Empty.Right
}
const ManaBar = (Current, Max) => {
    const MaxEmoji = 8
    const HalfEmoji = Math.round(MaxEmoji / 2)
    const Percent = Current / Max
    const Amount = Math.round(Percent * MaxEmoji)
    if (Current <= 0 || Amount === 0)
        return Bar.EmptyMana.Left + Bar.EmptyMana.Mid.repeat(MaxEmoji - 2) + Bar.EmptyMana.Right
    if (Current === Max || Amount === MaxEmoji)
        return Bar.Mana.Left + Bar.Mana.Mid.repeat(MaxEmoji - 2) + Bar.Mana.Right

    return Bar.Mana.Left + Bar.Mana.Mid.repeat(Amount - 1) + Bar.EmptyMana.Mid.repeat(MaxEmoji - 1 - Amount) + Bar.EmptyMana.Right
}
const fullStatus = [
  {
    name : 'Default',
    execute (Who) {
      return status(Who.Level) + HealthBar(Who.HP, Who.MaxHP) + `\n**${Icon.hp} _${Who.HP}_/${Who.MaxHP}**\n` + ManaBar(Who.MP, Who.MaxMP) + `\n${Icon.mp} **_${Who.MP}_/${Who.MaxMP}**`
    
    },
  },
  {
    name : 'Minimal',
    execute (Who) {
      return `**HP** : _${Who.HP}_/${Who.MaxHP}\n**MP** : _${Who.MP}_/${Who.MaxMP}`
    },
  },
]
module.exports = (Who, theme = 'Default') => fullStatus.find((e) => e.name === theme).execute(Who)