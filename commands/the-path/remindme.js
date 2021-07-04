const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class RemindMe extends Command {
  constructor(client){
    super(client, {
      name: 'remindme',
      group: 'the-path',
      memberName: 'remindme',
      description: 'Set a reminder interval. Meaningbot will DM you, reminding you to get after it!',
      examples: ['`.remindme daily`: Gets a DM daily to remind you to get after it!',
                 '`.remindme weekly`: Get a DM weekly to remind you to get after it!',
                 '`.remindme never`: Stop getting DM reminders. But Meaningbot will still have your current commitments.'],
      args: [{
        key: 'frequency',
        prompt: 'How often do you want to be reminded?',
        type: 'string'
      }]
    })
  }

  async run(message, { frequency }){
    let isThere = await db.findUser(message.author.id);
    if(!isThere) return await message.direct('You have not created a commitment yet.\nUse `.commit` to add your first commitment!');

    let res = await db.updateReminder({'id': message.author.id, 'reminder': frequency});
    if(res === null) return await message.direct('There was an error trying to update the commitment. Let Alex or one of the bot masters know!');
    let resMessage;
    frequency === 'never' ? resMessage = `You will stop getting DM reminders. However, Meaningbot will still keep your commitments logged. Start is up again with \`.remindme\``
                          : resMessage = `You will get ${frequency} DM reminding you to get after it!`
    return await message.direct(resMessage);
  }
}