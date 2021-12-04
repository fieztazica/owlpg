const weathers = require('../../Constants/Weather.js')
module.exports = class {
  constructor(name) {
    this.name = name
    this.info = weathers[name.toUpperCase()]
  }
  toField() {
    return {
      name: 'Weather',
      value: this.name,
      inline: true,
    }
  }
}