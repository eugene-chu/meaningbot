const { Command } = require('discord.js-commando');
const db = require('../../db/db.js');

module.exports = class reminder extends Command {
  constructor(client) {
    super(client, {
      name: 'reminder',
      group: 'first',
      memberName: 'reminder',
      description: 'toggles the reminder. Also show you which reminder message you have up',
      args: [{
        key: 'toggle',
        prompt: '',
        type: 'string',
        oneOf: ['on', 'off', ''],
        default: '',
      }],
    });
  }

  async run(message, { toggle }) {
    const isThere = await db.findDoc(message.author.id);
    if(!isThere) return await message.direct('No message saved yet');

    if(toggle === '') {
      return await message.direct(`Your current reminder is set to: ${isThere.remindme}\nUse the toggle command with 'on' or 'off' to toggle it on or off`);
    }
    if(toggle === isThere.remindme) {
      return await message.direct(`Your current reminder is already ${toggle}`);
    }
    const res = await db.updateRemind({ id: message.author.id, toggle: toggle });
    if(res === null) return await message.direct('There was an error trying to update the log');

    return await message.direct(`Reminder toggle has been set to ${toggle}`);
  }
};