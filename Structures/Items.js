
module.exports = {
  helmet : [
    {
      name: 'Odyssey Helmet',
      type : 'helmet',
      classes: [
        'Assassin'
      ],
      cost: 75000,
      stats: {    
        def : +5,
        hp : +50,
        crit: +100,
        atk: +5
      },
    },
    {
      name: 'Vikings Helmet',
      type : 'helmet',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 100,
      stats: {    
        def : +1,
        hp : +10,
      },
    },
    {
      name: 'Rusty Helmet',
      type : 'helmet',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 250,
      stats: {    
        def : +10,
        hp : +50,
      },
    },
    {
      name: 'Angler Hat',
      type : 'helmet',
      classes: [
        'Fisher'
      ],
      cost: 100,
      stats: {    
        luck : +1,
        spd : +1,
      },
    },
      {
      name: 'Witch Hat',
      type : 'helmet',
      classes: [
        'Witch'
      ],
      cost: 100,
      stats: {    
        mp : +50,
      },
    },
    {
      name: 'Face Mask',
      type : 'helmet',
      classes: [
        'Assassin'
      ],
      cost: 100,
      stats: {    
        spd : +1,
        crit : +1,
      },
    },
  ],
  chestplate : [
    {
      name: 'Angler Vest',
      type : 'chestplate',
      classes: [
        'Fisher'
      ],
      cost: 125,
      stats: {
        def : +3,
        luck : +1,
      },
    },
    {
      name: 'Odyssey Chestplate',
      type : 'chestplate',
      classes: [
        'Assassin'
      ],
      cost: 125000,
      stats: {
        res : +45,
        hp: +20,
        crit: +100,
        atk: +5
      },
    },
    {
      name: 'Vikings Chestplate',
      type : 'chestplate',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 125,
      stats: {
        def : +4,
        spd : -1,
      },
    },
    {
      name: 'Rusty Chestplate',
      type : 'chestplate',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 300,
      stats: {
        def : +25,
        spd : -5,
      },
    },
    {
      name: 'Witch Cape',
      type : 'chestplate',
      classes: [
        'Witch'
      ],
      cost: 125,
      stats: {
        def : +2,
        res : +2,
      },
    },
        {
      name: 'Light Armor',
      type : 'chestplate',
      classes: [
        'Assassin','Fighter'
      ],
      cost: 125,
      stats: {
        def : +2,
        spd : +2,
      },
    },
  ],
  leggings : [
    {
      name: 'Witch Pants',
      type : 'leggings',
      classes: [
        'Witch'
      ],
      cost: 100,
      stats: {
        def : +1,
        magic : +1,
      },
    },
    {
      name: 'Odyssey Leggings',
      type : 'leggings',
      classes: [
        'Assassin'
      ],
      cost: 100000,
      stats: {
        def : +100,
        magic : +50,
        crit: 100
      },
    },
    {
      name: 'Rusty Pants',
      type : 'leggings',
      classes: [
        'Fighter'
      ],
      cost: 250,
      stats: {
        def : +10,
        magic : +5,
      },
    },
    {
      name: 'Angler Pants',
      type : 'leggings',
      classes: [
        'Fisher'
      ],
      cost: 100,
      stats: {
        def : +1,
        luck : +1,
      },
    },
    {
      name: 'Trousers',
      type : 'leggings',
      classes: [
        'Assassin','Fighter'
      ],
      cost: 100,
      stats: {
        def : +1,
        spd : +1,
      },
    },
  ],
  boots : [
    {
      name: 'Vikings Boots',
      type : 'boots',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 75,
      stats: {
        def : +1,
        spd : +1,
      },
    },
    {
      name: 'Rusty Boots',
      type : 'boots',
      classes: [
        'Tanker', 'Fighter'
      ],
      cost: 225,
      stats: {
        def : +10,
        spd : +5,
      },
    },
    {
      name: 'Angler Boots',
      type : 'boots',
      classes: [
        'Fisher'
      ],
      cost: 75,
      stats: {
        luck : +1,
        spd : +1,
      },
    },
    {
      name: 'Witch Boots',
      type : 'boots',
      classes: [
        'Witch'
      ],
      cost: 75,
      stats: {
        mp : +1,
        spd : +1,
      },
    },
    {
      name: 'Odyssey Boots',
      type : 'boots',
      classes: [
        'Assassin'
      ],
      cost: 75000,
      stats: {
        mp : +100,
        spd : +10,
        crit: +50
      },
    },
    {
      name: 'Sandals',
      type : 'boots',
      classes: [
        'Assassin','Fighter'
      ],
      cost: 75,
      stats: {
        crit : +1,
        spd : +1,
      },
    },
  ],
  weapon : [
    {
      name: 'Dagger',
      type : 'weapon',
      classes: [
        'Hunter', 'Assassin'
      ],
      cost: 25,
      stats: {
        crit : 1,
        spd : 1,
      },
    },
    {
      name: 'Excalibur',
      type : 'weapon',
      classes: [
        'Fighter'
      ],
      cost: 250000,
      stats: {
        atk : 1000,
        magic : 1000,
      },
    },
    {
      name: 'Trinity',
      type : 'weapon',
      classes: [
        'Fighter'
      ],
      cost: 25000000,
      stats: {
        atk : 15000,
        magic : 35000,
        crit: 1000,
        def: 500,
        hp: 5000
      },
    },
    {
      name: 'Odyssey Dagger',
      type : 'weapon',
      classes: [
        'Assassin'
      ],
      cost: 250000,
      stats: {
        atk : 250,
        crit : 200,
      },
    },
    {
      name: 'Sword',
      type : 'weapon',
      classes: [
        'Hunter', 'Fighter', 'Tanker', 'Assassin'
      ],
      cost: 25,
      stats: {
        atk : 2,
      },
    },
    {
      name: 'Handy Sword',
      type : 'weapon',
      classes: [
        'Hunter', 'Fighter', 'Tanker', 'Assassin'
      ],
      cost: 500,
      stats: {
        atk : 45,
      },
    },
    {
      name: 'Rusty Sword',
      type : 'weapon',
      classes: [
        'Hunter', 'Fighter', 'Tanker', 'Assassin'
      ],
      cost: 500,
      stats: {
        atk : 30,
        magic: 10,
        crit: 5
      },
    },
    {
      name: 'Lava Sword',
      type : 'weapon',
      classes: [
        'Hunter', 'Fighter', 'Tanker', 'Assassin'
      ],
      cost: 500,
      stats: {
        atk : 20,
        magic: 25
      },
    },
    {
      name: 'Wand',
      type : 'weapon',
      classes: [
        'Witch'
      ],
      cost: 25,
      stats: {
        magic : 2,
      },
    },
    {
      name: 'Rusty Wand',
      type : 'weapon',
      classes: [
        'Witch'
      ],
      cost: 500,
      stats: {
        magic : 45,
        crit : 5
      },
    },
    {
      name: 'Shield',
      type : 'weapon',
      classes: [
        'Fighter', 'Tanker'
      ],
      cost: 25,
      stats: {
        def : 1,
        res : 1,
      },
    },
    {
      name: 'Rusty Shield',
      type : 'weapon',
      classes: [
        'Fighter', 'Tanker'
      ],
      cost: 500,
      stats: {
        def : 20,
        res : 20,
        crit : 5
      },
    },
    {
      name : 'Bow',
      type : 'weapon',
      classes : [
        'Hunter'
      ],
      cost : 25,
      stats : {
        luck : 1,
        crit : 1,
      }
    },
    {
      name : 'Rod',
      type : 'weapon',
      classes : [
        'Fisher'
      ],
      cost : 25,
      stats : {
        luck : 1,
        spd : 1,
      }
    },
    {
      name : 'Stick',
      type : 'weapon',
      classes : ['All'],
      cost : 10,
      stats : {
        atk : 1,
      }
    },
    {
      name : 'Rainbow Sword',
      type : 'weapon',
      classes : ['All'],
      cost : 1000000,
      stats : {
        atk : 1000,
        magic : 1000,
        crit : 1000,
        def : 1000,
        res : 1000,
      }
    },
  ],
  material : [
    {
      name: 'Wooden Log',
      type : 'material',
      cost: 250,
      amount : 1,
    },
  ],
  consumable : [
    {
      name: 'Health Potion',
      type : 'consumable',
      cost: 200,
      stats : {
        hp : 10,
      },
      amount : 1
    },
  ],
  color: [
    {
      name: "RANDOM",
      type: 'color',
      cost: 25000000,
    },
    {
      name: "PURPLE",
      type: 'color',
      cost: 50000,
    },
    {
      name: "RED",
      type: 'color',
      cost: 100000,
    },
    {
      name: "GREEN",
      type: 'color',
      cost: 100000,
    },
    {
      name: "BLUE",
      type: 'color',
      cost: 50000,
    },
    {
      name: "AQUA",
      type: 'color',
      cost: 50000,
    },
    {
      name: "NAVY",
      type: 'color',
      cost: 50000,
    },
    {
      name: "YELLOW",
      type: 'color',
      cost: 100000,
    },
    {
      name: "GOLD",
      type: 'color',
      cost: 50000,
    },
    {
      name: "ORANGE",
      type: 'color',
      cost: 50000,
    },
    {
      name: "GREY",
      type: 'color',
      cost: 50000,
    },
    {
      name: "BLACK",
      type: 'color',
      cost: 50000,
    },
    {
      name: "WHITE",
      type: 'color',
      cost: 100000,
    },
    {
      name: "BLURPLE",
      type: 'color',
      cost: 100000,
    },
    {
      name: "FUSCHIA",
      type: 'color',
      cost: 100000,
    },
  ],
  title: [
    {
      name: "Catch me if you can",
      type: 'title',
      cost: 50000,
    },
    {
      name: "La vie en rose",
      type: 'title',
      cost: 100000,
    },
    {
      name: "The Guy",
      type: 'title',
      cost: 100000,
    },
    {
      name: "BADASS",
      type: 'title',
      cost: 1500000,
    },
    {
      name: "Lady Killer",
      type: 'title',
      cost: 1500000,
    },
    {
      name: "Captain Captcha",
      type: 'title',
      cost: 1500000,
    },
    {
      name: "Unstoppable",
      type: 'title',
      cost: 5000,
    },
    {
      name: "I'm Rich",
      type: 'title',
      cost: 500000000,
    },
    // {
    //   name: "Release Player",
    //   type: 'title',
    //   cost: 5,
    // },
  ],
}