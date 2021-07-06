const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');
const { userList } = require('../../db/userList.js');

module.exports = class log extends Command {
  constructor(client) {
    super(client, {
      name: 'log',
      group: 'first',
      memberName: 'log',
      description: 'logs the message you type to the discord bot. Use command `.seelogs` to read it. Use command `.update` to update it.',
      examples: ['`.log hello world`: "hello world" will be logged.'],
      args: [{
        key: 'text',
        prompt: 'What will be your commitment?',
        type: 'string',
      }],
    });
  }

  async run(message, { text }) {
    const isThere = await db.findDoc(message.author.id);
    if(isThere) return await message.direct('You already have a commitment. \nDid you mean to update it? Use `.update` to update it. \nOr you can use `.seelogs` to see your current log.');

    userList.add(message.author.id);
    const res = await db.newDoc({ 'userId': message.author.id, 'commitLog': text, 'remindme': 'off' });
    if(res === null) return await message.direct('There was an error trying to add the log');

    return await message.direct(`${text} has been logged. Now use \`.remindme daily/weekly/bi-weekly/monthly\` to set the reminder.`);
  }
};