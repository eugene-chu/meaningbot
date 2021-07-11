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

/**
 * Each collection of commitments will include the following:
 * userId: The user's discord uuid. For easy search
 * commit: The commitment message the user intend to have the bot keep and send reminder DM of
 * remindMe: The frequency on how often the user sends the reminder DMs. Can either be 'never', 'daily', 'weekly', or 'monthly'
 * commitTime: The time when the bot received the first .commit command or .remindMe command.
 * lastDMTime: The last time the bot DM messaged the user
 * status: The last known status of the user. Either 'offline' or 'online' ('online' includes 'dnd' and 'idle');
 */

module.exports = {
  // Returns the mongodb cursor
  findAll: async function() {
    try{
      return await col.find({})
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  // Look of the discord user's unqiue id in the database.
  findUser: async function(id) {
    try{
      return await col.findOne({'userId': id})
    } catch (err){
      console.error(err);
      return null;
    }
  },
  // Add a new commitment to the database.
  newCommit: async function(id, commit, time, status) {
    /** Param should be the following:
     *    userId: <user id, using their discord's unique id>
     *    commit: <commitment message>
     *    time: <the time (JS Date object) when the commit command was run>
     *    status: <The user's status when the commitment is created>
     * 
     * Working on allowing for more than 1 commit message
     */
    try{
      return await col.insertOne({
        'userId': id,
        'commit': commit,
        'remindMe': 'never',
        'commitTime': time,
        'lastDMTime': time,
        'status': status });
    } catch (err){
      console.error(err);
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
      console.error(err);
      return null;
    }
  },
  // Update the reminder frequency
  updateRemindMe: async function(id, frequency, time){
    /** Params should be the following:
     *    id: <user id, using their discord's unique id>
     *    frequency: <string, one of the remindme option>
     *    time: <the time (JS Date object) when the reminder frequency was updated>
     */
    try{
        return await col.updateOne({ 'userId': id },
        { $set: { 'remindMe': frequency, 'commitTime': time, 'lastDMTime': time }});
    } catch (err){
      console.error(err);
      return null;
    }
  },
  updateDMTime: async function(id, time){
    /** Params should be the following:
     *    id: <user id, using their discord's unique id>
     *    time: <the time (JS Date object) when the last DM reminder was sent>
     */
    try{
      return await col.updateOne({ 'userId': id },
      { $set: { 'lastDMTime': time }});
    } catch (err){
      console.error(err);
      return null;
    }
  },
  updateStatus: async function(id, status){
    try{
      return await col.updateOne({ 'userId': id },
      { $set: { 'status': status } });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};