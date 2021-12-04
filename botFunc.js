
module.exports = (bot) => {
  bot.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  bot.getUserFromMention = (args) => {
    var mention, id, matches;
    args.forEach((element, index) => {
      if (index > 0 && id) return
      matches = element.match(/^<@!?(\d+)>$/);
      if (!matches) return;
      return id = matches[1];
    })
    if (!id) return
    return bot.users.cache.get(id);
  }
}