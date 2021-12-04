const Icon = require('../Constants/Icon')
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
module.exports = {
  healthBar: HealthBar
}