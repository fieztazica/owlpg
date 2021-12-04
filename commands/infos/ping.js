module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(bot, message) {
        message.lineReplyNoMention(`Pong! **${bot.ws.ping}ms.**`);   
    },
};
