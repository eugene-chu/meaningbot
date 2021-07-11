const db = require('./db/db.js');
const { DateTime } = require('luxon');


checkTime = async (now, ocTime, dbInfo, user) => {
  if(now.hour > ocTime.hour){
    await this.sendReminder(user, dbInfo);
  } else if(now.hour === ocTime.hour){
    if(now.minute >= ocTime.minute){
      await this.sendReminder(user, dbInfo);
    }
  }
},
sendReminder = async (user, dbInfo) => {
  const dm = await user.createDM();

  await dm.send(`Remember, your current commitment is:\n${dbInfo.commit}`);
  let res = await db.updateDMTime(user.id, new Date());
  if(res === null){
    console.error('Error occured logging updated time');
    await dm.send('There was issue trying to updating: `the time`. Let Alex, or one of the bot masters know of this issue ASAP');
  }
  return;
}

module.exports = {
  checkInterval: async (dbInfo, user) => {
    const now = DateTime.now();
    const lastReminderTime = DateTime.fromJSDate(dbInfo.lastDMTime);
    const ocTime = DateTime.fromJSDate(dbInfo.commitTime);
    const i = lastReminderTime.until(now);

    let IntervalOK = false;
    if(dbInfo.remindMe === 'daily' && i.length('days') >= 1){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'weekly' && i.length('days') >= 7){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'monthly' && i.length('months') >= 1){
      IntervalOK = true;
    }

    if(IntervalOK){
      return await this.checkTime(now, ocTime, dbInfo, user);
    } return;
  },
};