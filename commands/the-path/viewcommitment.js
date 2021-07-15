const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class ViewCommitment extends Command{
  constructor(client){
    super(client, {
      name: 'viewcommitment',
      group: 'the-path',
      memberName: 'viewcommitment',
      description: 'Reads out your current commitments back to you.',
      example: ['`.commitments` Your current commitments are: ```Do 100 push-ups```',
                '`.commitments` Your current commitments are: ```Clean up your room```',
                '`.commitments` Your current commitments are: ```Become #1 lobster```']
    });
  }

  async run(message){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.reply('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');
    
    return await message.reply(`Your current commitment is:\n"${isThere.commit}"\nAnd you will get a DM reminder this often: ${isThere.remindMe}`);
  }
}