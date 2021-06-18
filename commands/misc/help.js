const { Command } = require('discord.js-commando');

module.exports = class HelpCommand extends Command{
  constructor(client){
    super(client, {
      name: 'help',
      group: 'misc',
      aliases: ['commands'],
      memberName: 'help',
      description: 'get the list of commands',
    });
  }

  async run(message) {
    return await message.direct('This is the help command');
  }
};