const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');

module.exports = {
  config: {
    name: "pay",
    usage: "(command) (user) (amount)",
    category: "economy",
    description: "Pays a user a certain amount of money",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    
    const user = message.mentions.members.first();
    if (!user) return message.channel.send('Please Specify a user');

    const amount = args[1];
    if(!amount) return message.channel.send('Please specify an amount to add!');

    if(!/^(\+|-)?\d+$/.test(amount)) return message.channel.send('Please specify a number!');
    if(amount.includes('-')) return message.channel.send('You cannot send negative numbers')

    const unsuccessfulEmbed = new MessageEmbed()
      .setColor(red_light)
      .setTitle('Transfer Denied')
      .setDescription(`You do not have enough money`);
    
    const economy = new db.table('economy');
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});
    const balance = economy.get(`balance.${message.guild.id}.${message.author.id}`) || 0;
    if (balance < amount) return message.channel.send(unsuccessfulEmbed);

    economy.subtract(`balance.${message.guild.id}.${message.author.id}`, amount);
    economy.add(`balance.${message.guild.id}.${user.id}`, amount);

    const successfulEmbed = new MessageEmbed()
      .setColor(green_light)
      .setTitle('Successful Transfer')
      .setDescription(`${user.user.username} Has been paid $${amount}, your new balance is $` + `${balance}.`)
      message.channel.send(successfulEmbed);
  }
};