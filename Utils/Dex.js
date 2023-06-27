const Skills = require('../Structures/Skills.js')
const Icon = require('../Structures/Icons')
module.exports = {
  battleInfo(Who) {
    
    let statNames = (Who.Profile) ? Object.keys(Who.Profile.stats) : false
    const equipments = (Who.Profile) ? Who.Profile.equipments : false
    const name = (Who.player) ? Who.player.username : Who.name
    let bonusStat = {}

    const types = Object.keys(equipments)
    types.forEach((type) => {
      if (equipments[type] !== null) {
        const stats = Object.keys(equipments[type].stats)
        stats.forEach((stat) => {
          bonusStat[stat] = equipments[type].stats[stat]
        })
      }
    })
    

    
    const className = (Who.Profile) ? Who.Profile.Class : Who.name
    const stat = (key) => {
      const bonus = bonusStat[key] || 0
      return (Who.Profile) ? Who.Profile.stats[key] + bonus : Who.stats[key]
    }
    const level = (Who.Profile) ? Who.Profile.level : Who.level
    
    const image = (Who.player) ? Who.player.displayAvatarURL({ dynamic: true }) : Who.image
    const skills = (key) =>
      ((Who.Profile) ? Who.Profile.skills[key] : Who.skills[key])
        .map((skillName) =>
          Skills[key]
            .find((skill) =>
              skill.name === skillName
            )
        )
        .sort((WhoSkill, TargetSkill) => TargetSkill.cooldown - WhoSkill.cooldown)
    const info = {
      Name: name,
      Level: level,
      Class: className,
      EarlySkills: skills('earlyGame'),
      MidSkills: skills('midGame'),
      Image: image,
      MaxHP: stat('hp'),
      MaxMP: stat('mp'),
      ATK: stat('atk'),
      Magic: stat('magic'),
      DEF: stat('def'),
      RES: stat('res'),
      Luck: stat('luck'),
      Speed: stat('spd'),
      Crit: stat('crit'),
      Regen: stat('reg'),
      HP: stat('hp'),
      MP: Math.round(stat('mp') / 5)
    }
    
    return info
  },
  
  turn(Who, Target, Battle) {
    const skill = Who.MidSkills.find((skill) => Battle.Round % skill.cooldown === 0 && Who.MP >= skill.mana)
    if (['attack'].includes(skill.type)) {
      const isTargetDodge = (Target.DodgeRate - Who.CriticalRate / 10 > Math.random() * 100) ? true : false
      if (isTargetDodge && Who.Damage) {
        Battle.Log = `**${Target.Name}** used his/her ${Icon.spd} and ${Icon.luck} to dodge **${Who.Name}**'s attack`
      }
      else {
        skill.execute(Who, Target, Battle)
      }
    }
    else if (['debuff', 'buff', 'heal'].includes(skill.type)) {
      skill.execute(Who, Target, Battle)
    } else {

    }
    if (Target.HP < 0) Target.HP = 0
  }
}