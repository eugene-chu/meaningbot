const db = require('./db/db.js');
const { DateTime } = require('luxon');
const fs = require('fs');

sendReminder = async (dbInfo, client) => {
  // since Discord API returns everything as a promise, the entire sendReminder system has been reworked to be sent as a promise.
  client.users.cache.get(dbInfo.userId)
    .createDM()
    .then((DMChannel) => {
      DMChannel
        .send(`Remember, your current commitment is:\n${dbInfo.commit}`)
        .then(() => {
          db.updateDMTime(dbInfo.userId, new Date())
            .catch((e) => {
              const errormsg = `There was an error, ${e}, writing for ${dbInfo.userID} because this user does not exist on the server.\n`
              fs.writeFile('./errorOutputs/SendingErrors.txt', errormsg, err => {
                if (err) {
                  console.error(err);
                  return;
                }
              })
            });
        });
    });
  return;
}

module.exports = {
  checkInterval: async (dbInfo, client) => {
    const now = DateTime.now();
    const ogReminderTime = DateTime.fromJSDate(dbInfo.remindMeTime)
    const lastReminderTime = DateTime.fromJSDate(dbInfo.lastDMTime).set({ hour: ogReminderTime.hour, minute: ogReminderTime.minute });

    const i = lastReminderTime.until(now);

    let IntervalOK = false;
    if (dbInfo.remindMe === 'daily' && i.length('hours') >= 24) {
      IntervalOK = true;
    } else if (dbInfo.remindMe === 'semiweekly' && i.length('days') >= 3) {
      IntervalOK = true;
    } else if (dbInfo.remindMe === 'weekly' && i.length('days') >= 7) {
      IntervalOK = true;
    } else if (dbInfo.remindMe === 'biweekly' && i.length('days') >= 14) {
      IntervalOK = true;
    } else if (dbInfo.remindMe === 'monthly' && i.length('months') >= 1) {
      IntervalOK = true;
    }

    if (IntervalOK) {
      return await sendReminder(dbInfo, client);
    } return;
  },
};