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
	findDoc: async function(id) {
		try{
			return await col.findOne(id);
		}
		catch(err) {
			console.log(err);
			return null;
		}
	},
  countDoc: async function(args = {}) {
    try{
      return await col.countDocuments(args);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  },
	newDoc: async function(info) {
		try{
			return await col.insertOne(info);
		}
		catch(err) {
			console.log(err);
			return null;
		}
	},
	updateLog: async function(info) {
		try{
			return await col.updateOne({ 'userId': info.id }, { $set: { 'commitLog': info.log } });
		}
		catch(err) {
			console.log(err);
			return null;
		}
	},
};