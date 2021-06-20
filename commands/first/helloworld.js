const { Command } = require('discord.js-commando');
const { isCorrectChannel } = require('../../helpfunc.js');

module.exports = class HelloWorld extends Command{
  constructor(client){
    super(client, {
      name: 'helloworld',
      aliases: ['hello', 'hi'],
      group: 'first',
      memberName: 'helloworld',
      description: 'Respond Hello World only in the general channel'
    });
  };

  async run(message){
    if(!isCorrectChannel(message)) return await message.say('This is the wrong channel. Please use this command in <#848008771397353505>');
    return await message.say('Hello World');
  }

}