const Icons = require('./Icons.js')
const Items = require('../Utils/Search.js')
module.exports = {
  //startUser(Class[Figther]) //total point 10
  fighter : {
    name : 'Fighter',
    description: "Most basic class to redeem.",
    icon: Icons.Classes.fighter,
    weapon: Items.equipment({name : 'Sword', type : 'weapon'}),
    stats: {
      hp : 100,
      mp : 100,
      luck: 1,
      atk: 5,
      magic: 1,
      def: 5,
      res : 1,
      reg : 2,
      spd : 2,
      crit : 1
    },
    skills: {
      earlyGame : ['Mana Converter (HP)'],
      midGame : ['Normal Attack', 'Self Healing']
    },
  },
  assassin : {
    name : 'Assassin',
    description: "A real assassin is a silent shadow.",
    icon: Icons.Classes.assassin,
    weapon: Items.equipment({name : 'Dagger', type : 'weapon'}),
    stats: {
      hp : 100,
      mp : 100,
      luck: 1,
      atk: 4,
      magic: 4,
      def: 1,
      res : 1,
      reg : 1,
      spd : 3,
      crit : 3
    },
    skills: {
      earlyGame : ['Weakspot'],
      midGame : ['Normal Attack', 'Back Slash']
    },
  },
  witch : {
    name : 'Witch',
    description: "Witches are powerful with their wand.",
    icon: Icons.Classes.witch,
    weapon: Items.equipment({name : 'Wand', type : 'weapon'}),
    stats: {
      hp : 100,
      mp : 100,
      luck: 1,
      atk: 1,
      magic: 5,
      def: 1,
      res : 5,
      reg : 2,
      spd : 1,
      crit : 2
    },
    skills: {
      earlyGame : ['Magic Membrane'],
      midGame : ['Normal Attack', 'Fire Ball']
    },
  },
  hunter : {
    name : 'Hunter',
    description: "The hero of the jungle.",
    icon: Icons.Classes.hunter,
    weapon: Items.equipment({name : 'Bow', type : 'weapon'}),
    stats: {
      hp : 100,
      mp : 100,
      luck: 5,
      atk: 4,
      magic: 1,
      def: 2,
      reg : 1,
      res : 1,
      spd : 3,
      crit : 1
    },
    skills: {
      earlyGame : ['Set Trap'],
      midGame : ['Normal Attack', 'Godlike Arrow']
    },
  },
  fisher : {
    name : 'Fisher',
    description: "Fishers need lots of luck.",
    icon: Icons.Classes.fisher,
    weapon: Items.equipment({name : 'Rod', type : 'weapon'}),
    stats: {
      hp : 100,
      mp : 100,
      luck: 5,
      atk: 1,
      magic: 4,
      def: 1,
      res : 2,
      reg : 1,
      spd : 2,
      crit : 2
    },
    skills: {
      earlyGame : ['Throwing Rod'],
      midGame : ['Normal Attack', 'Fish Bait']
    },
  },
  tanker : {
    name : 'Tanker',
    description: "Exactly like his name, the strongest guy.",
    icon: Icons.Classes.tanker,
    weapon: Items.equipment({name : 'Shield', type : 'weapon'}) ,
    stats: {
      hp : 100,
      mp : 100,
      luck: 1,
      atk: 1,
      magic: 1,
      def: 5,
      res : 5,
      reg : 3,
      spd : 1,
      crit : 1
    },
    skills: {
      earlyGame : ['Energy Charge'],
      midGame : ['Normal Attack', 'Shield Attack']
    },
  },
}