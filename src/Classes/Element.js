const elements = require('../../Constants/Element')
const Icon = require('../../Constants/Icon')
module.exports = class {
  constructor(name) {
    this.name = name
    this.icon = Icon.elements[name.toLowerCase()]
    this.weaker = elements[name.toUpperCase()].weaker
  }
  getMultiplier(defEle) {
    if (this.weaker.includes(defEle)) return 2
    if (elements[defEle.toUpperCase()].weaker.includes(this.name)) return 0.5
  }
}
