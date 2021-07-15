const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

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

    this.responselist = [
      'Noted! Now get after it! :getafterit:',
      'Thanks, and good luck on The Path! :getafterit:',
      'Commitments are the first step, stick to The Path! :getafterit:'
    ]
  }

  async run(message, { text }){
    let isThere = await db.findUser(message.author.id);
    if(isThere) return await message.say('You already have a commitment.\nDid you mean to update it? Use `.update` to update your current commitment.\nYou can see your current commitments with the command `.commitments`.');

    let res = await db.newCommit(message.author.id, text, message.author.presence.status, new Date());
    if(res === null) return await message.say('There was an error trying to add the commitment. Let Alex or one of the bot master know!');
    return await message.say(`${text} has been committed. Now use \`.remindme\` in #the-path to set the reminder.\nIf you need help, type \`.help <command>\` for more details.`);
  }
};