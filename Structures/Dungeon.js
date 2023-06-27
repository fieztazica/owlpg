const Search = require('../Utils/Search.js')
module.exports = {
  normal : [
    {
      floor : 0,
      monsters : [
        Search.monsters('Water Slime', 'easy')
      ],
      items : []
    },
    {
      floor : 1,
      monsters : [
        Search.monsters('Goblin', 'easy'),
        Search.monsters('Water Slime', 'easy')
      ]
    },
    {
      floor : 2,
      monsters : [
        Search.monsters('Goblin', 'easy')
      ]
    },
    {
      floor : 3,
      monsters : [
        Search.monsters('Dragon', 'hard')
      ]
    },
  ],
  bosses : [

  ]
}