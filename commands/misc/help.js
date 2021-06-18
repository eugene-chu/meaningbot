const { Command } = require('discord.js-commando');

module.exports = class HelpCommand extends Command{
  constructor(client){
    super(client, {
      name: 'helpme',
      group: 'misc',
      aliases: ['mycommands', 'mycommandlists'],
      memberName: 'help',
      description: 'get the list of commands',
      examples: ['```.help``` and a help message would be sent to your dm']
    });
  }

  async run(message) {
    return await message.direct('This is the help command');
  }
};