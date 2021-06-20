const { Command } = require('discord.js-commando');

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
    return await message.say(`${text} has been logged`);
  }
};