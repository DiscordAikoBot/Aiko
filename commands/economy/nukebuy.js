const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { green_light } = require('../../colours.json');

module.exports = {
  config: {
    name: 'nukebuy',
    usage: '(command)',
    aliases: ["buynuke"],
    category: 'economy',
    description: 'Buy a Nuke',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
    let price = 150000;
    let economy = new db.table('economy')
    let bal = economy.get(`balance.${message.guild.id}.${message.author.id}`) || 0;
    if(bal < price) return message.channel.send('You do not have enough money its 150k baka');
    economy.subtract(`balance.${message.guild.id}.${message.author.id}`, price);
    let check = economy.get(`nuke.${message.guild.id}.${message.author.id}`);
    if(!check) {
      economy.set(`nuke.${message.guild.id}.${message.author.id}`, 0);
    }
    economy.add(`nuke.${message.guild.id}.${message.author.id}`, 1);

    let array = ["North Korea", "USA", "Russia", "China", "Boom Boom Reeves"]
    let arrayNum = Math.floor(Math.random()*array.length);
    let country = array[arrayNum]

    let embed = new MessageEmbed()
    .setColor(green_light)
    .setTitle('Success')
    .setDescription(`You have successfully bought a whole ass Nuke from ${country}`)

    message.channel.send(embed)
  }
}