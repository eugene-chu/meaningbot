const { Command } = require('discord.js-commando');

module.exports = class Quotes extends Command{
  constructor(client){
    super(client, {
      name: 'quotes',
      group: 'first',
      memberName: 'quotes',
      description: 'Get a quote back'
    });
    this.quoteslist = ['quote 1', 'quote 2', 'quote 3', 'quote 4', 'quote 5'];
  }

  async run (message){
    let sendquote = this.quoteslist[Math.floor(Math.random()*this.quoteslist.length)];
    return await message.say(`${sendquote}`);
  }
}