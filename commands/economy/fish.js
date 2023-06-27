const User = require('../../Classes/User.js')
const Icons = require('../../Structures/Icons')
const talkedRecently = new Set();  
module.exports = {
  name: 'fish',
  aliases: ['f'],
  category: 'Economy',
  utilisation: '{prefix}fish',
  captcha: true,
  profile: true,
  async execute (bot, message, args) {
    
    const Player = new User(bot, message.author, message)
    let Profile = await Player.getInfo()
    const prefix = await bot.getPrefix(message)
    
    if (!Profile) return message.lineReplyNoMention(`**[ERROR]** You did not start a profile. Please create one by using \`${prefix}start\``)
    
    const small = [
      `Golden Fish`, `Baby Shark`, `Anchovy`, `Clown Fish`, `Pomfret`, `Butterflyfish`, `Guppies`, `Shrimp`, `Swordtail`, `Crab`
    ]

    const medium = [
      `Bullhead`,`Blue tang`, `Shrimp`, `Octopus`, `Lobster`, `King Crab`, `Jellyfish`, `Catfish`
    ]

    const big = [
      `Shark`, `Dolphin`, `Lionfish`, `Killer Whale`, 'Megalodon'
    ]
    const checkCd = await Player.checkCooldown('fish')
    if (!checkCd) await Player.setCooldown('fish')
    else return
    // if (talkedRecently.has(message.author.id)) {
    //   message.lineReply("**[ERROR]** Wait 5 sec before hunting again.");
    // } else {
        // the user can type the command ... your command code goes here :)
        //@owlvernite
        //https://bulbapedia.bulbagarden.net/wiki/Catch_rate
        
        
        const OneHundredPercent = 100
        var p = Math.random() * OneHundredPercent; //Math.random() * OneHundredPercent * Luck < 70 / Luck
        var animal,o,xp,rate,trate;
        // const Level = Profile.level
        const Luck = Profile.stats.luck
        const Level = Profile.level
        const Accuracy = 5
        // const LevelRate = Level 

        /**
         * 5 < Luck < 30
         * 
         * 
         * 
         * Luck = 0
         * BigLuck = 
         * 
         * 
         */

        // const SmallRate = 70 + (Luck)
        // const MediumRate = SmallRate + 20 + (Luck)
        // const BigRate = MediumRate + 5 + (Luck)
        // const MissRate = BigRate + 5 + (Luck)
        const minBigRate = 5
        const maxBigRate = 30

        /**
         * You can use round if you like
         */
        const MissRate = 5
        const BigRate = minBigRate + (maxBigRate - minBigRate) * Math.pow(10, -Accuracy/Luck)
        const MediumRate = 2 * BigRate
        const SmallRate = OneHundredPercent - MissRate - MediumRate - BigRate 
        
        // console.log(`Small ${SmallRate}, Medium ${MediumRate}, Big ${BigRate}, Miss ${MissRate}`)
        const SmallRange = SmallRate
        const MediumRange = SmallRange + MediumRate
        const BigRange = MediumRange + BigRate

        //Random Range from min to max \/
        //Math.floor((Math.random() * (max-min)) + min)
      
        if ( p < SmallRange) {
          animal = small[Math.floor(Math.random()*small.length)];
          rate = SmallRate
          trate = 1
          o = Math.floor(((Math.random() * (2-1)) + 1) * Level);
          xp = Math.floor(((Math.random() * (3-1)) + 1) * Level);
          
          Player.updateLevel(Profile, xp)
          Player.updateOwlet(Profile, o)
          await Player.updateUser(Profile)

        } else if ( p < MediumRange) {
          animal = medium[Math.floor(Math.random()*medium.length)];
          rate = MediumRate
          trate = 2
          o = Math.floor(((Math.random() * (4-2)) + 2) * Level);
          xp = Math.floor(((Math.random() * (5-2)) + 2) * Level);
          
          Player.updateLevel(Profile, xp)
          Player.updateOwlet(Profile, o)
          await Player.updateUser(Profile)
        } else if (p < BigRange) {
          animal = big[Math.floor(Math.random()*big.length)];
          rate = BigRate
          trate = 3
          o = Math.floor(((Math.random() * (6-3)) + 3) * Level);
          xp = Math.floor(((Math.random() * (10-3)) + 3) * Level);

          Player.updateLevel(Profile, xp)
          Player.updateOwlet(Profile, o)
          await Player.updateUser(Profile)
          
        } else {
          const emojis = bot.config.emojis.fail
          const emoji = emojis[Math.floor(Math.random()*emojis.length)];

          message.channel.send({
            embed: {
              color: "BLACK",
              author: { name: `${Player.player.tag}`, icon_url: `${Player.player.displayAvatarURL()}`},
              // title: ``,
              description: `${emoji} | You have catch nothing. :(`,
              footer: { text: 'Miss Rate: 5%'},
            }
          })
        }

        
        if (animal) {
          const emojis = bot.config.emojis.success
          const emoji = emojis[Math.floor(Math.random()*emojis.length)];
          const vowels = [
            'a',
            'i',
            'u',
            'e',
            'o'
          ]
          const typerate = (trate === 1) 
          ? 'Small Rate: '
          : (trate === 2) 
            ? 'Medium Rate: '
            : 'Big Rate: '
          message.channel.send({
            embed: {
              color: "RANDOM",
              author: { name: `${Player.player.tag}`, icon_url: `${Player.player.displayAvatarURL()}`},
              // title: ``,
              description: `${emoji} | You have catch ${vowels.includes(animal[0].toLowerCase()) ? 'an' : 'a'} **${animal}** and got **${o.toLocaleString()}** ${Icons.owlet}`,
              //owlet${o>1?'s':''}!`,
              footer: { text: `${typerate}${Math.round(rate)}%`},
            }
          })
        }
        

        

        // Adds the user to the set so that they can't talk for a minute
        // talkedRecently.add(message.author.id);
        // setTimeout(() => {
        //   // Removes the user from the set after a minute
        //   talkedRecently.delete(message.author.id);
        // }, 5000);
    //}
  }
}