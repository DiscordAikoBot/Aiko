const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { cyan } = require('../../colours.json');

module.exports = {
  config: {
    name: 'bal',
    aliases: ['balance'],
    usage: '(command)',
    category: 'economy',
    description: 'Shows Your Balance',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const member = message.mentions.members.first() || message.member;

    const economy = new db.table('economy');
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});
    let balance = economy.get(`balance.${message.guild.id}.${member.id}`) || 0;

    const balanceEmbed = new MessageEmbed()
      .setColor(cyan)
      .setTitle(`${member.user.username}'s balance`)
      .setDescription(`Balance: ${balance}`);

    message.channel.send(balanceEmbed);
  }
}