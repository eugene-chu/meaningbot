const { Command } = require('discord.js-commando');

module.exports = class getsome extends Command {
  constructor(client){
    super(client, {
      name: 'getsome',
      group: 'the-path',
      memberName: 'getsome',
      description: 'Get a random G E T A F T E R I T message to pump you up so you can get after it!',
      examples: ['`.getsome`: GET AFTER IT']
    });

    this.quotes = [
      'Get After It, Bucko',
      'Get Some',
      'Who Gonna Carry The Boat!?!',
      'Roger That',
      'You gotta get after it!',
    ]
  }

  async run(message){
    let randQuote = this.quotes[Math.floor(Math.random*this.quotes.length)];
    return await message.reply(randQuote);
  }
}