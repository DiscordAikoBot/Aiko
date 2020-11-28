const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');
const { permCheck } = require('../../functions.js')

module.exports = {
  config: {
    name: 'removemoney',
    usage: '(command) (user) (amount)',
    category: 'economy',
    description: 'Pays a user a certain amount of money',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
      let perm = permCheck(message, false, 'removemoney')
      if(perm === false) return message.channel.send('No Perms');
    

    let amount = args[0]
    if(isNaN(amount)) return message.channel.send('Not a number');

    let member = message.mentions.members.first() || message.member;

    const economy = new db.table('economy');
    economy.subtract(`balance.${message.guild.id}.${member.id}`, amount)

    message.channel.send('Done')
  }
}