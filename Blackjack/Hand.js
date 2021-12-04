module.exports = class {
  constructor(cards = []) {
    this.cards = cards
  }
  draw(deck, num = 1) {
    for (let i = 0; i < num; i++) {
      const card = deck.shift()
      // deck.push(card)
      this.cards.push(card)
    }
  }
  get point() {
    let p = this.cards.reduce((p, c) => p + c.point, 0)
    let i = this.numberOfAces
    while (p > 21 && i-- > 0)
      p -= 10
    return p
  }
  isBanban() {
    return this.numberOfCards === 2 && this.numberOfAces === 2
  }
  isBlackjack() {
    return this.numberOfCards === 2 
    && this.numberOfAces === 1 
    && this.numberOf10PCards === 1
  }
  get numberOfAces() {
    return this.cards.filter((card) => card.isAce()).length
  }
  get numberOf10PCards() {
    return this.cards.filter(card => card.point === 10).length
  }
  get numberOfCards() {
    return this.cards.length
  }
  stay() {
    this.didStay = true
  }

  isBusted() {
    return this.point > 21
  }
  is5D() {
    return this.numberOfCards == 5 && this.point <= 21
  }
  is21P() {
    return this.point === 21
  }
  isStayable() {
    return this.point >= 15
  }
  isHitable() {
    return this.point <= 21 && this.numberOfCards < 5
  }
}
