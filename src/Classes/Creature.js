const { healthBar } = require('../../Utils/status.js')
const element = require('../../Utils/element.js')
const skill = require('../../Constants/Skill')
module.exports = class {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.stats = data.stats
    this.element = element(data.element)
    this.status = data.status || 'Normal'
    this.skills = data.skills || ['Normal Attack', 'Self Healing']
  }
  incStats(name, amount) {
    if (name.toLowerCase() === 'hp') return incHP(amount)
    if (name.toLowerCase() === 'maxhp') return incHP(amount)
    this.stats[name.toLowerCase()] += amount
    if (this.stats[name.toLowerCase()] < 1) 
      this.stats[name.toLowerCase()] = 1
  }
  incHP(amount) {
    this.stats.hp += amount
    if (this.stats.hp < 0) this.stats.hp = 0
    if (this.stats.hp > this.stats.maxhp) this.stats.hp = this.stats.maxhp
  }
  incMaxHP(amount) {
    this.stats.maxhp += amount
    if (this.stats.maxhp < 0) this.stats.maxhp = 0
    if (this.stats.maxhp < 1) this.stats.maxhp = 1
  }
  setStatus(status) {
    this.status = status
  }
  use(name, opponents) {
    if (name === 'Attack') {
      for (let i = opponents.length - 1; i >= 0; i--) {
        if (opponents[i].stats.hp < 1) continue;
        else {
          opponents[i].incHP(-this.stats.pow)
          break;
        }
      }
      
    } 
  }
  toField() {
    const info = [
      healthBar(this.stats.hp, this.stats.maxhp),
      `*${this.stats.hp}*/**${this.stats.maxhp}**`,
      `Status: ${this.status}`
    ]
    return {
      name: `${this.name} ${this.element.icon}`,
      value: info.join('\n'),
      inline: true
    }
  }
}