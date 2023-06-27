const Items = require('../Structures/Items.js')
const Monsters = require('../Structures/Monsters.js')
module.exports = {
  equipment({name, type}) {
    if (!type) {
      let results = []
      Object.keys(Items).forEach((type) => {
        const found = Items[type].find((item) => name.toLowerCase() === item.name.toLowerCase())
        if (found) results.push(found) 
      })
      if (!results[0]) return undefined
      else return results[0]
    }
    if (!name) return Items[type]
    return Items[type].find((item) => item.name.toLowerCase() === name.toLowerCase())
  },
  items ({name , type}) {
    if (!type) {
      let results = []
      Object.keys(Items).forEach((type) => {
        const found = Items[type].find((item) => name.toLowerCase() === item.name.toLowerCase())
        if (found) results.push(found) 
      })
      if (!results[0]) return undefined
      else return results[0]
    } else {
      if (!name) return Items[type]
      return Items[type].find((item) => item.name.toLowerCase() === name.toLowerCase())
    }
    
  },
  monsters(n, d) {
    if (!d) {
      return Monsters.easy.find((monster) => monster.name.toLowerCase() === n.toLowerCase()) 
      || Monsters.medium.find((monster) => monster.name.toLowerCase() === n.toLowerCase())
      || Monsters.hard.find((monster) => monster.name.toLowerCase() === n.toLowerCase())
    }
    return Monsters[d].find((monster) => monster.name.toLowerCase() === n.toLowerCase())
  }
}