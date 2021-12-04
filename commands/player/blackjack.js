const blackjack = require("../../Blackjack/index")
module.exports = {
    name: 'blackjack',
    aliases: ["bj"],
    category: 'Player',
    utilisation: '{prefix}blackjack',
    wait: false,
    
    async execute(bot, message) {
      
      let game = await blackjack(bot, message)
      
      switch (game) {
        case "WIN":
          
          break
        case "LOSE":

          break
        default:
          return
      }
      
    },
};
