require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const db = require('./db/db.js');
const { checkInterval } = require('./helpers.js');

const client = new CommandoClient({
	commandPrefix: '.',
	owner: ['184136353812840449','294705970511085570','379336215205380106','456947461714345984']
});

client.dispatcher.addInhibitor((message) => {
  if(!(message.channel.type === 'dm' && message.command.name === 'help')){
    if(message.channel.id !== '848008771397353505'){
      return {reason: 'Wrong Channel',
      response: message.reply('This is the wrong channel to use the commands. Please use the commands in <#848008771397353505>')};    
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
    if(isThere){
      if(typeof oldStatus === 'undefined' || oldStatus.status === 'offline'){
        await db.updateStatus(newStatus.userID, 'online');
        await checkInterval(isThere, newStatus.user);
      } else if (newStatus.status === 'offline'){
        await db.updateStatus(newStatus.userID, newStatus.status);
      }
    }
  });

  client.setInterval(async () => {
    const allCommits = await db.findAll();
    allCommits.forEach(async commitment => {
      if(commitment.status === 'online')
        let user = await client.users.cache.get(commitment.userId);
        await checkInterval(commitment, user);
    });
  }, (1000 * 60));

  client.login(process.env.BOTTOKEN);