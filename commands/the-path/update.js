const { Command } = require('discord.js-commando');
const db = require('../../db/db.js')

module.exports = class Update extends Command {
  constructor(client){
    super(client, {
      name: 'update',
      group: 'the-path',
      memberName: 'update',
      description: 'Update your commentmet logs',
      examples: ['`.update Become the #1 lobster`: Commitment update from `Standup straight with shoulders back` to `Become the #1 lobster`'],
      args: [{
        key: 'text',
        prompt: 'What is your updated commitment?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }){
    let isThere = await db.findUser({'userId': message.author.id});
    if(!isThere) return await message.direct('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');

    let res = await db.updateCommit({'id': message.author.id, 'commit1': text});
    if(res === null) return await message.direct('There was an error trying to update the commitment. Let Alex or one of the bot master know!');
    return await message.direct(`Your commitment has been updated! Commitment changed from ${isThere.commit1} to ${text}`);
  }
};