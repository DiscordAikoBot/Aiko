const db = require('quick.db')

module.exports = { 
    config: {
        name: "settings",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `eval <input>`
    },
    run: async (bot, message, args) => {

      if(message.author.id != "255327008576241674") return message.channel.send("This command is only available for the Aiko dev team.");

      let guild = bot.guilds.cache.find(r => r.id === args[0])

      let prefix = db.get(`${guild.id}.prefix`)
      message.channel.send(`${guild.name}\'s prefix is ${prefix} `)
    }
}