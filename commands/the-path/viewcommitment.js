const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class ViewCommitment extends Command{
  constructor(client){
    super(client, {
      name: 'viewcommitment',
      group: 'the-path',
      memberName: 'viewcommitment',
      description: 'Reads out your current commitments back to you.',
      example: ['`!viewcommitment` Your current commitment is: "Do 100 push-ups"\nAnd you will get a DM reminder this often: never',
                '`!viewcommitment` Your current commitment is: "Clean up your room"\nAnd you will get a DM reminder this often: weekly',
                '`!viewcommitment` Your current commitment is: "Become #1 lobster"\nAnd you will get a DM reminder this often: daily']
    });
  }

  async run(message){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.reply('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');
    
    return await message.reply(`Your current commitment is:\n"${isThere.commit}"\nAnd you will get a DM reminder this often: ${isThere.remindMe}`);
  }
}