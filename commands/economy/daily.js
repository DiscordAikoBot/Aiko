const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { green_light, red_light } = require('../../colours.json');

const timeout = 86400000;
const amount = Math.floor((Math.random() * 1000) + 200);

module.exports = {
  config: {
    name: 'daily',
    usage: '(command)',
    category: 'economy',
    description: 'Claim your Daily reward!',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const economy = new db.table('economy');
    if (!economy.has(`daily.${message.guild.id}`)) economy.set(`daily.${message.guild.id}`, {});
    const lastCollected = economy.get(`daily.${message.guild.id}.${message.author.id}`);

    if (lastCollected && Date.now() - lastCollected < timeout) {
      const time = ms(timeout - (Date.now() - lastCollected));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You've already collected your daily reward\n\nCollect it again in ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds`);
      
      message.channel.send(timeEmbed);
    } else {
      const moneyEmbed = new MessageEmbed()
        .setColor(green_light)
        .setDescription(`:white_check_mark: You've collected your daily reward of ${amount} coins`);
      
      message.channel.send(moneyEmbed);
  
      economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);
      economy.set(`daily.${message.guild.id}.${message.author.id}`, Date.now());
    }
  }
};