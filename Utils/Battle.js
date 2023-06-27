const Icon = require('../Structures/Icons')
const Skills = require('../Structures/Skills')
const { Bar } = require('../Structures/Icons')
const Themes = require('../Structures/Themes')
const Discord = require('discord.js')
const Dex = require('./Dex')
module.exports = {
  async execute(bot, message, Challenger, Challenged) {
    let Winner

    const CalcPercent = (value, max, increasement) => (value) ? max * Math.pow(10, -increasement / value) : 0
    const id = (Who) => (Who.player) ? Who.player.id : Who.name
    const ChangeMana = (Who, percent) => {
      if (Who.MaxMP === Who.MP) return
      Who.MP += Math.round(percent * Who.MaxMP / 100)
      if (Who.MP > Who.MaxMP) Who.MP = Who.MaxMP
    }

    let Battle = {
      Turn: 1,
      FirstTurn: true,
    }
    Battle.Round = Math.ceil(Battle.Turn / 2)
    let First = Dex.battleInfo(Challenger)
    let Second = Dex.battleInfo(Challenged)
    Battle.LastAction = `_**${First.Name}**_ used `


    if (First.EarlySkills[0]) {
      First.EarlySkills.forEach((skill) => {
        skill.execute(First, Second)
      }
      )
      Battle.LastAction += `\`` + First.EarlySkills.map((skill) => skill.name).join('\`, \`') + `\``
    }
    if (!First.EarlySkills[0]) Battle.LastAction += 'nothing'

    Battle.RecentAction = `_**${Second.Name}**_ used `
    if (Second.EarlySkills[0]) {
      Second.EarlySkills.forEach((skill) => {
        skill.execute(Second, First)
      }
      )
      Battle.RecentAction += '\`' + Second.EarlySkills.map((skill) => skill.name).join('\`, \`') + '\`'
    }
    if (!Second.EarlySkills[0]) Battle.RecentAction += 'nothing'

    First.CriticalRate = CalcPercent(First.Crit, 70, 20)
    First.DodgeRate = CalcPercent(First.Speed + First.Luck, 50, 20)
    Second.CriticalRate = CalcPercent((Second.Crit), 70, 20)
    Second.DodgeRate = CalcPercent(Second.Speed + Second.Luck, 50, 20)
    Battle.Log = `${Battle.LastAction}\n${Battle.RecentAction}`
   

    const ChallengerTheme = (Challenger.Profile) ? Challenger.Profile.cus.theme[0] : 'Default'
    let theme = Themes.find((theme) => theme.name === ChallengerTheme)
    let embed = theme.execute(First, Second, Battle)
    const Log = await message.channel.send(embed)
    
    Battle.LastAction = Icon.Loading
    Battle.RecentAction = Icon.Loading
    while (First.HP > 0 && Second.HP > 0) {
      Battle.Round = Math.ceil(Battle.Turn / 2)
      if (First.Speed < Second.Speed && (Battle.Turn % 2)) Battle.FirstTurn = false
      if (Battle.FirstTurn) {
        Dex.turn(First, Second, Battle)
        Battle.FirstTurn = false
      }
      else {
        Dex.turn(Second, First, Battle)
        Battle.FirstTurn = true
      }
      ChangeMana(First, 5)
      ChangeMana(Second, 5)
      if (Battle.Turn > 39) {
        if (First.HP / First.MaxHP >= Second.HP / Second.MaxHP)
          Second.HP = 0
        else First.HP = 0
      }
      if (First.HP <= 0 && Second.HP <= 0) Winner = 0
      if (First.HP <= 0) Winner = 2
      if (Second.HP <= 0) Winner = 1

      embed = theme.execute(First, Second, Battle, embed)
      await bot.sleep(3000)
      Log.edit(embed)
      Battle.Turn++
    }

    return Winner
  }
}