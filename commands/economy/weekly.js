const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { red_light, green_light } = require('../../colours.json');

const timeout = 604800000;

module.exports = {
  config: {
    name: 'weekly',
    usage: '(command)',
    category: 'economy',
    description: 'Claim your Weekly reward!',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const amount = Math.floor((Math.random() * 5000) + 1000);

    const economy = new db.table('economy');
    if (!economy.has(`weekly.${message.guild.id}`)) economy.set(`weekly.${message.guild.id}`, {});
    const lastCollected = economy.get(`weekly.${message.guild.id}.${message.author.id}`);

    if (lastCollected && Date.now() - lastCollected < timeout) {
      const time = ms(timeout - (Date.now() - lastCollected));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
      
      message.channel.send(timeEmbed);
    } else {
      const moneyEmbed = new MessageEmbed()
        .setColor(green_light)
        .setDescription(`:white_check_mark: You've collected your weekly reward of ${amount} coins`);
  
      message.channel.send(moneyEmbed);
  
      economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);
      economy.set(`weekly.${message.guild.id}.${message.author.id}`, Date.now());
    }
  }
};