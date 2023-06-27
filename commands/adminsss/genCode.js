module.exports = {
  name: 'genCode',
  aliases: ['gcode'],
  category: '',
  utilisation: '',
  async execute (bot, message, args) {

    if (!(message.author.id === '445102575314927617' || message.author.id === '441438270061150208')) return;

    if (!args[0]) return message.lineReply("Missing argument")
    
    let name = String(args[0].toLowerCase())
    const codes = bot.mongo.collection("codes")
    const code = await codes.findOne({name: name})

    if (code) return message.lineReply("Its already in database. Cannot create it anymore.");
    
    let owlet = args[1] || 1
    let remain = args[2] || 1
    let quote = args[3] || ''
    let option = args[4]

    await bot.mongo.collection("codes").insertOne({
      name: name,
      owlet: owlet,
      remain: remain,
      quote: quote,
    })

    if (!option) return;

    
  }
} 