const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light, green_light } = require('../../colours.json');
const { permCheck } = require('../../functions.js')

module.exports = {
  config: {
    name: 'reset',
    usage: '(command) (user) (amount)',
    category: 'economy',
    description: 'Pays a user a certain amount of money',
    accessableby: 'Members'
  },
  run: async (bot, message, args) => {
    
      let perm = permCheck(message, false, 'ecoreset')
      if(perm === false) return message.channel.send("You don't have permission.");

    const economy = new db.table('economy');
    
    let noob = message.mentions.members.first()
    if(!noob) {
      economy.delete(`steal.${message.guild.id}`)
      economy.delete(`daily.${message.guild.id}`)
      economy.delete(`weekly.${message.guild.id}`)
      economy.delete(`work.${message.guild.id}`)
      economy.delete(`balance.${message.guild.id}`)
    message.channel.send('Reset everyone')

    } else {
      economy.delete(`steal.${message.guild.id}.${noob.id}`)
      economy.delete(`daily.${message.guild.id}.${noob.id}`)
      economy.delete(`weekly.${message.guild.id}.${noob.id}`)
      economy.delete(`work.${message.guild.id}.${noob.id}`)
      economy.delete(`balance.${message.guild.id}.${noob.id}`)
      return message.channel.send('Done');
    }

      
         

    
    
  }
}