module.exports = {
    name: 'pick',
    aliases: ['choose'],
    category: 'Fun',
    utilisation: '{prefix}pick [arguments split with \`,\`]',

    execute(bot, message,args) {
      if (!args[0]) return message.lineReply(`**[ERROR]** Please provide something such as suitable choices. (Separate them with \`,\`)`);
      
      let choices = args.join(' ').split(/\s*,+\s*/);

      if (choices.includes('')) return message.lineReply(`**[ERROR]** Null character are not allowed here. (Separate your cases with \`,\`)`);
      
      const rs = choices[Math.floor(Math.random() * choices.length)]

      return message.lineReplyNoMention(`**[RESULT]** ${rs}`);

    },
};
