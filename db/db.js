require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'Meaningbotlogs';
const colName = 'commitments';
let col;

client.connect(() => {
  col = client.db(dbName).collection(colName);
  console.log('successfully connected to the database')
});

module.exports = {
  // Look of the discord user's unqiue id in the database.
  findUser: async function(id) {
    try{
      return await col.findOne({'userId': id})
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Add a new commitment to the database.
  newCommit: async function(id, commit) {
    /** Info should be the following shape:
     * {
     *    userId: <user id, using their discord's unique id>
     *    commit: <commitment message>
     *    remindme: never
     * }
     * Working on allowing for more than 1 commit message
     */
    try{
      return await col.insertOne({'userId': id, 'commit': commit, 'remindme': 'off'});
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update a commitment message
  updateCommit: async function(id, commit){
    /** Param should be the following shape:
     *    id: <user id, using their discord's unique id>
     *    commit: <commitment message>
     * more commit message is under-development
     */
    try{
      return await col.updateOne({'userId': id},
      { $set: {'commit': commit} });
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update the reminder message
  updateRemindme: async function(id, reminder){
    /** Param should be the following:
     *  id: <user id, using their discord's unique id>
     *  reminder: <string, one of the remindme option>
     * 
     */
    try{
      return await col.updateOne({'userId': id},
      { $set: {'remindme': reminder } });
    } catch (err){
      console.log(err);
      return null;
    }
  }
};