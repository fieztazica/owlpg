const terrians = require('../../Constants/Terrian.js')
module.exports = class {
  constructor(name) {
    this.name = name
    this.info = terrians[name.toUpperCase()]
  }
  getImageURL() {
    return this.info.image
  }
  toField() {
    return {
      name: 'Terrian',
      value: this.name,
      inline: true,
    }
  }
}