const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class Commitments extends Command{
  constructor(client){
    super(client, {
      name: 'commitments',
      group: 'the-path',
      memberName: 'commitments',
      description: 'Reads out your current commitments back to you.',
      example: ['`.commitments` Your current commitments are: ```Do 100 push-ups```',
                '`.commitments` Your current commitments are: ```Clean up your room```',
                '`.commitments` Your current commitments are: ```Become #1 lobster```']
    });
  }

  async run(message){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.direct('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');
    
    return await message.reply(`Your current commitments are: ${isThere.commit1}`);
  }
}