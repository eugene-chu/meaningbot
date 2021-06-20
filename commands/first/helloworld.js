const { Command } = require('discord.js-commando');

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
    const channel = message.channel;
    if(channel.name !== 'general'){
      return await message.say('This is the wrong channel')
    }
    return await message.say('Hello World');
  }

}