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
      return await col.insertOne({'userId': id, 'commit': commit, 'remindme': never});
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update a commitment message
  updateCommit: async function(id, commit){
    /** Params should be the following:
     *    id: <user id, using their discord's unique id>
     *    commit: <commitment message>
     * commit2-5 is under-development
     */
    try{
      return await col.updateOne({'userId': id},
      { $set: {'commit1': commit} });
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update the reminder message
  updateReminder: async function(id, reminder){
    /** Params should be the following shape:
     *    id: <user id, using their discord's unique id>
     *    reminder: <string, one of the remindme option>
     */
    try{
      return await col.updateOne({'userId': id},
      { $set: {'reminder': reminder } });
    } catch (err){
      console.log(err);
      return null;
    }
  }
};