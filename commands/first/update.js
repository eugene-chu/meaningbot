const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class update extends Command{
  constructor(client){
    super(client,{
      name: 'update',
      group: 'first',
      memberName: 'update',
      description: 'Updates the log message with a new message',
      examples: ['`.update goodbye world`: Previous log is "hello world", log updated to "goodbye world"'],
      args: [{
        key: 'text',
        prompt: 'What is your new commitment?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }){
    let isThere = await db.findDoc({'userId': message.author.id});
    if(!isThere) return await message.reply('You do not have any commit log yet. Did you mean to use `.log` to log your first message?');
    let responseMsg = `Previous log is \`${isThere.commitLog}\`, log updated to \`${text}\``;

    let res = await db.updateLog({id: message.author.id, log: text});
    if(res === null){
      return await message.direct(`Something went wrong updating the log in the database.`);
    }
    return await message.direct(responseMsg);
  }
}