const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');

module.exports = {
  config: {
    name: "nuke",
    usage: "(command) (user)",
    category: "economy",
    description: "Steals a random amount of money from a user",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    
    const economy = new db.table('economy');
    if (!economy.has(`nuke.${message.guild.id}`)) economy.set(`nuke.${message.guild.id}`, {});

    const user = message.mentions.members.first();
    if (!user) return message.channel.send('Please mention a user');
    if(user.id === message.author.id) return message.channel.send('You cant nuke yourself');

    const userBalance = economy.get(`balance.${message.guild.id}.${user.id}`) || 0;

    const unsuccessfulEmbed = new MessageEmbed()
      .setColor(red_light)
      .setTitle('Day Dream')
      .setDescription('You bought a nuke....SIKE');
    
    const balance = economy.get(`nuke.${message.guild.id}.${message.author.id}`) || 0;
    
    if (!balance > 0) return message.channel.send(unsuccessfulEmbed);

      const successEmbed = new MessageEmbed()
        .setColor(green_light)
        .setTitle('Nuke Successful')
        .setDescription(`${message.author.tag} has Nuked ${args[0]} and has gotten ${userBalance}`);
      
      message.channel.send(successEmbed);

      user.send('omae wa mou shindeiru')

      economy.set(`balance.${message.guild.id}.${user.id}`, 0)
      economy.set(`nuke.${message.guild.id}.${user.id}`, 0)

      economy.add(`balance.${message.guild.id}.${message.author.id}`, userBalance)


    economy.subtract(`nuke.${message.guild.id}.${message.author.id}`, 1);
  }
}