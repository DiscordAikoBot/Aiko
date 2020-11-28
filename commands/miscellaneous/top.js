const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { cyan } = require("../../colours.json")
const db = require('quick.db');

module.exports = {
    config: {
        name: "ranks",
        aliases: ["top", "leaderboard", "levels"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays most players who send messages",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
   const economy = new db.table('level');
    if (!economy.has(`points.${message.guild.id}`))
    economy.set(`points.${message.guild.id}`, {});
    const balances = economy.get(`points.${message.guild.id}`);
    const balances1 = economy.get(`rank.${message.guild.id}`);

    const entries = Object.entries(balances).sort((a, b) => b[1] - a[1]);
    const IDs = entries.map(entry => entry[0]);
    let content = [];

    for (let i = 0; i < 10; i++) {
      bot.users.fetch(IDs[i])
      const user = bot.users.cache.get(IDs[i]);
      
      if (user) {
        const balance = balances[IDs[i]];
        const balance1 = balances1[IDs[i]];

        content.push(`${i + 1}. ${user.username} - Level: ${balance1} | Points: ${balance}`);
      } else {
      }
    }

    content1 = content.join('\n');

    const leaderboardEmbed = new MessageEmbed()
      .setDescription(`**${message.guild.name}'s Rank Leaderboard**\n\n${content1}`)
      .setColor('#b52ef');

    if (leaderboardEmbed.description.length >= 2048)
      leaderboardEmbed.description = `${leaderboardEmbed.description.substr(0, 2045)}...`;

    return message.channel.send(leaderboardEmbed).catch(console.error);
    }
}