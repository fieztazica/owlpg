module.exports = {
    name: 'farm',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}farm',
    wait: true,
    
    async execute(bot, message) {
      
      const coin = 5
      const farming = await message.channel.send(`Sowing...`);
      await bot.sleep(1000)
      farming.edit(`Watering...`);
      await bot.sleep(1000)
      farming.edit(`That plant is growing...`);
      await bot.sleep(1000)
      farming.edit(`Harvesting...`);
      await bot.sleep(1000)
      farming.edit(`Done! **You just claimed ${coin} coins from harvest.**`);   
      await message.author.updateCoin(coin);
    },
};
