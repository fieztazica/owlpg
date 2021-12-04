const { MessageEmbed } = require('discord.js')

const Log = require('./Log')
const field = require('../../Constants/Field')
module.exports = class {
  constructor(cers, ceds, env, channel) {
    this.cerNum = cers.length || 1
    this.cedNum = ceds.length || 1
    this.cers = cers
    this.ceds = ceds
    this.env = env
    this.channel = channel
    this.cerRowNum = Math.ceil(cers.length / 3)

    const cedRowNum = Math.ceil(ceds.length / 3)
    const TERRIANROWNUM = 1
    const COLUMNNUM = 3
    const rowNum = this.cerRowNum + TERRIANROWNUM + cedRowNum
    this.totalBlock = rowNum * COLUMNNUM
    const envStart = this.cerRowNum * COLUMNNUM
    const cedStart = (rowNum - cedRowNum) * COLUMNNUM
    
    this.field = new MessageEmbed()
      .setTitle('Battle start')
      //.setThumbnail(env[0].getImageURL())
    this.log = new Log()
    this.cp = []
    this.cp.push(...cers)
    for (let i = 0; i <= this.totalBlock; i++) {
      if (i < cers.length)
      {
        this.field.fields[i] = cers[i].toField()
        cers[i].bIndex = i
      } 
      else if (i >= envStart && i < cedStart) 
      {
        this.field.fields[i] = env[i - envStart].toField()
        env[i - envStart].bIndex = i
        this.cp.push(env[i - envStart])
      }
      else if (i >= cedStart && i < cedStart + ceds.length) 
      {
        this.field.fields[i] = ceds[i - cedStart].toField()
        ceds[i - cedStart].bIndex = i
        this.cp.push(ceds[i - cedStart])
      }
      else if (i === this.totalBlock) {
        this.field.fields[i] = this.log.toField()
        this.log.bIndex = i
        this.cp.push(this.log)
      }
      else {
        this.field.fields[i] = field.EMPTY
        this.cp.push(null)
      }
    }

  }
  getField() {
    this.update(this.cp)
    return this.field
  }
  update() {
    [...this.cers, ...this.ceds, ...this.env, this.log]
    .forEach((e) => this.field.fields[e.bIndex] = e.toField())
  }
  async start() {
    let round = 0
    let allSpd = [...this.cers, ...this.ceds]
    .map((e) => e.stats.spd)
    this.setEdit(await this.send())
    while (this.cers.some((cer) => cer.stats.hp > 0) 
        && this.ceds.some((ced) => ced.stats.hp > 0)) {
      this.env[1].value = round
      
      while (allSpd.every((e)=> e !== 0))
      {
        const maxSpd = Math.max(...allSpd)
        const minSpd = Math.min(...allSpd)

        const  maxSpdIndex = allSpd
        .map((spd, index) => {
          if (spd === maxSpd) {
            return index
          }
          else return -1
        })
        .filter((e) => e !== -1)

        const log = []
        maxSpdIndex.forEach((i) => {
          allSpd[i] -= minSpd
          if (i < this.cerNum) {
            this.cp[i].use('Attack', this.ceds)
            log.push(`${this.cp[i].name} uses Attack`)
          }
          else {
            this.cp[i - this.cerNum + this.cerRowNum * 3 + 3].use('Attack', this.cers)
            log.push(`${this.cp[i - this.cerNum + this.cerRowNum * 3 + 3].name} uses Attack`)
          }
        })
        this.log.setLog(log.join('\n'))
        
        
        this.edit()
      }

      
      if (allSpd.some((e) => e === 0)) {
        allSpd = allSpd.map((spd, i) => {
          if (i < this.cerNum) return spd + this.cers[i].stats.spd
          else return spd + this.ceds[i - this.cerNum].stats.spd
        })
      }
      
      
      round++
      
      // console.log(this.cers)
      // console.log(this.ceds)
    }
    this.channel.send(`Round ${round}`)
  }
  round(value) {
  }
  send() {
    return this.channel.send(this.getField())
  }
  setEdit(editMess) {
    this.mess = editMess
  }
  edit() {
    this.mess.edit(this.getField())
  }
}