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

    this.quotesList = [
      'Confront the Dragon, Get the Gold, Share it with the Community :jbp1:',
      'Thanks for the update! :getafterit:',
      'Get Some! :getafterit:',
      'You bad motherfuckers! :akira_happy:',
      'Keep the updates coming, accountability is key to sustained success! :meaningwave:',
      'Beauty will save the world! :akira_happy:',
      'P R O U D   O F   Y O U :akira_happy',
      'R E A L S H I T :akira_happy:',
      'Make it Beautiful! :akira_happy:',
      'It\'s a beautiful day to be alive! :akira_happy:',
      'THANK :akira_happy: YOU!',
      'The purpose of life is finding the largest burden that you can bear and bearing it. :getafterit: :meaningwave:',
      'Let\'s go champ! :getafterit:',
      'Sometimes the truth hurts, and sometimes it feels real good. :jbp6:',
      'My steps are resolute, and now the Earth shakes. :jbp6:',
      'I like spending time with healthy people whose brains are turned on, :jbp6:',
      'Each day provides it\'s own gifts. :faye:'
    ];
  }

  async run(message, { text }){
    let randQuote = this.quoteslist[Math.floor(Math.random()*this.quotesList.length)];

    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.reply('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');

    let res = await db.updateCommit(message.author.id, text, new Date());
    if(res === null) return await message.reply('There was an error trying to update the commitment. Let Alex or one of the bot masters know!');
    return await message.reply(`${randQuote} \n Your commitment has been updated! Commitment changed from ${isThere.commit} to ${text}`);
  }
};