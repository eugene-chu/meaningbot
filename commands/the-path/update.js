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

    this.responselist = [
      'Confront the Dragon, Get the Gold, Share it with the Community :jbp1:',
      'Thanks for the update! :getafterit:',
      'Get Some! :getafterit:',
      'P R O U D   O F   Y O U :akira_happy'
    ];
  }

  async run(message, { text }){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.reply('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');

    let res = await db.updateCommit(message.author.id, text, new Date());
    if(res === null) return await message.reply('There was an error trying to update the commitment. Let Alex or one of the bot masters know!');
    return await message.reply(`Your commitment has been updated! Commitment changed from ${isThere.commit} to ${text}`);
  }
};