const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { red_light, green_light } = require('../../colours.json');

const timeout = 180000;

module.exports = {
  config: {
    name: 'beg',
    usage: '(command)',
    category: 'economy',
    description: 'Beg people for money!',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    const amount = Math.floor((Math.random() * 900) + 1);

    const economy = new db.table('economy');
    if (!economy.has(`beg.${message.guild.id}`)) economy.set(`beg.${message.guild.id}`, {});
    const lastBegged = await economy.get(`beg.${message.guild.id}.${message.author.id}`);

    if (lastBegged && Date.now() - lastBegged < timeout) {
      const time = ms(timeout - (Date.now() - lastBegged));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You've already begged recently\n\nBeg again in ${time.minutes} minutes ${time.seconds} seconds.`);
        
      message.channel.send(timeEmbed)
    } else {
      const moneyEmbed = new MessageEmbed()
        .setColor(green_light)
        .setDescription(`:white_check_mark: You've begged and received ${amount} coins`);
        
      message.channel.send(moneyEmbed)
  
      economy.add(`balance.${message.guild.id}.${message.author.id}`, amount);
      economy.set(`beg.${message.guild.id}.${message.author.id}`, Date.now());
    }
  }
};