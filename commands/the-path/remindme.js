const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class RemindMe extends Command {
  constructor(client){
    super(client, {
      name: 'remindme',
      group: 'the-path',
      memberName: 'remindme',
      description: 'Toggle the remindme feature. Meaningbot will DM you daily, reminding you to get after it!',
      examples: ['`.remindme`: Let you know if you have it on or off',
                 '`.remindme on`: Get a daily DM to remind you to get after it!',
                 '`.remindme off`: Stops the daily DM reminders. But Meaningbot will still have your current commitments.'],
      args: [{
        key: 'toggle',
        prompt: '',
        type: 'string',
        oneOf: ['on', 'off'],
        default: '',
      }]
    })
  }

  async run(message, { toggle }){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.direct('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');

    if(toggle === '') return await message.direct(`Your current \`.remindme\` status is: ${isThere.remindme}`);

    if(toggle === isThere.remindme) return await message.direct(`Your daily DM is already set to ${toggle}. Did you mean to toggle it ${toggle === 'on' ? 'on' : 'off'}`);
    
    let res = await db.updateRemindme(message.author.id, toggle);
    if(res === null) return await message.direct('There was an error trying to update the commitment. Let Alex or one of the bot masters know!');
    let resMessage;
    toggle === 'off' ? resMessage = `You will stop getting DM reminders. However, Meaningbot will still keep your commitments logged. Start is up again with \`.remindme\``
                          : resMessage = 'Meaningbot will start sending you DM reminders starting tomorrow. Get after it, bucko!'
    return await message.direct(resMessage);
  }
}