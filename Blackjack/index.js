const { MessageEmbed } = require("discord.js")
const Deck = require("./Deck")
const Hand = require("./Hand")
const disbut = require("discord-buttons")
// // Second base 
let games = new Map()

module.exports = async (bot, message) => {
  const already = games.get(message.author.id)

  if (games.has(message.author.id) && already.cID == message.channel.id) return message.reply("**[Error]** There is a blackjack game playing for you.", {
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Forward",
            // url: `https://discord.com/channels/${already.gID}/${already.cID}/${already.mID}`
            url: already.mURL
          }
        ]
      }
    ]
  })

  const d = new Deck()
  d.shuffle()
  const dealer = new Hand()
  const p1 = new Hand()
  let RESULT;

  p1.draw(d, 2)
  dealer.draw(d, 2)

  // let dealerhand = dealer.cards.map((card) => {
  // return "\`" + card.toString() + "\`"
  // }).join(" | ")
  let p1hand = p1.cards.map((card) => {
    return "\`" + card.toString() + "\`"
  }).join(" | ")

  const deckEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL({ dynamic: true }))
    .setDescription("Xì dách")
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

  const staybut = new disbut.MessageButton()
    .setID("stay")
    .setLabel("Stay")
    .setStyle("red")

  const hitbut = new disbut.MessageButton()
    .setID("hit")
    .setLabel("Hit")
    .setStyle("green")

  deckEmbed
    .addField(`?? on ${bot.user.username}\'s hand`, `\`${dealer.cards[0].suit}${dealer.cards[0].value} | ${dealer.cards[1].suit}?\``, true)
    .addField(`${p1.point} on ${message.author.username}\'s hand`, p1hand, true)

  let bt1 = staybut
  let bt2 = hitbut

  if (p1.isBanban() || p1.isBlackjack()) {
    while ((!dealer.isStayable()
      || (dealer.point < p1.point && p1.isHitable())) && dealer.isHitable()) {
      dealer.draw(d)
    }

    bt1.setDisabled(true)
    bt2.setDisabled(true)

    let dealerhand = dealer.cards.map((card) => {
      return "\`" + card.toString() + "\`"
    }).join(" | ")

    deckEmbed.fields[0] = {
      name: `${dealer.point} on ${bot.user.username}\'s hand`,
      value: dealerhand,
      inline: true
    }
    deckEmbed.fields[1] = {
      name: `${p1.point} on ${message.author.username}\'s hand`,
      value: p1hand,
      inline: true
    }

    if (dealer.isBusted()
      || (dealer.point < p1.point && p1.point <= 21)
      || (p1.is5D() && !dealer.is5D())
      || (p1.is5D() && dealer.is5D() && p1.point < dealer.point)) {
      RESULT = "WIN"
      deckEmbed.setTitle("WIN")
    }
    else if (dealer.point === p1.point || (dealer.isBusted() && p1.isBusted())) {
      RESULT = "DRAW"
      deckEmbed.setTitle("DRAW")
    }
    else {
      RESULT = "LOSE"
      deckEmbed.setTitle("LOSE")
    }
  }

  if (!p1.isStayable()) {
    bt1.setDisabled(true)
  }

  let row1 = new disbut.MessageActionRow()
    .addComponents(
      [bt1, bt2]
    )

  let msg = await message.channel.send({
    embed: deckEmbed,
    components: [row1]
  })

  if (RESULT) return RESULT;

  games.set(message.author.id, { gID: msg.guild.id, cID: msg.channel.id, mID: msg.id, mURL: msg.url })

  const filter = f => f.clicker.user.id === message.author.id

  const msgCol = msg.createButtonCollector(filter, { time: 60000 })

  msgCol.on("collect", async btn => {
    btn.reply.defer()

    if (p1.isBanban() || p1.is5D() || p1.isBlackjack()) return msgCol.stop()
    if (p1.cards.length < 5) {
      if (btn.id === "hit") {
        p1.draw(d)
        if (p1.isStayable()) bt1.setDisabled(false)
        // if (!p1.isHitable()) bt2.setDisabled(true)

        if (p1.cards.length >= 5 || p1.is21P() || p1.isBusted() || p1.is5D()) {
          return msgCol.stop()
        }

        p1hand = p1.cards.map((card) => {
          return "\`" + card.toString() + "\`"
        }).join(" | ")

      }
      else if (btn.id === "stay") {
        p1.stay()
        return msgCol.stop()
      }
    }

    deckEmbed.fields[0] = {
      name: `?? on ${bot.user.username}\'s hand`,
      value: `\`${dealer.cards[0].suit}${dealer.cards[0].value} | ${dealer.cards[1].suit}?\``,
      inline: true
    }
    deckEmbed.fields[1] = {
      name: `${p1.point} on ${message.author.username}\'s hand`,
      value: p1hand,
      inline: true
    }

    row1 = new disbut.MessageActionRow()
      .addComponents(
        [bt1, bt2]
      )
    
    msg.edit({
      embed: deckEmbed,
      components: [row1]
    })
    
  })

  msgCol.on("end", (collected, reason) => {
    games.delete(message.author.id)
    if (reason === "time") {
      let dealerhand = dealer.cards.map((card) => {
        return "\`" + card.toString() + "\`"
      }).join(" | ")

      deckEmbed.fields[0] = {
        name: `${dealer.point} on ${bot.user.username}\'s hand`,
        value: dealerhand,
        inline: true
      }
      deckEmbed.fields[1] = {
        name: `${p1.point} on ${message.author.username}\'s hand`,
        value: p1hand,
        inline: true
      }
      deckEmbed.setTitle("TIMEOUT")
      bt1.setDisabled(true)
      bt2.setDisabled(true)
      row1 = new disbut.MessageActionRow()
        .addComponents(
          [bt1, bt2]
        )
      msg.edit({
        embed: deckEmbed,
        components: [row1]
      })

      return RESULT = "TIMEOUT"
    }

    while (!dealer.isStayable()
      || (dealer.point < p1.point && p1.isHitable())) {
      dealer.draw(d)
    }

    let dealerhand = dealer.cards.map((card) => {
      return "\`" + card.toString() + "\`"
    }).join(" | ")

    p1hand = p1.cards.map((card) => {
      return "\`" + card.toString() + "\`"
    }).join(" | ")

    deckEmbed.fields[0] = {
      name: `${dealer.point} on ${bot.user.username}\'s hand`,
      value: dealerhand,
      inline: true
    }
    deckEmbed.fields[1] = {
      name: `${p1.point} on ${message.author.username}\'s hand`,
      value: p1hand,
      inline: true
    }

    if (dealer.isBusted() && !p1.isBusted()
      || (dealer.point < p1.point && p1.point <= 21)
      || (p1.is5D() && !dealer.is5D())
      || (p1.is5D() && dealer.is5D() && p1.point > dealer.point)) {
      RESULT = "WIN"
      deckEmbed.setTitle("WIN")
    }
    else if (dealer.point === p1.point || (dealer.isBusted() && p1.isBusted())) {
      RESULT = "DRAW"
      deckEmbed.setTitle("DRAW")
    }

    else {
      RESULT = "LOSE"
      deckEmbed.setTitle("LOSE")
    }

    bt1.setDisabled(true)
    bt2.setDisabled(true)
    row1 = new disbut.MessageActionRow()
      .addComponents(
        [bt1, bt2]
      )
    msg.edit({
      embed: deckEmbed,
      components: [row1]
    })

  })

  return RESULT
}

function resultCheck(dealer, player) {
  if (dealer.isBusted()
    || (dealer.point < player.point && player.point <= 21)
    || (player.is5D() && !dealer.is5D())
    || (player.is5D() && dealer.is5D() && player.point < dealer.point)) {
    return "WIN"
  }
  else if (dealer.point === player.point || (dealer.isBusted() && player.isBusted())) {
    return "DRAW"
  }
  else {
    return "LOSE"
  }
}