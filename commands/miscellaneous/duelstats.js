const { MessageEmbed } = require("discord.js")
const mc = require('mc-stats')
const mcapi = require('mojang-api')
let date = new Date();
date.setMonth(0);
const { spec } = require("../../colours.json")

module.exports = {
    config: {
        name: "duelstats",
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

      let username = args[0]
      if(!username) return message.channel.send("Please provide a valid username!")

      let stats = mc.hypixelPlayer(username, process.env.HYPIXEL).then(result => {

        if (result.errors) return message.channel.send('User is invalid or has never joined the server. If you believe this is a mistake try running the command again.');
        
        let embed = new MessageEmbed()
        .setTitle(`${username}'s Duels Stats!`)
        .setColor(spec)
        .setDescription(`Wins: ${result.statistics.duels.wins} \nKills: ${result.statistics.duels.kills}`)
        message.channel.send(embed)
    })
    }
}