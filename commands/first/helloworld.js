const { Command } = require('discord.js-commando');

module.exports = class HelloWorld extends Command{
  constructor(client){
    super(client, {
      name: 'helloworld',
      aliases: ['hello', 'hi'],
      group: 'first',
      memberName: 'helloworld',
      description: 'Respond Hello World'
    });
  };

  async run(message){
    return await message.say('Hello World');
  }

}