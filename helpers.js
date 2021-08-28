const db = require('./db/db.js');
const { DateTime } = require('luxon');

sendReminder = async (dbInfo, client) => {
  const dm = await client.users.cache.get(dbInfo.userId).createDM();

  await dm.send(`Remember, your current commitment is:\n${dbInfo.commit}`);
  let res = await db.updateDMTime(dbInfo.id, new Date());
  if(res === null){
    console.error('Error occured logging updated time');
    await dm.send('There was issue trying to updating: `the time`. Let one of the bot masters know of this issue ASAP');
  }
  return;
}

module.exports = {
  checkInterval: async (dbInfo, client) => {
    const now = DateTime.now();
    const ogReminderTime = DateTime.fromJSDate(dbInfo.remindMeTime)
    const lastReminderTime = DateTime.fromJSDate(dbInfo.lastDMTime).set({ hour: ogReminderTime.hour, minute: ogReminderTime.minute });

    const i = lastReminderTime.until(now);

    let IntervalOK = false;
    if(dbInfo.remindMe === 'daily' && i.length('hours') >= 24){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'semiweekly' && i.length('days') >= 3){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'weekly' && i.length('days') >= 7){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'biweekly' && i.length('days') >= 14){
      IntervalOK = true;
    } else if(dbInfo.remindMe === 'monthly' && i.length('months') >= 1){
      IntervalOK = true;
    }

    if(IntervalOK){
      return await sendReminder(dbInfo, client);
    } return;
  },
};