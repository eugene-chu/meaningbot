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
    /** id should be the following shape:
     * {
     *  'userId: <user id, using their discord's unique id>
     * }
     */
    try{
      return await col.findOne(id)
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Add a new commitment to the database.
  newCommit: async function(info) {
    /** Info should be the following shape:
     * {
     *    userId: <user id, using their discord's unique id>
     *    commit1: <commitment message>
     *    commit2: <commitment message>
     *    commit3: <commitment message>
     *    commit4: <commitment message>
     *    commit5: <commitment message>
     *    remindme: never
     * }
     * commit2-5 are optional, and is under-development.
     */
    try{
      return await col.insertOne(info);
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update a commitment message
  updateCommit: async function(info){
    /** Info should be the following shape:
     * {
     *    id: <user id, using their discord's unique id>
     *    commit1: <commitment message>
     *    commit2: <commitment message>
     *    commit3: <commitment message>
     *    commit4: <commitment message>
     *    commit5: <commitment message>
     * }
     * commit2-5 is under-development
     */
    try{
      return await col.updateOne({'userId': info.id},
      { $set: {'commit1': info.commit1} });
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update the reminder message
  updateReminder: async function(info){
    /** Info should be the following shape:
     * {
     *    id: <user id, using their discord's unique id>
     *    reminder: <string, one of the remindme option>
     * }
     */
    try{
      return await col.updateOne({'userId': info.id},
      { $set: {'reminder': info.reminder } });
    } catch (err){
      console.log(err);
      return null;
    }
  }
};