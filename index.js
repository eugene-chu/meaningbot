require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { userList } = require('./db/userList.js');

const client = new CommandoClient({
	commandPrefix: '.',
	owner: ['184136353812840449', '294705970511085570', '379336215205380106', '456947461714345984'],
});

client.dispatcher.addInhibitor((message) => {
	if(!(message.command.name === 'help' && message.channel.type === 'dm')) {
		if(message.channel.id !== '848008771397353505') {
			return { reason: 'Wrong Channel',
				response: message.reply('This is the wrong channel to use the commands. Please use the commands in <#848008771397353505>') };
		}

	}
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Your First Command Group'],
		['second', 'Your Second Command Group'],
		['misc', 'misc but important commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('Playing Around');
});

client.on('error', console.error);

client.on('presenceUpdate', (pres1, pres2) => {
  console.log(pres1.userID);
	console.log(`arg1: ${JSON.stringify(pres1)}`);
	console.log(`agr2: ${JSON.stringify(pres2)}`);
});

client.setInterval(() => {
  console.log(`This is the current userList: ${[...userList]}`);
  console.log(`The current list size is ${userList.size}`);
}, 10 * 1000);

client.login(process.env.BOTTOKEN);