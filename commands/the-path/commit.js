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

    this.quotesList = [
      'Noted! Now get after it! :getafterit:',
      'Thanks, and good luck on The Path! :getafterit:',
      'Commitments are the first step, stick to The Path! :getafterit:',
      'You bad motherfuckers! :akira_happy:',
      'When you do a little more than you can you get stronger, and we don\'t know the upper limit to that. :jbp6:',
      'Action is the next step to realize your goals. :akira_happy:',
      'Get creative. Get aggressive. Get it done! When you are on the road, STAY ON THE PATH',
      'Fear is normal. Every person feels fear at some point. Step aggressively toward to your fear - that is the step into bravery :getafterit:',
      'You have to do the work. You have to hold the line. You have to make it happen :getafterit:',
      'Don\'t count on motivation. Count on Discipline :getafterit:',
      'Set your alarm clock and get out of bed when it goes off :getafterit:',
      'Go down swinging. And I\'ll tell you: If you fight with all you have, more often than not, you won\'t go down at all. You will win. :getafterit:',
      'Discipline Equals Freedom :getafterit:',
      'It\'ll destroy you if you try to make it mean anything to anyone but yourself. :jbp6: ',
      'The average is the borderline that keeps mere men in their place. Those who step over the line are heroes by the very act. Go! :jbp1:',
      'Scar tissue is stronger than regular tissue. Realize the strength, move on. :getafterit:',
      'Begin - to begin is half the work, let half still remain; again begin this, and you will have finished. :getafterit:'
    ];
  }

  async run(message, { text }){
    let randQuote = this.quoteslist[Math.floor(Math.random()*this.quoteslist.length)];

    let isThere = await db.findUser(message.author.id);
    if(isThere) return await message.reply('You already have a commitment.\nDid you mean to update it? Use `.update` to update your current commitment.\nYou can see your current commitments with the command `.commitments`.');

    let res = await db.newCommit(message.author.id, text, message.author.presence.status, new Date());
    if(res === null) return await message.reply('There was an error trying to add the commitment. Let Alex or one of the bot master know!');
    return await message.reply(`${randQuote} \n ${text} has been committed. Now use \`.remindme\` in #the-path to set the reminder.\nIf you need help, type \`.help <command>\` for more details.`);
  }
};
