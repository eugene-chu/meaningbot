const { Command } = require('discord.js-commando');

module.exports = class GetSome extends Command {
  constructor(client){
    super(client, {
      name: 'getsome',
      group: 'the-path',
      memberName: 'getsome',
      description: 'Get a random G E T A F T E R I T message to pump you up so you can get after it!',
      examples: ['`.getsome`: GET AFTER IT']
    });

    this.quoteslist = [
      'Get After It, Bucko',
      'Get Some',
      'Who Gonna Carry The Boat!?!',
      'Roger That',
      'You gotta get after it!',
    ]
  }

  async run(message){
    let randQuote = this.quoteslist[Math.floor(Math.random*this.quoteslist.length)];
    return await message.say(randQuote);
  }
}