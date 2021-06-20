const { Command } = require('discord.js-commando');

module.exports = class Commit extends Command{
  constructor(client){
    super(client, {
      name: 'commit',
      group: 'the-path',
      memberName: 'commit',
      description: 'Set your first commitment log to start your journey down the path!',
      example: ['`.commit Do 100 push-ups`', '`.commit Get after it everyday!`'],
      args: [{
        key: 'text',
        prompt: 'What are you commiting to?',
        type: 'string'
      }]
    });
  }

  async run(message, { text }){
    return await message.direct(`${text} has been committed. Now use \`.remindme\` in #the-path to set the reminder.\nIf need help, type \`.help <command>\` for more details.`);
  }
};