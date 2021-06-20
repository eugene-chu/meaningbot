module.exports = {
  isCorrectChannel: (message) => {
    return message.channel.name === 'general' ? true : false;
  }
}