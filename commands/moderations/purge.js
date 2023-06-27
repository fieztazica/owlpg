module.exports = {
    name: 'purge',
    aliases: [],
    category: 'Moderations',
    utilisation: '{prefix}purge',

    async execute(bot, message, args) {
      // console.log(message.member)
      if (!message.member.permissions.has(['MANAGE_MESSAGES']))
        return message.lineReply(`**[ERROR]** ${message.author}! You don't have required permission!`);

      const member = bot.getUserFromMention(args)
      const messages = await message.channel.messages.fetch();

      if (member) {
        const userMessages = messages.filter(
          (m) => m.author.id === member.id
        )

        if (!args[1]) {
          const lastMessage = userMessages.find(
            (m) => m.author.id === member.id
          )
          message.channel.bulkDelete([lastMessage]);

          const userdel = await message.channel.send(`**[SUCCESS]** ${member} last message has been cleared.`)
          
          return setTimeout(() => userdel.delete(),5000);
        }

        if (isNaN(args[1]))
          return message.lineReply("**[ERROR]** Numbers are only allowed");

        if (!((parseInt(args[1]) > 0) && (parseInt(args[1])  < 100)))
          return message.lineReply(
            "**[ERROR]** Please specify a number of messages to delete ranging from 1 - 99"
          ) ;

        let count = 0
        const foundMessages = userMessages.filter((m) => {
          return count++ < parseInt(args[1])
        })
        await message.channel
          .bulkDelete(foundMessages)
          .catch((err) => console.log(err));
        const userdel = await message.channel.send(`**[SUCCESS]** ${args[1]} messages from ${member} have been cleared.`);
        setTimeout(() => userdel.delete(),5000);

      } else {

        if (!args[0])
        return message.lineReply(
          "**[ERROR]** Please specify a number of messages to delete ranging from 1 - 99"
        );

        if (isNaN(args[0]))
          return message.lineReply("**[ERROR]** Numbers are only allowed");

        if (!((parseInt(args[0]) > 0) && (parseInt(args[0])  < 100)))
          return message.lineReply(
            "**[ERROR]** Please specify a number of messages to delete ranging from 1 - 99"
          ) ;
          
        await message.channel
          .bulkDelete(parseInt(args[0])+1)
          .catch((err) => console.log(err));
          
        const deleteMessage = await message.channel.send("**[SUCCESS]** Deleted " + args[0] + " messages.");

        setTimeout(() => deleteMessage.delete(), 10*1000)
        
      }

     
    },
};