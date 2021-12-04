// const setting = new Set()

module.exports = {
    name: 'start',
    aliases: [],
    category: 'Player',
    utilisation: '{prefix}start',
    wait: true,
    async execute(bot, message, ars) {
        
        await message.author.start()
        const hasKing = await message.author.hasKing()
        if (!hasKing)
        {
            const isSuccess = await message.author.setKing()
            if (isSuccess) 
              return message.lineReplyNoMention('Congratulation! You just became Island 1 King!!!')
        }
        
        
        return message.lineReplyNoMention('You just landed on a random island!')
    },
};
