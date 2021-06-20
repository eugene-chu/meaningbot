const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: '.',
	owner: ['184136353812840449','294705970511085570','379336215205380106','456947461714345984']
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
    client.user.setActivity('getting built');
  });
  
  client.on('error', console.error);

  client.login(process.env.BOTTOKEN);