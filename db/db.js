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
  newCommit: async function(id, commit, time) {
    /** Param should be the following:
     *    userId: <user id, using their discord's unique id>
     *    commit: <commitment message>
     *    time: <the time when the commit command was run>
     * 
     * Working on allowing for more than 1 commit message
     */
    try{
      return await col.insertOne({
        'userId': id,
        'commit': commit,
        'remindMe': 'never',
        'commitTime': time,
        'lastDMTime': time });
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
      { $set: { 'commit': commit } });
    } catch (err){
      console.log(err);
      return null;
    }
  },
  // Update the reminder frequency
  updateFrequency: async function(id, frequency, time){
    /** Params should be the following:
     *    id: <user id, using their discord's unique id>
     *    frequency: <string, one of the remindme option>
     *    time: <the time when the reminder frequency was updated>
     */
    try{
        return await col.updateOne({ 'userId': id },
        { $set: { 'remindMe': frequency, 'commitTime': time, 'lastDMTime': time }})
    } catch (err){
      console.log(err);
      return null;
    }
  },
  updateDMTime: async function(id, time){
    /** Params should be the following:
     *    id: <user id, using their discord's unique id>
     *    time: <the time when the last DM reminder was sent>
     */
    try{
      return await col.updateOne({ 'userId': id },
      { $set: { 'lastDMTime': time }})
    }catch (err){
      console.log(err);
      return null;
    }
  }
};