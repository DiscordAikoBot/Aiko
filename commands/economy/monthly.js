const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { red_light, green_light } = require('../../colours.json');

const timeout = 86400000*30;

module.exports = {
  config: {
    name: 'monthly',
    usage: '(command)',
    category: 'economy',
    description: 'Claim your monthly reward!',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const amount = Math.floor((Math.random() * 7000) + 1000);

    const economy = new db.table('economy');
    if (!economy.has(`monthly.${message.guild.id}`)) economy.set(`monthly.${message.guild.id}`, {});
    const lastCollected = economy.get(`monthly.${message.guild.id}.${message.author.id}`);

    if (lastCollected && Date.now() - lastCollected < timeout) {
      const time = ms(timeout - (Date.now() - lastCollected));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You have already collected your monthly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
      
      message.channel.send(timeEmbed);
    } else {
      const moneyEmbed = new MessageEmbed()
        .setColor(green_light)
        .setDescription(`:white_check_mark: You've collected your monthly reward of ${amount} coins`);
  
      message.channel.send(moneyEmbed);
  
      economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);
      economy.set(`monthly.${message.guild.id}.${message.author.id}`, Date.now());
    }
  }
};