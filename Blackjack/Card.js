module.exports = class {
  constructor(value, suit) {
    this.value = value
    this.suit = suit
  }
  toString() {
    return String(this.suit + this.value)
  }
  get point() {
    if (this.isAce())
      return 11
    if (this.isJQK())
      return 10
    return Number(this.value)
  }
  isAce() {
    return this.value === "A"
  }
  isJQK() {
    return ["J", "Q", "K"].includes(this.value)
  }
}