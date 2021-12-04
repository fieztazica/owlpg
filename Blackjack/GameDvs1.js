module.exports = class {
  constructor(dealer, player) {
    this.dealer = dealer
    this.player = player
  }
  isWin() {
    return this.dealer.isBusted()
      || (this.dealer.point < this.player.point && this.player.point <= 21)
      || (this.player.is5D() && !this.dealer.is5D())
      || (this.player.is5D() && this.dealer.is5D() && this.player.point < this.dealer.point)
  }
  isDraw() {
    return this.dealer.point === p1.point || (this.dealer.isBusted() && this.player.isBusted())
  }
  get result() {
    if (this.timeout) 
      return "TIMEOUT"
    if (this.isWin()) {
      return "WIN"
      }
    else if (this.isDraw()) {
     return "DRAW"
    }
      
    else {
      return "LOSE"
    }
  }
  setTimeout() {
    this.timeout = true
  }

}