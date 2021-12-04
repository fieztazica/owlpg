const db = require('../Databases/mongo.js');
const slimy = db.collection('player');
const stats = db.collection('pstats');

Object.defineProperties(String.prototype, {
  plural: {
    value: function (value) {
      return `${value} ${this}${(value>1) ? 's': ''}`
    }
  }
})