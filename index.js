require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const db = require('./db/db.js');
const { checkInterval } = require('./helpers.js');

const client = new CommandoClient({
	commandPrefix: '!',
	owner: ['184136353812840449', '294705970511085570', '456947461714345984']
});

client.dispatcher.addInhibitor((message) => {
	if (!(message.channel.type === 'dm' && message.command.name === 'help')) {
		if (message.channel.id !== process.env.THE_PATH_CHANNEL_ID) {
			return {
				reason: 'Wrong Channel',
				response: message.reply('I only take commands in <#848008771397353505> channel')
			};
		}
	}
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['the-path', 'The-Path commands to help you get after it.'],
		['misc', 'misc but important commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Reminding you to Get After It!');
});

client.on('error', console.error);

client.on('presenceUpdate', async (oldStatus, newStatus) => {
	const isThere = await db.findUser(newStatus.userID);
	if (isThere) {
		if (typeof oldStatus === 'undefined' || oldStatus.status === 'offline') {
			try {
				await db.updateStatus(newStatus.userID, 'online');
			} catch (err) {
				console.error(`There was an error trying to update the user's status.\nThe error was: ${err}`);
			}

			if (isThere.remindMe !== 'never') await checkInterval(isThere, client);

		} else if (newStatus.status === 'offline') {
			try {
				await db.updateStatus(newStatus.userID, newStatus.status);
			} catch (err) {
				console.error(`There was an error trying to update the uesr's status.\nThe error was: ${err}`);
			}
		}
	}
});

client.setInterval(async () => {
	const allCommits = await db.findAll();
	// note this is a temp fix. if the user is not in the discord guild/channel's user list, but have a commitment (either left, or had their user id changed)
	// we skip that user and move on to the next user
	// Have not made a solution for this problem yet
	// possible solution include: DMing bot master about the problem (hopefully once) and we go in and fix it
	// or double check the server list to see if that username still exist, update the current record, and send it to that userId instead (might be a bit complicated)
	let haveUser = false;
	allCommits.forEach(async commitment => {
		console.log(commitment.userId);
		haveUser = await client.users.cache.has(commitment.userId);
		console.log(haveUser);
		if (haveUser) {
			if (commitment.remindMe !== 'never' && commitment.status === 'online')
				await checkInterval(commitment, client);
		}
	});
}, (1000 * 60));

client.login(process.env.BOTTOKEN);