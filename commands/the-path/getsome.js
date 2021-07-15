const { Command } = require('discord.js-commando');

module.exports = class GetSome extends Command {
  constructor(client){
    super(client, {
      name: 'getsome',
      group: 'the-path',
      memberName: 'getsome',
      description: 'Get a random G E T A F T E R I T message to pump you up so you can get after it!',
      examples: ['`.getsome`: GET AFTER IT']
    });

    this.quoteslist = [
      'Get After It, Bucko',
      'Get Some',
      'Who Gonna Carry The Boat!?!',
      'Roger That',
      'You gotta get after it!',
      'Discipline Equals Freedom!',
      'Get after it! :getafterit:',
      'Stay on  T H E   P A T H ! :getafterit:',
      'You bad motherfucker! :akira_happy:',
      'Slowly and steady wins the race. What matters most is that you  K E E P   G O I N G !',
      'Meaning is the wave! :akira_happy:',
      'We are living in the peak of recorded human civilization, don\'t waste the opportunity! Get after it! :getafterit:',
      'Find the meaning, find the motivation. :getafterit:',
      'You\'re gonna carry that weight.',
      'This is the Greatest Year to ever be alive in the History of Mankind.',
      'Your ancestors sacrificied their entire lives to get you here, make them proud! :meaningwave:',
      'I\'m proud of you, I hope that you\'re as proud as I am :akira_happy:',
      'Confront the Dragon, Get the Gold, Share it with the Community :jbp1:',
      'Clean up your room, then you\'ll know what to do next :jbp1:',
      'Bear your burden properly and live forthrightly in the world :jbp6:',
      'Pick up your damn suffering, and  BEAR   IT  :jbp6:',
      'Perfect is the Enemy of the Good.',
      'Discipline = Freedom :getafterit:',
      'The best time to plant a tree was 20 years ago, the second best time is NOW',
      'What should you be doing right now to lessen the suffering in your life?',
      'We\'re all rooting for you! You can do it!',
      'See you, space cowboy. :faye:',
      'I\'m not afraid of dying, I\'m afraid not to have lived. :jbp6:',
      'When you start to doubt yourself the real world will eat you alive. :getafterit:',
      'Keep your blood clean, your body lean, and your mind sharp. :jbp6:',
      'Victory or defeat are largely out of my control, but putting up a good fight.. putting up the kind of fight that makes the earth shake and the gods blush.. this I can do. :faye:',
      'Answer the hopelessness with a defiant smile and a raised middle finger :getafterit:',
      'It\'s not where you begin, it\'s where you end. :faye:',
      'You are not rewarded for the comfortable choice. :getafterit:',
      'Small things, when compounded over time, tend to have big consequences. :jbp6:',
      'To live one day well is the same as to live ten thousand days well. To master twenty-four hours is to master your life. :jbp1: :meaningwave:',
      'When you arise in the morning, think of what a precious privilege it is to be alive. :jbp1:',
      'Execute every action in life as if it were the last. :jbp6:',
      'Because a thing seems difficult for you, do not think it impossible for anyone to accomplish. :getafterit:'
    ]
  }

  async run(message){
    let randQuote = this.quoteslist[Math.floor(Math.random()*this.quoteslist.length)];
    return await message.say(randQuote);
  }
}