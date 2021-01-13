const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = { 
    config: {
        name: "set-count",
        description: "Set counting for a channel",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

      let chnl = message.mentions.channels.first() || message.guild.channels.cache.find(m => m.name === args[0]) || message.guild.channels.cache.get(args[0])
      if(!chnl) return message.channel.send("Please provide the channel to set a count for.")


      let num = args[1]
      if(!num) return message.channel.send('Please specify how much the count should be')
      if(num.isNaN) return message.channel.send('Please specify a number.')
    }
}