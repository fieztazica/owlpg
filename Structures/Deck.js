var suits = ["♠️", "♥️", "♦️", "♣️"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


module.exports = class {
  constructor() {
    this.deck = this.shuffle()
    this.hand = new Array()
    this.weight = 0
  }
  createDeck = () =>
  {
    var deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
          var weight = parseInt(values[i]);
          if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
              weight = 10;
          if (values[i] == "A")
              weight = 11;
          var card = { Value: values[i], Suit: suits[x], Weight: weight };
          deck.push(card);
        }
    }
    return deck
  }
  shuffle = () => 
  {
    var deck = this.createDeck()
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck
  }
  hit = () => {
    const card = this.deck.pop()
    this.hand.push(card)
    this.weight += card.Weight
    return card
  }
}