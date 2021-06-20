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
    let howto = this.usage('additionalArgs');
    console.log(howto);
    const channel = message.channel;
    if(channel.name !== 'general'){
      return await message.say('This is the wrong channel')
    }
    return await message.say('Hello World');
  }

}