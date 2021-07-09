const db = require('./db/db.js');

module.exports = {
  sendReminder: async (user, dbInfo) => {
    const dm = await user.createDM();

    await dm.send(`Remember, your current commitment is:\n${dbInfo.commit}`);
    let res = await db.updateDMTime(user.id, Date());
    if(res === null) console.log('There was issue trying to updating: `the time`. Let Alex, or one of the bot masters know of this issue ASAP');
  }
};