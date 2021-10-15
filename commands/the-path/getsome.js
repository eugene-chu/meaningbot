const { Command } = require('discord.js-commando');

module.exports = class GetSome extends Command {
  constructor(client){
    super(client, {
      name: 'getsome',
      group: 'the-path',
      memberName: 'getsome',
      description: 'Get a random G E T A F T E R I T message to pump you up so you can get after it!',
      examples: ['`!getsome`: GET AFTER IT']
    });

    this.quotesList = [
      'Get After It, Bucko <:jbp1:460235087192129539>',
      'Get Some <:getafterit:479505436282847257>479505436282847257>',
      'Who Gonna Carry The Boat!?! <:goggins:564992411562934286>',
      'Roger That <:goggins:564992411562934286>',
      'You gotta get after it! <:goggins:564992411562934286>',
      'Discipline Equals Freedom! <:getafterit:479505436282847257>479505436282847257>',
      'Get after it! <:getafterit:479505436282847257>',
      'Stay on  T H E   P A T H ! <:getafterit:479505436282847257>',
      'You bad motherfucker! <:akira_happy:465667255087136799>',
      'Slowly and steady wins the race. What matters most is that you  K E E P   G O I N G ! <:goggins:564992411562934286>',
      'Meaning is the wave! <:akira_happy:465667255087136799>',
      'We are living in the peak of recorded human civilization, don\'t waste the opportunity! Get after it! <:getafterit:479505436282847257>',
      'Find the meaning, find the motivation. <:getafterit:479505436282847257>',
      'You\'re gonna carry that weight. <:goggins:564992411562934286>',
      'This is the Greatest Year to ever be alive in the History of Mankind.<:the_greatest_year:594653675977179166>',
      'Your ancestors sacrificied their entire lives to get you here, make them proud! <:meaningwave:460233509265604638>',
      'I\'m proud of you, I hope that you\'re as proud as I am <:akira_happy:465667255087136799>',
      'Confront the Dragon, Get the Gold, Share it with the Community <:jbp1:460235087192129539>',
      'Clean up your room, then you\'ll know what to do next <:jbp1:460235087192129539>',
      'Bear your burden properly and live forthrightly in the world <:jbp6:460235086986608640>',
      'Pick up your damn suffering, and  BEAR   IT  <:jbp6:460235086986608640>',
      'Perfect is the Enemy of the Good. <:akiraHiFive:839667832475615302>',
      'Discipline = Freedom <:getafterit:479505436282847257>',
      'The best time to plant a tree was 20 years ago, the second best time is NOW <:the_greatest_year:594653675977179166>',
      'What should you be doing right now to lessen the suffering in your life? <:jbp6:460235086986608640>',
      'We\'re all rooting for you! You can do it! <:the_greatest_year:594653675977179166>',
      'See you, space cowboy. <:faye:460235086894333962>',
      'I\'m not afraid of dying, I\'m afraid not to have lived. <:jbp6:460235086986608640>',
      'When you start to doubt yourself the real world will eat you alive. <:getafterit:479505436282847257>',
      'Keep your blood clean, your body lean, and your mind sharp. <:jbp6:460235086986608640>',
      'Victory or defeat are largely out of my control, but putting up a good fight.. putting up the kind of fight that makes the earth shake and the gods blush.. this I can do. <:faye:460235086894333962>',
      'Answer the hopelessness with a defiant smile and a raised middle finger <:getafterit:479505436282847257>',
      'It\'s not where you begin, it\'s where you end. <:faye:460235086894333962>',
      'You are not rewarded for the comfortable choice. <:getafterit:479505436282847257>',
      'Small things, when compounded over time, tend to have big consequences. <:jbp6:460235086986608640>',
      'To live one day well is the same as to live ten thousand days well. To master twenty-four hours is to master your life. <:jbp1:460235087192129539> <:meaningwave:460233509265604638>',
      'When you arise in the morning, think of what a precious privilege it is to be alive. <:jbp1:460235087192129539>',
      'Execute every action in life as if it were the last. <:jbp6:460235086986608640>',
      'Because a thing seems difficult for you, do not think it impossible for anyone to accomplish. <:getafterit:479505436282847257>',
      'M A K E  I T  B E A U T I F U L <:jbpAesthetic:822805626715504711>',
      'I T \' S  A  G R E A T  D A Y ! ! !  W O O <:meaningwave:460233509265604638>',
      'Everything is a scam! If you want to play the game, just go play it. <:meaningwave:460233509265604638>',
      'Do things that are delightful to you <:wattsWave3:460234157415596043>',
      'Listen kids, things aren\'t what they seem. Don\' be fooled. <:wattsWave3:460234157415596043>',
      'It feels like it works',
      'G E T  T H A T <:GOOD:823909041176707083> F E E L I N G ! ! !',
      'Remember that what you do not yet know, is more important than what you already know. <:2_jbpAesthetic:822805626715504711>'
    ];
  }

  async run(message){
    let randQuote = this.quotesList[Math.floor(Math.random()*this.quotesList.length)];
    return await message.say(randQuote);
  }
}