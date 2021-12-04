const { Structures } = require('discord.js')
const db = require('../Databases/mongo.js')
const guildCol = db.collection('guild')

class Guild extends Structures.get("Guild") {
    constructor(client, data) {
      super(client, data)
    }
    async setPrefix(prefix) {
      await guildCol.updateOne({
        id: this.id,
      },
      {
        $set: {
          id: this.id,
          prefix: prefix
        }
      },
      {
        upsert: true
      })
    }
    async getPrefix() {
      const guildInfo = await guildCol.findOne({
        id: this.id
      },
      {
        prefix: 1
      })
      return (guildInfo) ? guildInfo.prefix : process.env.PREFIX
    }
  }

Structures.extend('Guild', () => Guild)