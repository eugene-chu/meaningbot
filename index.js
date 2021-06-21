require('dotenv').config();

const { DMChannel } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: '.',
	owner: ['184136353812840449','294705970511085570','379336215205380106','456947461714345984']
});

client.dispatcher.addInhibitor((message) => {
  if(message.channel.id !== '848008771397353505' && message.command.name !== 'help')
  return {reason: 'Wrong Channel',
  response: message.reply('This is the wrong channel to use the commands. Please use the commands in <#848008771397353505>')}});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Your First Command Group'],
		['second', 'Your Second Command Group'],
    ['misc', 'misc but important commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Playing Around');
  });
  
  client.on('error', console.error);

  client.login(process.env.BOTTOKEN);