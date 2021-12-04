const isExe = new Map()
module.exports = async (bot, message) => {

  if (message.author.bot || message.channel.type === 'dm') return;
  const prefix = await message.guild.getPrefix() || process.env.PREFIX

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  
  if (cmd) 
    try {
      if (cmd.wait)
      {
        const time = isExe.get(message.author.id)
        if (time) {
          const waited = new Date(Date.now() - time)
          // if (waited.getSeconds() > 1)
          //   isExe.delete(message.author.id) 
          if (waited)
            return message.lineReplyNoMention('Please end your previous command')
          
        }
        
      }
      
      var isExists = await message.author.isExists()
      if (cmd.profile && !isExists) 
        return message.lineReplyNoMention(`You did't start to access this command`)
      if (cmd.name === 'start' && isExists) 
          return message.lineReplyNoMention('You already have a profile!')
      
      isExe.set(message.author.id, Date.now()) 
      await cmd.execute(bot, message, args)
      isExe.delete(message.author.id)

      // console.log(`User: ${message.author.tag} (${message.author.id}) Server: ${message.guild.name} (${message.guild.id}) Command: ${cmd.name}`)
    }
    catch (error) {
      console.log(error)
    }
 

  
};
