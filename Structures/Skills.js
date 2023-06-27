const CalcDamage = (AttackStat, DefenseStat) => Math.ceil(AttackStat / (1 + DefenseStat / 10))
const Random = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min
const Icon = require('./Icons')
const BattleLog = require('./BattleLog')
module.exports = {
  earlyGame: [
    {
      classes : ['Hunter', 'Assassin'],
      name: 'Weakspot',
      description: 'Reduce the target DEF',
      type: 'debuff',
      stat : 'def',
      cooldown: -2,
      mana: 0,
      action: "reduce",
      execute(Who, Target, Battle) {
        Target.DEF -= 2
        if (Target.DEF < 0) Target.DEF = 0
      },
    },
    {
      classes : ['Tanker'],
      name: 'Energy Charge',
      description: 'Increase MP equal your Regen',
      type: 'buff',
      stat : 'MP',
      cooldown: -2,
      mana: 0,
      action: "reduce",
      execute(Who, Target, Battle) {
        Who.MP += Who.Regen
        if (Who.MP > Who.MaxMP) Who.MP = Who.MaxMP
      },
    },
    {
      classes : ["Hunter", "Assassin", "Fighter"],
      name: 'Mana Converter (ATK)',
      description: 'Convert your 10% MP to ATK',
      type: 'buff',
      stat : 'atk',
      cooldown: -2,
      mana: 0,
      action: "convert MP to ATK",
      execute(Who, Target, Battle) {
        Who.ATK += Math.round(Who.MP / 10)
        Who.MP = 0
      },
    },
    {
      classes : ["Hunter","Assassin", "Fighter"],
      name: 'Double Crit',
      description: 'Double your Critical',
      type: 'buff',
      stat : 'crit',
      cooldown: -2,
      mana: 0,
      action: "double critical",
      execute(Who, Target,Battle) {
        Who.Crit *= 2
      }
    },
    // {
    //   classes : ["Witch", "Assassin"],
    //   name: 'Double Magic',
    //   type: 'buff',
    //   cooldown: -2,
    //   mana: 0,
    //   stat : 'magic',
    //   description: 'Double your Magic',
    //   execute(Who, Target, Battle) {
    //     Who.Magic *= 2
    //   }
    // },
    {
      classes : ["Witch", "Fighter", "Tanker"],
      name: 'Mana Converter (HP)',
      type: 'buff',
      stat : 'hp',
      cooldown: -2,
      mana: 0,
      description: 'Convert your MP to HP',
      execute(Who, Target, Battle) {
        Who.MaxHP += Who.MP
        Who.HP = Who.MaxHP
        Who.MP = 0
      },
    },
    {
      classes : ["Witch"],
      name: 'Magic Membrane',
      type: 'buff',
      stat : 'magic',
      cooldown: -2,
      mana: 0,
      description: 'increase 20% DEF',
      execute(Who, Target, Battle) {
        Who.DEF += Math.round(Who.DEF / 5)
      },
    },
    {
      classes : ["Hunter"],
      name: 'Set Trap',
      type: 'debuff',
      stat : 'hp',
      cooldown: -2,
      mana: 0,
      description: 'decrease target\'s hp (10 - 20 %)',
      execute(Who, Target, Battle) {
        Target.HP -= Math.floor(Target.HP * Random(10,20) / 100) 
        if (Target.HP < 0) Target.HP = 1
      },
    },
    {
      classes : ["Fisher"],
      name: 'Throwing Rod',
      type: 'debuff',
      cooldown: -2,
      stat : 'crit',
      mana: 0,
      description: 'decrease target\'s Crit (10 - 20 %)',
      execute(Who, Target, Battle) {
        Target.Crit -= Math.floor(Target.Crit * Random(10,20) / 100) 
        if (Target.Crit < 0) Target.Crit = 0
      },
    },
    {
      classes : ['Tanker', 'Fighter'],
      name: 'Blood Armor',
      description: 'Sacrifice 25% HP to gain 20% DEF and 20% RES',
      type: 'buff',
      stat : 'def',
      cooldown: -2,
      mana: 0,
      execute(Who, Target, Battle) {
        Who.HP -= Math.floor(Who.HP / 4) 
        Who.DEF += Math.round(Who.DEF / 5)
        Who.RES += Math.round(Who.RES / 5)
      },
    },
  ],
  midGame: [
    {
      classes : [],
      name: 'Normal Attack',
      type: 'attack',
      stat : 'atk',
      cooldown: -1,
      mana: 0,
      description: 'Just attack',
      execute(Who, Target, Battle) {
        Who.Damage = CalcDamage(Who.ATK, Target.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log = BattleLog.attack(Who, Target, Battle, { name : 'Normal Attack', stat : 'atk'})
        Who.CriticalDamage = 0
        if (Who.Regen) {
            const LastHP = Who.HP
            Who.HP += Who.Regen
            let Healed = Who.Regen
            if (Who.HP > Who.MaxHP) {
                Who.HP = Who.MaxHP
                Healed = Who.MaxHP - LastHP
            }
            if (Healed)
                Battle.Log += ` and healed **${Healed}** ${Icon.hp}`
        }
      },
    },
    {
      classes : ["Assassin", "Hunter"],
      name: 'Back Slash',
      type: 'attack',
      stat : 'atk',
      cooldown: 3,
      mana: 30,
      description: 'Attack with x2 ATK',
      action: "dealed ",
      execute(Who, Target, Battle) {
        Who.MP -= 30
        Who.Damage = 2 * CalcDamage(Who.ATK, Target.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Back Slash', stat : 'atk'})
        Who.CriticalDamage = 0
      },
    },
    {
      classes : ["Tanker", "Fighter"],
      name: 'Body Break',
      type: 'attack',
      stat : 'def',
      cooldown: 3,
      mana: 30,
      description: `Deal true damage equal the different between two battler's DEF`,
      execute(Who, Target, Battle) {
        Who.MP -= 30
        const different = Who.DEF - Target.DEF
        Who.Damage = (different >  1) ? different * 2 : 0
        Who.TotalDamage = Who.Damage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Body Break', stat : 'def'})
      },
    },
    {
      classes : ["Witch"],
      name: 'Fire Ball',
      type: 'attack',
      stat : 'magic',
      cooldown: 2,
      mana: 10,
      description: 'Cast Fire ball to your target',
      action: "dealed",
      execute(Who, Target, Battle) {
        Who.MP -= 10
        Who.Damage = CalcDamage(Who.Magic, Target.RES)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Fire Ball', stat : 'magic'})
        Who.CriticalDamage = 0
      },
    },
    //Nuclear Pulse
    {
      classes : ["Monster"],
      name: 'Nuclear Pulse',
      type: 'attack',
      stat : 'magic',
      cooldown: 5,
      mana: 100,
      description: 'A Nuclear Pulse comes out from your mouth (An x10 Magic attack)',
      execute(Who, Target, Battle) {
        Who.MP -= 10
        Who.Damage = CalcDamage(Who.Magic * 10, Target.RES)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Nuclear Pulse', stat : 'magic'})
        Who.CriticalDamage = 0
      },
    },
    {
      classes : ["Fighter", "Tanker"],
      name: 'Self Healing',
      type: 'buff',
      stat : 'hp',
      cooldown: 4,
      mana: 10,
      description: 'Heal 20% lost HP',
      action: "healed 20% lost HP",
      execute(Who, Target, Battle) {
        Who.MP -= 10
        const LastHP = Who.HP
        Who.Healed = Math.round((Who.MaxHP - Who.HP) / 5)
        Who.HP += Who.Healed
        if (Who.HP > Who.MaxHP) {
            Who.HP = Who.MaxHP
            Who.Healed = Who.MaxHP - LastHP
        }
        Battle.Log = BattleLog.heal(Who, Target, Battle, { name : 'Self healing', note : `[**20 %** lost ${Icon.hp}]`})
        Who.CriticalDamage = 0
        
      },
    },
    {
      classes : ["Tanker", "Fighter"],
      name: 'Store Energy',
      cooldown: 2,
      type : 'buff',
      stat : 'atk',
      mana: 0,
      description: 'Increase 50% of current ATK everytime this skill casted',
      action: 'ATK increasing...',
      execute(Who, Target, Battle) {
        const AddATK = Math.round(Who.ATK / 2)
        Who.ATK += AddATK
        Battle.Log = BattleLog.buff(Who, Target, Battle, { name : 'Store Energy', stat : 'atk', value : AddATK})
      },
    },
    {
      classes : ["Witch"],
      name: 'Water Gun',
      type: 'attack',
      stat : 'magic',
      cooldown: 2,
      mana: 10,
      description: 'Cast some water bullets to your target',
      action: "dealed",
      execute(Who, Target, Battle) {
        Who.MP -= 10
        Who.Damage = CalcDamage(Who.ATK, Target.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log = BattleLog.attack(Who, Target, Battle, { name : 'Water Gun', stat : 'magic'})
        Who.CriticalDamage = 0
      },
    },
    {
      classes : ["Tanker", "Fighter"],
      name: 'Shield Attack',
      type: 'attack',
      stat : 'def',
      cooldown: 2,
      mana: 10,
      description: 'Attack the target with the DEF',
      action: "dealed",
      execute(Who, Target, Battle) {
        
        Who.MP -= 10
        Who.Damage = CalcDamage(Who.DEF, Target.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log = BattleLog.attack(Who, Target, Battle, { name : 'Shield Attack', stat : 'def'})
        Who.CriticalDamage = 0
      },
    },
    {
      classes : ["Fisher"],
      name: 'Fish Bait',
      type: 'attack',
      stat : 'atk',
      cooldown: 2,
      mana: 10,
      description: 'Throw the fish bait to target, fish will attack for you ._.',
      action: "look fish deal",
      execute(Who, Target, Battle) {
        Who.MP -= 10
        Who.Damage = CalcDamage(Math.round(Random(1, 3) * Who.ATK), Who.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Fish Bait', stat : 'atk', summoned : 'fish'})
        Who.CriticalDamage = 0
        
      },
    },
    {
      classes : ["Hunter"],
      name: 'Godlike Arrow',
      type: 'attack',
      stat : 'atk',
      cooldown: 4,
      mana: 40,
      description: 'Super arrow!!!',
      action : 'shot and dealed',
      execute(Who, Target, Battle) {
        Who.MP -= 40
        Who.Damage = CalcDamage(3 * Who.ATK, Who.DEF)
        Who.CriticalDamage = (Who.CriticalRate > Random) ? Math.round(Who.Damage * (1 + Who.Crit / 100)) : 0
        Who.TotalDamage = Who.Damage + Who.CriticalDamage
        Target.HP -= Who.TotalDamage
        Battle.Log =  BattleLog.attack(Who, Target, Battle, { name : 'Godlike Arrow', stat : 'atk'})
        Who.CriticalDamage = 0
        
      },
    },
    //
  ]

}