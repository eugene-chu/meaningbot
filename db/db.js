const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'discordBotLogs';
const colName = 'logs';
let db, col;

client.connect(()=>{
  console.log('Connected to database');
  db = client.db(dbName);
  col = db.collection(colName);
});

module.exports = {
  findDoc: async function(id){
    doc = await col.findOne(id);
    try{
      return doc;
    }catch(err){
      console.log(err);
      return null;
    }
  },
  newDoc: async function(info){
    try{
      col.insertOne(info);
    }catch(err){
      console.log(err);
      return null;
    }
  },
  updateLog: async function(info){
    try{
      col.updateOne({'id': info.id}, {'log': info.log});
    }catch(err){
      console.log(err);
      return null;
    }
  }
}