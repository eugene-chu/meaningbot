require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const db = require('./db/db.js');
const { sendReminder } = require('./helpers.js');

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
    client.user.setActivity('Playing Around');
  });
  
  client.on('error', console.error);

  client.on('presenceUpdate', async (oldStatus, newStatus) => {
    if(oldStatus.status === 'offline'){
      // Will use to check if user have saved a commit
      const isThere = await db.findUser(oldStatus.userID);
      if(isThere){
        
        // // Checking what's in the presece.user object
        // console.log(oldStatus.user);
  
        // // this is how we would create a dm channel with the user to send reminder
        // const dm = await oldStatus.user.createDM();
        // dm.send('Welcome back online');

        sendReminder(oldStatus.user, isThere);
      }
    }
  });

  client.login(process.env.BOTTOKEN);