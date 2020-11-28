const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');

module.exports = {
  config: {
    name: 'baltop',
    usage: '(command) (user) (amount)',
    category: 'economy',
    description: 'Pays a user a certain amount of money',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    const economy = new db.table('economy');
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});
    const balances = economy.get(`balance.${message.guild.id}`);

    const entries = Object.entries(balances).sort((a, b) => b[1] - a[1]);
    const IDs = entries.map(entry => entry[0]);
    let content = [];

    let x = 0

    for (let i = 0; i < 10; i++) {
      bot.users.fetch(IDs[i])
      const user = bot.users.cache.get(IDs[i]);

      if(x < 10) {
        if (user) {
        x++
        const balance = balances[IDs[i]];

        content.push(`${x}. ${user.username} ~ ${balance}`);
      } else {
      }
      }
      
      
    }

    content = content.join('\n');

    const leaderboardEmbed = new MessageEmbed()
      .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
      .setColor('#ff9dbb');

    message.channel.send(leaderboardEmbed);
  }
};