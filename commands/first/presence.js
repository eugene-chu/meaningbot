const { Command } = require('discord.js-commando');

module.exports = class Presence extends Command {
	constructor(client) {
		super(client, {
			name: 'presence',
			group: 'first',
			memberName: 'presence',
			description: 'check on member\'s presence',
		});
	}

	async run(message) {
		console.log(message.author.presence);
		return await message.say(`${message.author.presence.status}`);
	}
};