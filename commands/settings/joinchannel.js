const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "joinchannel",
        description: "Sets the channel to send join messages to",
        usage: "(channel)",
        category: "settings",
        accessableby: "Moderator"
    },
    run: async (bot, message, args) => {
      if(message.author.id !== message.guild.owner.user.id) {
        if(message.author.tag !== "Conutik#5777") return message.channel.send('No Perms!');
      }

      let role = message.guild.channels.cache.find(r => r.name == args[0]) || message.guild.channels.cache.find(r => r.id == args[1]) || message.mentions.channels.first()
      if(!role) return message.channel.send("Please provide a channel to send the welcome message.")

      db.set(`settings.${message.guild.id}.joinchannel`, role.id)

      let embed = new MessageEmbed()
      .setColor(redlight)
      .setTitle(`Updated Settings`)
      .setDescription('Updated join channel.')
      message.channel.send(embed)
    }
}

