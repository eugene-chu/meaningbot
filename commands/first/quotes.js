const { Command } = require('discord.js-commando');
const { isCorrectChannel } = require('../../helpfunc.js');

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
    if(!isCorrectChannel(message)) return await message.say(`This is not the correct channel. Please use it in <#848008771397353505>`);
    let sendquote = this.quoteslist[Math.floor(Math.random()*this.quoteslist.length)];
    return await message.say(`${sendquote}`);
  }
}