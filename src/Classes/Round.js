// const terrians = require('../../Constants/Terrian.js')
module.exports = class {
  constructor(start, turn) {
    this.value = start || 0
    this.turn = turn || '...'
  }
  setRound(round) {
    this.value = value
  }
  setTurn(turn) {
    this.turn = turn
  }
  toField() {
    return {
      name: `Round ${this.value}`,
      value: this.turn,
      inline: true,
    }
  }
}