const Card = require("./Card")
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const SUITS = ["♥", "♦", "♠", "♣"]



module.exports = class {
  constructor(cards = this.newDeck()) {
    this.cards = cards
  }
  get numberOfCards() {
    return this.cards.length
  }
  newDeck() {
    return SUITS.flatMap((suit) => VALUES.map((value) => new Card(value, suit)))
  }
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[i]
      this.cards[i] = this.cards[newIndex]
      this.cards[newIndex] = oldValue
    }
  }
  shift() {
    return this.cards.shift()
  }
  pop() {
    return this.cards.pop()
  }
  push(card) {
    this.cards.push(card)
  }
}
