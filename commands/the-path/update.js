const { Command } = require('discord.js-commando');
const db = require('../../db/db.js')

module.exports = class Update extends Command {
  constructor(client){
    super(client, {
      name: 'update',
      group: 'the-path',
      memberName: 'update',
      description: 'Update your commentmet logs',
      examples: ['`!update Become the #1 lobster`: Commitment update from\n"Standup straight with shoulders back"\nto\n"Become the #1 lobster"'],
      args: [{
        key: 'text',
        prompt: 'What is your updated commitment?',
        type: 'string'
      }]
    });

    this.quotesList = [
      'Confront the Dragon, Get the Gold, Share it with the Community <:jbp1:460235087192129539>',
      'Thanks for the update! <:getafterit:479505436282847257>',
      'Get Some! <:getafterit:479505436282847257>',
      'You bad motherfuckers! <:akira_happy:465667255087136799>',
      'Keep the updates coming, accountability is key to sustained success! <:meaningwave:460233509265604638>',
      'Beauty will save the world! <:akira_happy:465667255087136799>',
      'P R O U D   O F   Y O U <:akira_happy:465667255087136799>',
      'R E A L S H I T <:akira_happy:465667255087136799>',
      'Make it Beautiful! <:akira_happy:465667255087136799>',
      'It\'s a beautiful day to be alive! <:akira_happy:465667255087136799>',
      'THANK <:akira_happy:465667255087136799> YOU!',
      'The purpose of life is finding the largest burden that you can bear and bearing it. <:getafterit:479505436282847257> <:meaningwave:460233509265604638>',
      'Let\'s go champ! <:getafterit:479505436282847257>',
      'Sometimes the truth hurts, and sometimes it feels real good. <:jbp6:460235086986608640>',
      'My steps are resolute, and now the Earth shakes. <:jbp6:460235086986608640>',
      'I like spending time with healthy people whose brains are turned on, <:jbp6:460235086986608640>',
      'Each day provides it\'s own gifts. <:faye:460235086894333962>',
      'You bad motherfuckers! <:akira_happy:465667255087136799>',
      'When you do a little more than you can you get stronger, and we don\'t know the upper limit to that. <:jbp6:460235086986608640>',
      'Action is the next step to realize your goals. <:akira_happy:465667255087136799>',
      'Execute every action in life as if it were the last. <:jbp6:460235086986608640>',
      'It feels like it works',
      'Remember that what you do not yet know, is more important than what you already know. <:2_jbpAesthetic:822805626715504711>'
    ];
  }

  async run(message, { text }){
    let randQuote = this.quotesList[Math.floor(Math.random()*this.quotesList.length)];

    return await message.reply(randQuote);
  }
};