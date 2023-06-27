
module.exports = {
  emojis: {
    success: [
      "<:Cool_Finger_Guns:852818433002438686>",
      "<a:clappypepe:852756175752658974>",
      "<a:vibecat:852756181822865408>",
      "<a:_pogrow:852756177678630912>",
      "<a:party_pug_dance:852756181491646534>"
    ],
    
    fail: [
      "<a:BonkHammer:852955161084166164>",
      "<:_PepeBlanket:852818107759067137> ",
      "<a:bongopepe:852815592691990569> ",
      "<a:eto:852957041408213002>"
    ]
  },
  quotes: [
    "Battle with your friend will receive a good amount of owlet than battle with monsters.",
    "Earn more owlet to upgrade your equipment or buy things.",
    "You can try you luck with blackjack, cointoss and so on.",
    "You can change your Battle theme.",
    "Once your level ups, you will have 5 extra points to upgrade your skill.",
    "Equipments are diversity, they can be used by many other classes."
  ],
  discord: {
    botid: process.env.BOT_ID,
    prefix: process.env.PREFIX,
    token: process.env.TOKEN,
    activity: {
      ////servers(bot) {return `${process.env.PREFIX}help | serving ${bot.guilds.cache.size} servers`},
      name(bot){return [
        `${process.env.PREFIX}help | fun stuff`,
        `${process.env.PREFIX}help | I'm not finished yet`,
        `${process.env.PREFIX}help | serving ${bot.guilds.cache.size} servers`,
        `${process.env.PREFIX}help | @${bot.user.username} if you forget sth`,
      ]} ,
      stt: `${process.env.PREFIX}help | Thanks for using me`,
      type: 1,
    },
    
    version: 0.0
  },

};