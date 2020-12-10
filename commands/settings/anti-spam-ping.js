const db = require('quick.db')

module.exports = {
  config: {
    name: "anti-ping-spam",
    description: "Blacklists a word from being sent",
    usage: "(word)",
    category: "settings",
    accessableby: "Moderator"
  },
  run: async (bot, message, args) => {

  }
}