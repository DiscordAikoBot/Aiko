const db = require('quick.db')

module.exports = {
  config: {
    name: "anti-spam-ping",
    description: "Blacklists a word from being sent",
    usage: "(word)",
    category: "settings",
    accessableby: "Admin"
  },
  run: async (bot, message, args) => {
      if (message.member.hasPermission(`ADMINISTRATOR`)) {
        if (args[0].toLowerCase() === "seconds") {
            db.set(message.guild.id + "anti-ping seconds", args[1]);
        } else if (args[0].toLowerCase() === "pings") {
            db.set(message.guild.id + "anti-ping pings", args[1]);
        } else if (args[0].toLowerCase() === "disable") {
            db.set(message.guild.id + "anti-ping disabled", true);
        } else if (args[0].toLowerCase() === "enable") {
            db.set(message.guild.id + "anti-ping disabled", false);
        }
      }
  }
}