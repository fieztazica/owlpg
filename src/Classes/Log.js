module.exports = class {
  constructor(start) {
    this.log = start || '...'
  }
  setLog(value) {
    this.log = value
  }
  toField() {
    return {
      name: 'Log',
      value: this.log,
      inline: true,
    }
  }
}