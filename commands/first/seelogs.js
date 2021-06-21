const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class seelogs extends Command{
  constructor(client){
    super(client, {
      name: 'seelogs',
      group: 'first',
      memberName: 'seelogs',
      description: 'See your current log.',
      examples: ['`.seelogs`: Current log is \'Hello World\'']
    });
  }

  async run(message){
    let isThere = await db.findDoc({'userID': message.author.userId});
    console.log(isThere);
    if(!isThere) return await message.reply('You have not added any log yet. Did you want to add one with `.log` command?');
    return await message.reply(`${isThere.commitLog}`);
  }
};