const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { red_light, green_light } = require('../../colours.json');

const timeout = 900000;
const amount = 400;

module.exports = {
  config: {
    name: "steal",
    usage: "(command) (user)",
    category: "economy",
    description: "Steals a random amount of money from a user",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    
    const economy = new db.table('economy');
    if (!economy.has(`balance.${message.guild.id}`)) economy.set(`balance.${message.guild.id}`, {});
    if (!economy.has(`steal.${message.guild.id}`)) economy.set(`steal.${message.guild.id}`, {});

    

    const lastStole = economy.get(`steal.${message.guild.id}.${message.author.id}`);

    if (lastStole && Date.now() - lastStole < timeout) {
      const time = ms(timeout - (Date.now() - lastStole));
  
      const timeEmbed = new MessageEmbed()
        .setColor(red_light)
        .setDescription(`:x: You've already stolen recently\n\nTry it again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
      
      return message.channel.send(timeEmbed);
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(user == '588236633535676416') return message.channel.send('You can\'t steal from <@588236633535676416> because they\'re in passive mode.');
    if (!user) return message.channel.send('Please mention a user');
    const userBalance = economy.get(`balance.${message.guild.id}.${user.id}`) || 0;

    const unsuccessfulEmbed = new MessageEmbed()
      .setColor(red_light)
      .setTitle('Steal failed')
      .setDescription('You do not have 400 coins');
    
    const balance = economy.get(`balance.${message.guild.id}.${message.author.id}`) || 0;
    
    if (balance < amount) return message.channel.send(unsuccessfulEmbed);

    const success = ((Math.random() * 2) + 1);
    let finalSuccess = Math.round(success)

    if (finalSuccess == 3) {
      const stolenAmount = userBalance/100*25
      let updated = Math.round(stolenAmount)

      economy.subtract(`balance.${message.guild.id}.${user.id}`, updated);
      economy.add(`balance.${message.guild.id}.${message.author.id}`, updated);

      const successEmbed = new MessageEmbed()
        .setColor(green_light)
        .setTitle('Steal successful')
        .setDescription(`You stole ${updated} coins`);
      
      message.channel.send(successEmbed);
    } else {
      const successEmbed = new MessageEmbed()
        .setColor(red_light)
        .setTitle('Steal failed')
        .setDescription(`You failed to steal coins`);
      
      message.channel.send(successEmbed);
    }

    economy.set(`steal.${message.guild.id}.${message.author.id}`, Date.now());
    economy.subtract(`balance.${message.guild.id}.${message.author.id}`, amount);
  }
};