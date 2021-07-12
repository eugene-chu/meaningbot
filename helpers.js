const db = require('./db/db.js');
const { DateTime } = require('luxon');


checkTime = async (now, dbInfo, client) => {
  const rmTime = DateTime.fromJSDate(dbInfo.remindMeTime);
  
  if(now.hour > rmTime.hour){
    await this.sendReminder(client, dbInfo);
  } else if(now.hour === rmTime.hour){
    if(now.minute >= rmTime.minute){
      await this.sendReminder(client, dbInfo);
    }
  }
}

sendReminder = async (client, dbInfo) => {
  const dm = await client.users.cache.get(dbInfor.userId).createDM();

  await dm.send(`Remember, your current commitment is:\n${dbInfo.commit}`);
  let res = await db.updateDMTime(user.id, new Date());
  if(res === null){
    console.error('Error occured logging updated time');
    await dm.send('There was issue trying to updating: `the time`. Let Alex, or one of the bot masters know of this issue ASAP');
  }
  return;
}

module.exports = {
  checkInterval: async (dbInfo, client) => {
    const now = DateTime.now();
    const lastReminderTime = DateTime.fromJSDate(dbInfo.lastDMTime);
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
      return await this.checkTime(now, dbInfo, client);
    } return;
  },
};