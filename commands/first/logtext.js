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
        type: 'string'
      }]
    });
  }

  async run(message, { text }){
    db.newDoc({'userId': message.author.id, 'commitLog': text});
    return await message.reply(`${text} has been logged.`);
  }
};