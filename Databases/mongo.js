const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGO_CONNECT);
client.connect().then(() => console.log("Mongo Connected!"))

module.exports = client.db('slimy')