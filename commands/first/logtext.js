const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class log extends Command {
  constructor(client){
    super(client, {
      name: 'log',
      group: 'first',
      memberName: 'log',
      description: 'logs the message you type to the discord bot. Use command `.readlogs` to read it',
      examples: ['`.log hello world`: "Hello World" will be logged.'],
      args: [{
        key: 'text',
        prompt: 'What will be your commitment?',
        type: 'string',
      }]
    });
  }

  async run(message, { text }){
    let isThere = await db.findDoc({'userId': message.author.id});
    console.log(isThere);
    if(isThere){
      return await message.direct('You already have a commitment. \nDid you mean to update it? Use \`.update\` to update it. \nOr you can use \`.seelogs\` to see your current log.');
    }
    db.newDoc({'userId': message.author.id, 'commitLog': text, 'remindme': 'never'});
    return await message.direct(`${text} has been logged. Now use \`.remindme daily/weekly/bi-weekly/monthly\` to set the reminder.`);
  }
};