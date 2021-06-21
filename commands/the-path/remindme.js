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
                 '`.remindme weekly`: Get a DM every week to remind you to get after it!',
                 '`.remindme never`: Stop getting DM reminders. However, Meaningbot will still keep your commitment logs. So you can start again at any time.'],
      args: [{
        key: 'frequency',
        prompt: 'How often do you want to be reminded?',
        type: 'string'
      }]
    })
  }

  async run(message, { frequency }){
    let isThere = await db.findUser({'userId': message.author.id});
    if(!isThere) return await message.direct('You have not created a commitment yet.\nUser `.commit` to add your first commitment!');

    let res = await db.updateReminder({'id': message.author.id, 'reminder': frequency});
  }
}