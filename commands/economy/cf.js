const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');

module.exports = {
  config: {
    name: 'coinflip',
    aliases: ['cf'],
    usage: '(command)',
    category: 'economy',
    description: 'Shows Your Balance',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    let error = new MessageEmbed()
    .setTitle("Error")
    .setDescription("Please specify a number to gamble your life away with")
    .setColor(red_light)

    let amount = args[0]
    if(!amount) return message.channel.send(error);

    if(!/^(\+|-)?\d+$/.test(amount)) return message.channel.send('Please specify a number to add!');
    
    if(amount.includes('-')) return message.channel.send('no just no');

    const economy = new db.table('economy');
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});
    const balance = economy.get(`balance.${message.guild.id}.${message.author.id}`) || 0;

    if(balance < amount) return message.channel.send('you Do Not have Enough Money');

    const number = Math.floor((Math.random() * 2) + 1);
    let tax = amount/100*86


    const resultEmbed = new MessageEmbed()
      .setColor(red_light)
      .setTitle('CoinFlip');

    if(number == 2) {
      resultEmbed.setDescription(`you Lost a ${amount} dollar CoinFlip`);

      economy.subtract(`balance.${message.guild.id}.${message.author.id}`, amount);
    } else {
      resultEmbed.setColor(green_light)
      resultEmbed.setDescription(`You Won a ${amount} dollars CoinFlip`);

      economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);
    }

    message.channel.send(resultEmbed);
  }
};